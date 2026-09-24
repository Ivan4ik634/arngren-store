// app/api/webhook/route.ts
import { supabaseServer } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return Response.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return Response.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Обрабатываем только успешные платежи
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const type = session.metadata?.type;
    const userId = session.metadata?.user_id;
    const amount = session.amount_total ? session.amount_total / 100 : 0;

    if (type === 'deposit' && userId && amount > 0) {
      const cookieStore = await cookies();
      const supabase = supabaseServer(cookieStore);

      // Начисляем баланс пользователю
      const { data: profile } = await supabase
        .from('profiles')
        .select('balance')
        .eq('id', userId)
        .single();

      await supabase
        .from('profiles')
        .update({ balance: (profile?.balance || 0) + amount })
        .eq('id', userId);

      // Создаём транзакцию пополнения
      await supabase.from('transaction').insert({
        transaction: 'Balance deposit',
        user_id: userId,
        status: 'completed',
        amount,
        type: 'deposit',
      });
    }
  }

  return Response.json({ received: true });
}
