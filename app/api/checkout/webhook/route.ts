import { supabaseServer as createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  if (event.type === 'checkout.session.completed') {
    const randomDeposit = `DEPOSIT-${Math.floor(100000 + Math.random() * 900000)}`;
    const session = event.data.object as Stripe.Checkout.Session;

    if (!session.metadata?.user_id) {
      return NextResponse.json({ error: 'user ID missing' }, { status: 400 });
    }
    const { data, error } = await supabase
      .from('profiles')
      .select('balance')
      .eq('id', session.metadata?.user_id)
      .single();

    if (error) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 400 });
    }

    await supabase.from('transaction').insert({
      user_id: session.metadata?.user_id,
      amount: (session.amount_total ?? 0) / 100,
      status: 'completed',
      type: 'deposit',
      transaction: randomDeposit,
    });
    await supabase
      .from('balance')
      .update({ balance: data.balance + (session.amount_total ?? 0) / 100 })
      .eq('id', session.metadata?.user_id);

    console.log('Оплата успешна:', session.id);
  }

  if (event.type === 'payment_intent.payment_failed') {
    const randomDeposit = `DEPOSIT-${Math.floor(100000 + Math.random() * 900000)}`;
    const intent = event.data.object as Stripe.PaymentIntent;

    if (!intent.metadata?.user_id) {
      return NextResponse.json({ error: 'user ID missing' }, { status: 400 });
    }

    await supabase.from('transaction').insert({
      user_id: intent.metadata?.user_id,
      amount: intent.amount / 100,
      status: 'failed',
      type: 'deposit',
      transaction: randomDeposit,
    });

    console.log('Оплата не прошла:', intent.id);
  }

  return NextResponse.json({ received: true });
}
