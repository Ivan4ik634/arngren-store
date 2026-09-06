// app/api/checkout/route.ts

import { ProductT } from '@/types/ProductT';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { items, order } = await req.json();
    console.log(items);
    console.log(items.map((item: { product: ProductT; count: number }) => item.count));
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',

      line_items: items.map((item: { product: ProductT; count: number }) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.product.name,
          },
          unit_amount: Math.round(item.product.price * 100),
        },
        quantity: item.count,
      })),

      success_url: `http://localhost:3000/checkout/success`,
      cancel_url: `http://localhost:3000/checkout`,

      metadata: {
        order_id: order.id,
      },
      payment_intent_data: {
        metadata: {
          order_id: order.id,
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
