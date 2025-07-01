'use client'

import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { useState } from "react";
import ProductsCard from "./ProductCard";

const CategoryProduct = () => {
    const [bebidas, setBebidas] = useState<CartProductType[]>([])

    return ( 
        <div>
            <ProductsCard data={bebidas}/>
        </div>
    );
}

export default CategoryProduct;