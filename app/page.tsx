import getProducts, { IProductParams } from "@/actions/getProducts";
import Container from "./components/Container";
import HomeBanner from "./components/products/HomeBanner";
import NullData from "./components/products/NullData";
import Heading from "./components/products/Heading";
import SwiperCarousel from "./components/products/SwiperCarousel";

interface HomeProps{
  searchParams: IProductParams
}

export default async function Home({searchParams}: HomeProps) {
  const products = await getProducts(searchParams)

  if(products.length === 0){
    return <NullData title="Nenhum produto encontrado"/>
  }

  function shuffleArray(array: any){
    for(let i = array.length -1; i > 0; i--){
      const j = Math.floor(Math.random() * (i+1));
      [array[i], array[j]] = [array[j], array[i]]
    }

    return array
  }

  const shuffledProducts = shuffleArray(products)

  const categories = [
    'Whisky',
    'Vodka',
    'Gin',
    'Vinho'
  ]

  function filterCategory(id: any){
    return products.filter(products => products.category === categories[id])
  }

  return (
    <div className="p-8">
      <Container>
        <HomeBanner name="home" />
        <div className="py-10">
          <Heading title="Destaques" center/>
          <p className="text-center text-gray-500 font-medium pt-2">Temos uma seleção incrível, deixe-se levar!</p>
        </div>
        <SwiperCarousel products={shuffledProducts} />
        <HomeBanner name="whisky" />
        <div className="py-10">
          <Heading title="Whisky" center/>
          <p className="text-center text-gray-500 font-medium pt-2">Sabemos que você não vai querer perdê-los.</p>
        </div>
        <SwiperCarousel products={filterCategory(0)} />
        <div className="pb-10">
          <Heading title="Gin" center/>
          <p className="text-center text-gray-500 font-medium pt-2">Você não vai querer ficar de fora.</p>
        </div>
        <SwiperCarousel products={filterCategory(2)} />
        <HomeBanner name="vodka" />
        <div className="py-10">
          <Heading title="Vodka" center/>
          <p className="text-center text-gray-500 font-medium pt-2">Dê uma olhada em nossa seleção de vodka.</p>
        </div>
        <SwiperCarousel products={filterCategory(1)} />
      </Container>
    </div>
  );
}
