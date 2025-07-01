'use client'

import Link from "next/link";
import { CartProductType } from "../product/[productId]/ProductDetails";
import { formatPrice } from "../../utils/formatPrice";
import { truncateText } from "../../utils/truncateText";
import Image from "next/image";
import SetQuantity from "../components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";

interface ItemContentProps{
    item: CartProductType
}

const ItemContent:React.FC<ItemContentProps> = ({item}) => {
    const {handleRemoveProductFromCart, handleCartQtyIncrease, handleCartQtyDecrease} = useCart()

    return ( 
        <div className="
            grid
            grid-cols-4
            text-xs
            md:text-sm
            gap-4
            border-t-[1.5px]
            border-slate-200
            py-4
            items-center
        ">
            <div className="
                col-span-2
                justify-self-start
                flex
                gap-2
                md:gap-4
            ">
                <Link href={`/product/${item.id}`}>
                    <div className="relative w-[70px] aspect-square">
                        <Image src={item.image.image} alt={item.image.name} fill className="object-contain"/>
                    </div>
                </Link>
                <div className="flex flex-col justify-between">
                <Link href={`/product/${item.id}`}>
                    {truncateText(item.name)}
                </Link>
                <div>
                    <button className="text-slate-500 underline" onClick={() => handleRemoveProductFromCart(item)}>
                        Remover
                    </button>
                </div>
                </div>
            </div>
            <div className="justify-self-center">{formatPrice(item.price * item.quantity)}</div>
            <div className="justify-self-center">
                <SetQuantity
                    cartCounter={true}
                    cartProduct={item}
                    handleQtyIncrease={()=>handleCartQtyIncrease(item)}
                    handleQtyDecrease={()=>handleCartQtyDecrease(item)}
                />
            </div>
            {/* <div className="justify-self-end">
                {formatPrice(item.price * item.quantity)}
            </div> */}
        </div> 
    );
}

export default ItemContent;