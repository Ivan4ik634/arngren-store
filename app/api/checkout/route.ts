// app/api/checkout/route.ts

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { amount, user_id } = body;

    const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Balance deposit',
            },
            unit_amount: Math.round(amount * 100), // amount в долларах -> центы
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/checkout/success`,
      cancel_url: `${origin}/checkout`,
      metadata: {
        type: 'deposit',
        user_id,
      },
      payment_intent_data: {
        metadata: {
          type: 'deposit',
          user_id,
        },
      },
    });

    return Response.json({
      url: session.url,
    });
  } catch (error) {
    console.error(error);

    return Response.json({ error: 'Checkout failed' }, { status: 500 });
  }
}
