import getProductById from "@/actions/getProductById"
import ProductDetails from "./ProductDetails"
import Container from "@/app/components/Container"
import NullData from "@/app/components/products/NullData"

interface IPrams {
    productId?: string
}

const ProductId = async({params}: {params: IPrams}) => {
    const product = await getProductById(params)
    
    if(!product) return <NullData title="Oops, Produto com o ID não existe"/>

    return (
        <div className="p-8">
            <Container>
                <ProductDetails product={product} />
            </Container>
        </div>
    )
}

export default ProductId