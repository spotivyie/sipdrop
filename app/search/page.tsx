import getProducts from "@/actions/getProducts";
import Container from "../components/Container";
import NullData from "../components/products/NullData";
import Heading from "../components/products/Heading";
import ProductsCard from "../components/products/ProductCard";

interface SearchPageProps {
    searchParams: { searchTerm?: string; category?: string };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { searchTerm = "", category = "" } = searchParams;

    const products = await getProducts({ searchTerm, category });

    if (products.length === 0) {
        return (
        <Container>
            <NullData title="Nenhum produto encontrado" />
        </Container>
        );
    }

    return (
        <Container>
            <div className="p-8">
                <Heading title={`Resultados para ${searchTerm || category}`} center />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
                    {products.map((product) => (
                        <ProductsCard key={product.id} data={product} />
                    ))}
                </div>
            </div>
        </Container>
    );
}


