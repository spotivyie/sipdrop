export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import Stripe from 'stripe'
import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'
import getCurrentUser from '@/actions/getCurrentUser'
import { CartProductType } from '@/app/product/[productId]/ProductDetails'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-04-10",
})

const calculateOrderAmount = (items: CartProductType[]) => {
    const totalPrice = items.reduce((acc, item) => {
        const itemTotal = item.price * item.quantity
        return acc + itemTotal
    }, 0)

    const price: any = Math.floor(totalPrice)
    return price
}

export async function POST(request: Request) {
    try {
        console.log('=== Payment Intent API Called ===')
        
        const currentUser = await getCurrentUser()
        console.log('Current User:', currentUser?.id)

        if (!currentUser) {
            console.log('❌ No current user found')
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        console.log('Request Body:', body)
        
        const { items, payment_intent_id } = body
        
        if (!items || !Array.isArray(items) || items.length === 0) {
            console.log('❌ Invalid items')
            return NextResponse.json({ error: 'Items são obrigatórios' }, { status: 400 })
        }

        const total = calculateOrderAmount(items) * 100
        console.log('Calculated Total:', total)
        
        const orderData = {
            user: { connect: { id: currentUser.id } },
            amount: total,
            currency: "BRL",
            status: "pending",
            deliveryStatus: "pending",
            paymentIntentId: payment_intent_id,
            products: items,
        }

        if (payment_intent_id) {
            console.log('🔄 Updating existing payment intent:', payment_intent_id)
            
            try {
                const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id)
                console.log('Current intent found:', current_intent.id)

                if (current_intent) {
                    const update_intent = await stripe.paymentIntents.update(
                        payment_intent_id,
                        { amount: total }
                    )
                    console.log('Updated intent:', update_intent.id)

                    // Update the order
                    const existing_order = await prisma.order.findFirst({
                        where: { paymentIntentId: payment_intent_id }
                    })

                    if (existing_order) {
                        const updated_order = await prisma.order.update({
                            where: { paymentIntentId: payment_intent_id },
                            data: {
                                amount: total,
                                products: items
                            },
                        })
                        console.log('Updated order:', updated_order.id)
                    } else {
                        console.log('⚠️ No existing order found for payment intent')
                    }

                    return NextResponse.json({ paymentIntent: update_intent })
                }
            } catch (stripeError) {
                console.error('❌ Stripe error during update:', stripeError)
                // Se não conseguir atualizar, cria um novo
            }
        }
        
        // Create new payment intent
        console.log('🆕 Creating new payment intent')
        
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: "BRL",
            automatic_payment_methods: { enabled: true },
        })
        console.log('Created payment intent:', paymentIntent.id)

        // Create the order
        orderData.paymentIntentId = paymentIntent.id

        const newOrder = await prisma.order.create({
            data: orderData,
        })
        console.log('Created order:', newOrder.id)

        return NextResponse.json({ paymentIntent })

    } catch (error) {
        console.error('❌ API Error:', error)

        const isDev = process.env.NODE_ENV === 'development'

        const errorMessage = error instanceof Error
            ? error.message
            : 'Erro interno do servidor'

        return NextResponse.json(
            { 
                error: 'Internal server error',
                details: isDev ? errorMessage : 'Erro interno do servidor'
            }, 
            { status: 500 }
        )
    }
}