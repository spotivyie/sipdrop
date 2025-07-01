import prisma from '@/libs/prismadb'

interface IParams {
    productId?: string
}

export default async function getProductById(params: IParams) {
    try {
        const { productId } = params

        if (!productId) return null

        const product = await prisma.product.findUnique({
            where: {
                id: productId
            },
        })

        return product
    } catch (error) {
        console.error("Erro em getProductById:", error)
        return null 
    }
}
