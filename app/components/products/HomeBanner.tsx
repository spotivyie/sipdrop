"use client";
import Image from "next/image";
import { bannerData } from "@/utils/bannerData";

interface BannerProps {
  name: string;
}

const HomeBanner = ({ name }: BannerProps) => {
  const data = bannerData.find((item) => item.name === name);
  if (!data) return null;

  const hasGradient = "gradientClass" in data && Boolean(data.gradientClass);

  return (
    <div className="relative w-screen xl:w-full left-1/2 -translate-x-1/2 mb-8 min-h-[350px] overflow-hidden">
      {/* Fundo - gradiente ou imagem de fundo */}
      {hasGradient ? (
        <div
          className={`absolute inset-0 bg-gradient-to-r ${data.gradientClass} z-0`}
        />
      ) : (
        <Image
          src={data.imageSrc}
          alt={data.title ?? data.name}
          fill
          className="object-cover z-0"
          priority
        />
      )}

      {/* Conteúdo por cima */}
      <div className="relative z-10 mx-auto px-8 py-12 flex flex-col md:flex-row items-start justify-between text-white h-full">

        <div className="text-left max-w-lg">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{data.title}</h1>
          <p className="text-lg md:text-xl mb-2">{data.subtitle}</p>
          {data.highlight && (
            <p className="text-2xl md:text-5xl text-orange-500 font-bold">
              {data.highlight}
            </p>
          )}
        </div>

        {/* Imagem decorativa à direita (só com gradiente) */}
        {hasGradient && (
          <div className="w-1/3 relative aspect-video">
            <Image
              src={data.imageSrc}
              alt={data.title ?? data.name}
              fill
              className="object-contain"
              priority
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeBanner;
