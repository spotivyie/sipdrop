'use client'
export const dynamic = 'force-dynamic';

import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/products/Heading";
import Button from "../components/products/Button";
import ItemContent from "./ItemContent";
import { useRouter } from "next/navigation"
import { formatPrice } from "../../utils/formatPrice";
import { SafeUser } from "@/types";

interface CartClientProps{
    currentUser: SafeUser | null
}

const CartClient: React.FC<CartClientProps> = ({currentUser}) => {
    const router = useRouter()
    const {cartProducts, handleClearCart, cartTotalAmount} = useCart()

    if(!cartProducts || cartProducts.length === 0){
        return ( 
            <div className="flex flex-col items-center mb-60">
                <div  className="text-2xlk">Seu carrinho esta vazio</div>
                <div>
                    <Link href={'/'} className="
                        text-slate-500
                        flex
                        items-center
                        gap-1
                        mt-2
                    ">
                        <MdArrowBack size={20}/>
                        <span>comece a comprar</span>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Heading title="Carrinho" center/>
            <div className="grid
                grid-cols-4
                text-xs
                gap-4
                pb-2
                items-center
                mt-8"
            >
                <div className="col-span-2 justify-self-start">produto</div>
                <div className="justify-self-center">preço</div>
                <div className="justify-self-center">quantidade</div>
                {/* <div className="justify-self-end">total</div> */}
            </div>
            <div>
                {cartProducts && cartProducts.map((item) => {
                    return <ItemContent key={item.id} item={item}/>
                })}
            </div>
            <div className="border-t-[1.5px] border-slate-400 py-4 flex justify-between gap-4">
                <div className="w-[130px]">
                    <Button label="Limpar carrinho" onClick={() => {handleClearCart()}} small outline/>
                </div>
                <div className="text-sm flex flex-col gap-1 items-start">
                    <div className="flex justify-between w-full text-base font-semibold">
                        <span>Subtotal</span>
                        <span>{formatPrice(cartTotalAmount)}</span>
                    </div>
                    <Button 
                        label={currentUser ? 'Continuar pagamento' : 'Entrar para continuar'}
                        outline={currentUser ? false : true} 
                        onClick={() => { currentUser ? router.push('/checkout') : router.push('/login') }}
                    />
                    <Link href={'/'} className="text-slate-500 flex items-center gap-1 mt-2">
                        <MdArrowBack size={20}/>
                        <span>Continue comprando</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CartClient;