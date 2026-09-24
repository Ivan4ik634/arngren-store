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
    const userId = session.metadata?.user_id;
    const amount = (session.amount_total ?? 0) / 100;

    if (!userId) {
      return NextResponse.json({ error: 'User ID missing in metadata' }, { status: 400 });
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('balance')
      .eq('id', userId)
      .single();

    if (profileError) {
      console.error('PROFILE ERROR:', profileError);

      return NextResponse.json({ error: 'Profile not found' }, { status: 400 });
    }

    const { error: transactionError } = await supabase.from('transaction').insert({
      user_id: userId,
      amount,
      status: 'completed',
      type: 'deposit',
      transaction: randomDeposit,
    });

    if (transactionError) {
      console.error('TRANSACTION ERROR:', transactionError);

      return NextResponse.json({ error: 'Transaction creation failed' }, { status: 400 });
    }

    const { data: updatedProfile, error: updateError } = await supabase
      .from('profiles')
      .update({
        balance: (profile.balance ?? 0) + amount,
      })
      .eq('id', userId)
      .select('balance')
      .single();

    if (updateError) {
      console.error('BALANCE UPDATE ERROR:', updateError);

      return NextResponse.json({ error: 'Balance update failed' }, { status: 400 });
    }

    console.log('Balance updated:', updatedProfile.balance);
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
