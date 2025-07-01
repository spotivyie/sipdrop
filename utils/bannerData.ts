export type BannerDataType = {
  name: string;
  title?: string;
  subtitle?: string;
  highlight?: string;
  imageSrc: string;
  gradientClass?: string;
};

export const bannerData: BannerDataType[] = [
  {
    name: "home",
    imageSrc: "/home.png",
  },
  {
    name: "whisky",
    title: "Ofertas Imperdíveis",
    subtitle: "Compras acima de R$ 350 em bebidas",
    imageSrc: "/whisky.png",
  },
  {
    name: "vodka",
    title: "Promoção de Vodka",
    subtitle: "Frete grátis para todo o Brasil",
    highlight: "Aproveite agora!",
    imageSrc: "/vodka.png",
  },
  // {
  //   name: "gin",
  //   title: "Promoção de gin",
  //   subtitle: "Frete grátis para todo o Brasil",
  //   highlight: "Aproveite agora!",
  //   imageSrc: "/gin.png",
  //   gradientClass: "from-red-700 to-rose-500",
  // },
];
