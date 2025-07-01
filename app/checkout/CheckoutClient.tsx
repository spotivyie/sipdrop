'use client'

import { useCart } from '@/hooks/useCart'
import { Elements } from '@stripe/react-stripe-js'
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState, useRef } from 'react'
import toast from 'react-hot-toast'
import CheckoutForm from './CheckoutForm'
import Button from '../components/products/Button'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

const CheckoutClient = () => {
    const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [clientSecret, setClientSecret] = useState('')
    const [paymentSuccess, setPaymentSuccess] = useState(false)
    const isProcessing = useRef(false)

    const router = useRouter()

    console.log('paymentIntent', paymentIntent)
    console.log('clientSecret', clientSecret)
        
    useEffect(() => {
        if (cartProducts && !isProcessing.current && !clientSecret) {
            isProcessing.current = true
            setLoading(true)
            setError(false)

            fetch("/api/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: cartProducts,
                    payment_intent_id: paymentIntent,
                })
            })
            .then(async (res) => {
                setLoading(false)
                
                if (res.status === 401) {
                    isProcessing.current = false
                    return router.push("/login")
                }
                
                if (!res.ok) {
                    const errorText = await res.text()
                    console.error('API Error Response:', errorText)
                    throw new Error(`API returned ${res.status}: ${errorText}`)
                }
                
                const data = await res.json()
                
                if (!data.paymentIntent) {
                    throw new Error('PaymentIntent não encontrado na resposta')
                }
                
                return data
            })
            .then((data) => {
                if (data) { 
                    setClientSecret(data.paymentIntent.client_secret)
                    handleSetPaymentIntent(data.paymentIntent.id)
                    isProcessing.current = false
                }
            })
            .catch((error) => {
                setError(true)
                setLoading(false)
                console.error("Error:", error.message)
                toast.error("Erro ao processar pagamento: " + error.message)
                isProcessing.current = false
            })
        }
    }, [cartProducts])

    const options: StripeElementsOptions = {
        clientSecret,
        locale: "pt-BR",
        appearance: {
            theme: "stripe",
            labels: "floating",
        }
    }

    const handleSetPaymentSuccess = useCallback((value: boolean) => {
        setPaymentSuccess(value)
    }, [])

    return (
        <div className='w-full'>
            {clientSecret && cartProducts && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm 
                        clientSecret={clientSecret}
                        handleSetPaymentSuccess={handleSetPaymentSuccess}
                    />
                </Elements>
            )}
            {loading && <div className='text-center'>Carregando Checkout...</div>}
            {error && (
                <div className='text-center text-rose-500'>
                    <p>Erro ao carregar checkout.</p>
                    <button 
                        onClick={() => {
                            setError(false)
                            setClientSecret('')
                            isProcessing.current = false
                        }}
                        className='mt-2 text-blue-500 underline'
                    >
                        Tentar novamente
                    </button>
                </div>
            )}
            {paymentSuccess && (
                <div className='flex items-center flex-col gap-4'>
                    <div className='text-teal-500 text-center'>
                        Pagamento efetuado com sucesso
                    </div>
                    <div className='max-w-[220px] w-full'>
                        <Button
                            label="Ver seus pedidos" 
                            onClick={() => router.push('/orders')}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default CheckoutClient