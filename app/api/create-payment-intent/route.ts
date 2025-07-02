export const runtime = 'nodejs';

import Stripe from 'stripe';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';
import getCurrentUser from '@/actions/getCurrentUser';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-04-10',
});

const calculateOrderAmount = (items: { price: number; quantity: number }[]) => {
  return Math.floor(
    items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );
};

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { items, payment_intent_id } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Itens inválidos' }, { status: 400 });
    }

    const total = calculateOrderAmount(items) * 100;

    const orderData = {
      user: { connect: { id: currentUser.id } },
      amount: total,
      currency: 'BRL',
      status: 'pending',
      deliveryStatus: 'pending',
      paymentIntentId: payment_intent_id,
      products: items,
    };

    if (payment_intent_id) {
      try {
        const currentIntent = await stripe.paymentIntents.retrieve(payment_intent_id);

        if (currentIntent) {
          const updatedIntent = await stripe.paymentIntents.update(payment_intent_id, {
            amount: total,
          });

          const existingOrder = await prisma.order.findFirst({
            where: { paymentIntentId: payment_intent_id },
          });

          if (existingOrder) {
            await prisma.order.update({
              where: { paymentIntentId: payment_intent_id },
              data: {
                amount: total,
                products: items,
              },
            });
          }

          return NextResponse.json({ paymentIntent: updatedIntent });
        }
      } catch (stripeError) {
        console.error('Erro ao atualizar intent:', stripeError);
      }
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'BRL',
      automatic_payment_methods: { enabled: true },
    });

    orderData.paymentIntentId = paymentIntent.id;

    await prisma.order.create({
      data: orderData,
    });

    return NextResponse.json({ paymentIntent });

  } catch (error) {
    console.error('Erro interno:', error);
    return NextResponse.json(
      { error: 'Erro interno no servidor' },
      { status: 500 }
    );
  }
}
