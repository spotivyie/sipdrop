'use client'

import AdminNav from "../components/admin/AdminNav"

export const metaData = {
    title: 'Bebidas',
    description: 'Admin dashboard',
}

const AdminLayout = ({children} : {children: React.ReactNode}) => {
    return(
        <div>
            <AdminNav/>
            {children}
        </div>
    )
}

export default AdminLayout