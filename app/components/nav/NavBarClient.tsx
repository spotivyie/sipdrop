"use client"

import Link from "next/link"
import Container from "../Container"
import { MdLocalShipping, MdOutlineLocationOn } from "react-icons/md"
import Image from "next/image"
import CartCount from "./CartCount"
import UserMenu from "./UserMenu"
import SearchBar from "./SearchBar"

interface NavBarClientProps {
    currentUser: any
}

const NavBarClient: React.FC<NavBarClientProps> = ({ currentUser }) => {
    const categories = [
        "Categorias",
        "Oferta",
        "Whisky",
        "Vinho",
        "Licor",
        "Espumante",
        "Gin",
        "Vodka",
        "Champagne",
    ]

    return (
        <div className="w-full bg-white shadow-sm z-30">
            <div className="py-4 border-b-[1px]">
                <Container>

                {/* === DESKTOP === */}
                    <div className="hidden lg:flex items-start justify-between flex-wrap lg:flex-nowrap gap-4 py-3">
                        <Link href="/" className="flex-shrink-0">
                            <Image
                                src="/sipdrop.png"
                                alt="Logo"
                                width={160}
                                height={60}
                                className="object-contain"
                            />
                        </Link>

                        <div className="flex flex-col w-full gap-3 ">
                            <div className="flex justify-end items-center flex-wrap gap-24">
                                <div className="flex gap-3 text-sm font-medium">
                                    <button className="flex items-center gap-1 bg-orange-500 text-white px-4 py-2 rounded-full whitespace-nowrap">
                                        <MdLocalShipping size={18} /> Rastreio
                                    </button>
                                    <button className="flex items-center gap-1 bg-blue-50 text-orange-500 px-4 py-2 rounded-full whitespace-nowrap">
                                        <MdOutlineLocationOn size={18} /> Informe seu cep
                                    </button>
                                </div>
                                <div className="max-w-[600px]">
                                    <SearchBar />
                                </div>
                                <div className="flex items-center gap-4">
                                    <UserMenu currentUser={currentUser} />
                                    <CartCount />
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-center gap-10 font-semibold text-sm pt-2 overflow-x-auto whitespace-nowrap">
                                {categories.map((item, i) => {
                                const lowerItem = item.toLowerCase()
                                const isLinkable = !["categorias", "oferta"].includes(lowerItem)

                                return isLinkable ? (
                                    <Link
                                        key={i}
                                        href={`/search?category=${encodeURIComponent(item)}`}
                                        className="hover:text-orange-500 whitespace-nowrap"
                                    >
                                        {item}
                                    </Link>
                                ) : (
                                    <span
                                        key={i}
                                        className="cursor-default text-orange-500 whitespace-nowrap"
                                    >
                                        {item}
                                    </span>
                                )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* === TABLET === */}
                    <div className="hidden md:flex lg:hidden items-center justify-between gap-4 py-3">
                        <Link href="/" className="flex-shrink-0">
                            <Image
                                src="/sipdrop.png"
                                alt="Logo"
                                width={120}
                                height={45}
                                className="object-contain"
                            />
                        </Link>

                        <div className="flex-1 max-w-[300px]">
                            <SearchBar />
                        </div>

                        <div className="flex items-center gap-4">
                            <UserMenu currentUser={currentUser} />
                            <CartCount />
                        </div>
                    </div>

                    {/* === MOBILE === */}
                    <div className="flex flex-col md:hidden gap-3 py-3">
                        <div className="flex items-center justify-between">
                            <Link href="/" className="flex-shrink-0">
                                <Image
                                src="/sipdrop.png"
                                alt="Logo"
                                width={120}
                                height={45}
                                className="object-contain"
                                />
                            </Link>

                            <div className="flex items-center gap-4">
                                <UserMenu currentUser={currentUser} />
                                <CartCount />
                            </div>
                        </div>

                        <div className="w-full flex justify-center mt-6">
                            <SearchBar />
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default NavBarClient
