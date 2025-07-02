import prisma from "@/libs/prismadb"

export interface IProductParams {
    category?: string | null
    searchTerm?: string | null
}

export default async function getProducts(params: IProductParams) {
    try {
        const { category, searchTerm } = params
        const searchString = searchTerm || ''

        const products = await prisma.product.findMany({
        where: {
            OR: [
                {
                    name: {
                    contains: searchString,
                    mode: 'insensitive'
                    }
                },
                {
                    description: {
                    contains: searchString,
                    mode: 'insensitive'
                    }
                },
                {
                    category: {
                    contains: searchString,
                    mode: 'insensitive'
                    }
                }
            ],
            ...(category && { category })
            }
        })

        return products
    } catch (error: any) {
        throw new Error(error)
    }
}
