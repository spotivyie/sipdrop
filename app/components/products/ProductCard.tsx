'use client'

import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductsCardProps{
    data: any
}

const ProductsCard: React.FC<ProductsCardProps> = ({data}) => {
    const router = useRouter()

    return ( 
            <div 
                onClick={() => router.push(`/product/${data.id}`)}
                className="col-span-1
                cursor-pointer
                border-[1.2px]
                border-slate-200
                bg-slate-50
                rounded-sm
                p-2 
                mb-10
                transition
                hover:scale-105
                text-center
                text-sm"
            >
                <div className="flex
                    flex-col
                    items-center
                    w-full
                    gap-1
                ">
                    <div className="aspect-square overflow-hidden relative w-full">
                        <Image fill className="w-full h-full object-contain" src={data.image[0].image} alt={data.name}/>
                    </div>
                    <div className="mt-4 mb-4">
                        {truncateText(data.name)}
                    </div>
                    {/* <div className="mt-4 mb-4">
                        {truncateText(data.description)}
                    </div> */}
                    <div className="mb-4 font-semibold">
                        {formatPrice(data.price)}
                    </div>
                </div>
            </div>
    );
}

export default ProductsCard;