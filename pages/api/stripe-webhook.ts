export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; 

import { NextApiRequest, NextApiResponse } from "next"
import { buffer } from "micro"
import Stripe from "stripe"
import prisma from '@/libs/prismadb' 

export const config = {
    api: {
        bodyParser: false,
    },    
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-04-10',
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const buf = await buffer(req)
    const sig = req.headers['stripe-signature']

    if (!sig) {
        console.log("Missing the stripe signature")
        return res.status(400).send("Missing the stripe signature")
    }

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!)
    } catch (err) {
        console.log("Webhook error:", (err as Error).message)
        return res.status(400).send("Webhook error: " + (err as Error).message)
    }

    try {
        switch (event.type) {
        case "charge.succeeded": {
            const charge = event.data.object as Stripe.Charge

            if (typeof charge.payment_intent === "string") {
            console.log("Webhook charge.succeeded - paymentIntentId:", charge.payment_intent)
            const order = await prisma.order.findFirst({
                where: { paymentIntentId: charge.payment_intent }
            })

            if (!order) {
                console.log("Pedido NÃO encontrado para paymentIntentId:", charge.payment_intent)
            } else {
                console.log("Pedido encontrado. ID do pedido:", order.id)
                await prisma.order.update({
                where: { id: order.id },
                data: {
                    status: "complete",
                    address: charge.shipping?.address ? {
                    city: charge.shipping.address.city || '',
                    country: charge.shipping.address.country || '',
                    line1: charge.shipping.address.line1 || '',
                    line2: charge.shipping.address.line2 || null,
                    postal_code: charge.shipping.address.postal_code || '',
                    state: charge.shipping.address.state || '',
                    } : null
                }
                })
                console.log("Pedido atualizado para status 'complete'")
            }
            }
            break
        }
        case "payment_intent.succeeded": {
            const paymentIntent = event.data.object as Stripe.PaymentIntent
            console.log("Webhook payment_intent.succeeded - paymentIntentId:", paymentIntent.id)

            const order = await prisma.order.findFirst({
            where: { paymentIntentId: paymentIntent.id }
            })

            if (!order) {
            console.log("Pedido NÃO encontrado para paymentIntentId:", paymentIntent.id)
            } else {
            await prisma.order.update({
                where: { id: order.id },
                data: { status: "complete" }
            })
            console.log("Pedido atualizado para status 'complete' via payment_intent.succeeded")
            }
            break
        }
        default:
            console.log("Unhandled event type:", event.type)
        }
    } catch (error) {
        console.error("Erro ao processar webhook:", error)
        return res.status(500).send("Erro interno do servidor")
    }

    res.json({ received: true })
}
