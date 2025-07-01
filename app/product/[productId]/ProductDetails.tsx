'use client'

import Button from "@/app/components/products/Button"
import SetQuantity from "@/app/components/products/SetQuantity"
import { formatPrice } from "@/utils/formatPrice"
import { useCart } from "@/hooks/useCart"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { MdCheckCircle } from 'react-icons/md'

interface ProductDetailsProps{
    product: any
}

export type CartProductType = {
    id: string
    name: string
    description: string
    category: string
    image: Image
    quantity: number
    price: number
}

export type Image = {
    name: string
    image: string
}

const Horizontal = () => {
    return <hr className="w-[30%] my-2"/>
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    const {handleAddProductToCart, cartProducts} = useCart()
    const [isProductInCart, setIsProductInCart] = useState(false)
    const [cartProduct, setCartProduct] = useState<CartProductType>({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        image: {...product.image[0]},
        quantity: 1,
        price: product.price,
    })

    const router = useRouter()

    console.log(cartProduct)

    useEffect(() => {
        setIsProductInCart(false)

        if(cartProducts){
            const existingIndex = cartProducts.findIndex((item) => item.id === product.id)

            if(existingIndex > -1){
                setIsProductInCart(true)
            }
        }
    }, [cartProducts])
    
    const handleQtyIncrease = useCallback(() => {
        if(cartProduct.quantity === 40){
            return
        }
        setCartProduct((prev) => {
            return {...prev, quantity: ++prev.quantity}
        })
    }, [cartProduct])

    const handleQtyDecrease = useCallback(() => {
        if(cartProduct.quantity === 1){
            return
        }
        setCartProduct((prev) => {
            return {...prev, quantity: --prev.quantity}
        })
    }, [cartProduct])

    return(
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="aspect-square relative">
                <Image fill src={cartProduct.image.image} alt={cartProduct.image.name}
                className="w-full h-full object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px] "/>
            </div>
            <div className="flex flex-col gap-1 text-sm">
                <h2 className="text-3xl font-medium">{product.name}</h2>
                <div className="text-3xl font-bold">
                    {formatPrice(product.price)}
                </div>
                <Horizontal/>
                <div className="text-justify">
                    {product.description}
                </div>
                <Horizontal/>
                <div>
                    <span className="font-semibold">Categoria: </span>{product.category}
                </div>
                <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
                    {product.inStock ? "Em estoque" : "Fora de estoque"}
                </div>
                <Horizontal/>  
                {isProductInCart ? (
                    <>
                        <p className="mb-2 text-slate-500 flex items-center gap-1">
                            <MdCheckCircle className="text-teal-400" size={20} />
                            <span>Produto adicionado ao carrinho</span>
                        </p>
                        <div className="max-w-[300px]">
                            <Button label="Ver carrinho" outline onClick={() => router.push('/cart')} />
                        </div>
                    </>
                ) : product.inStock ? (
                    <>
                        <SetQuantity 
                            cartProduct={cartProduct}
                            handleQtyIncrease={handleQtyIncrease}
                            handleQtyDecrease={handleQtyDecrease}
                        />
                        <Horizontal />
                        <div className="max-w-[300px]">
                            <Button
                                label="Adicionar ao carrinho"
                                onClick={() => handleAddProductToCart(cartProduct)}
                            />
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    )
}

export default ProductDetails