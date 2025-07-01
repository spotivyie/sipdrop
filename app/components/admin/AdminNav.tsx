'use client'

import Link from "next/link"
import AdminNavItem from "./AdminNavItem"
import { usePathname } from "next/navigation"
import Container from "../Container"
import { MdDashboard, MdDns, MdFormatListBulleted, MdLibraryAdd } from "react-icons/md"

const AdminNav = () => {
    const pathname = usePathname()

    return(
        <div className="w-full shadow-sm top-20 border-b-[1px] pt-4">
            <Container>
                <div className="flex flex-row items-center justify-between md:justify-center 
                gap-8 md:gap-12 overflow-x-auto flex-nowrap">
                    <Link href='/admin'>
                        <AdminNavItem icon={MdDashboard} label="Resumo" selected={pathname === '/admin'}/>
                    </Link>
                    <Link href='/admin/add-products'>
                        <AdminNavItem icon={MdLibraryAdd} label="Adicionar produtos" selected={pathname === '/admin/add-products'}/>
                    </Link>
                    <Link href='/admin/manage-products'>
                        <AdminNavItem icon={MdDns} label="Gerenciar produtos" selected={pathname === '/admin/manage-products'}/>
                    </Link>
                    <Link href='/admin/manage-orders'>
                        <AdminNavItem icon={MdFormatListBulleted} label="Gerenciar pedidos" selected={pathname === '/admin/manage-orders'}/>
                    </Link>
                </div>
            </Container>
        </div>
    )
}

export default AdminNav