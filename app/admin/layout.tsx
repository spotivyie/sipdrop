'use client'

import AdminNav from "../components/admin/AdminNav"

const AdminLayout = ({children} : {children: React.ReactNode}) => {
    return(
        <div>
            <AdminNav/>
            {children}
        </div>
    )
}

export default AdminLayout