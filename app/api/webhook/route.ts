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
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.order_id;

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID missing' }, { status: 400 });
    }

    await supabase.from('orders').update({ status: 'approved' }).eq('id', orderId);

    console.log('Оплата успешна:', session.id);
  }

  if (event.type === 'payment_intent.payment_failed') {
    const intent = event.data.object as Stripe.PaymentIntent;
    const orderId = intent.metadata?.order_id;

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID missing' }, { status: 400 });
    }

    await supabase.from('orders').update({ status: 'rejected' }).eq('id', orderId);

    console.log('Оплата не прошла:', intent.id);
  }

  return NextResponse.json({ received: true });
}
