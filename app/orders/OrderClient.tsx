'use client'

import { Order, User } from "@prisma/client"
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { formatPrice } from "@/utils/formatPrice"
import Status from "@/app/components/products/Status"
import ActionBtn from "@/app/components/products/ActionBtn"

import { MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemoveRedEye } from 'react-icons/md'
import { useRouter } from "next/navigation"
import moment from 'moment'
import 'moment/locale/pt-br'
import Heading from "../components/products/Heading"

interface OrderClientProps{
    orders: ExtendedOrder[]
}

type ExtendedOrder = Order & {
    user: User
}

const OrderClient: React.FC<OrderClientProps> = ({ orders }) => {
    const router = useRouter()
    let rows: any = []

    if(orders){
        rows = orders.map((order) =>{
            return {
                id: order.id,
                customer: order.user.name,
                amount: formatPrice(order.amount / 100),
                paymentStatus: order.status,
                date: moment(order.createDate).fromNow(),
                deliveryStatus: order.deliveryStatus,
            }
        })
    }

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 220},
        {field: 'customer', headerName: 'Nome', width: 160},
        {field: 'amount', headerName: 'Valor total', width: 130, renderCell: (params) => {
            return (<div>{params.row.amount}</div>)
        }},
        {field: 'paymentStatus', headerName: 'Pagamento', width: 130, renderCell: (params) => {
            return (<div>
                {params.row.paymentStatus === 'pending' ? (
                    <Status 
                        text="Pendente"
                        color="text-slate-700"
                        bg="bg-slate-200"
                        icon={MdAccessTimeFilled}
                    />
                ) : params.row.paymentStatus === 'complete' ? (
                    <Status 
                        text="Completo"
                        color="text-green-700"
                        bg="bg-green-200"
                        icon={MdDone}
                    />
                ) : (<></>) }
            </div>)
        }},
        {field: 'deliveryStatus', headerName: 'Entrega', width: 150, renderCell: (params) => {
            return (<div>
                {params.row.deliveryStatus === 'pending' ? (
                    <Status 
                        text="Pendente"
                        color="text-slate-700"
                        bg="bg-slate-200"
                        icon={MdAccessTimeFilled}
                    />
                ) : params.row.deliveryStatus === 'dispatched' ? (
                    <Status 
                        text="Despachando"
                        color="text-purple-700"
                        bg="bg-purple-200"
                        icon={MdDeliveryDining}
                    />
                ): params.row.deliveryStatus === 'delivered' ? (
                    <Status 
                    text="Entregue"
                    color="text-green-700"
                    bg="bg-green-200"
                    icon={MdDone}
                    />
                ): <></> }
            </div>)
        }},
        {field: 'date', headerName: 'Data', width: 150,},
        {field: 'action', headerName: 'Ações', width: 100, renderCell: (params) => {
            return (<div className="flex justify-between gap-4 w-full pt-2">
                <ActionBtn onClick={() => router.push(`/order/${params.row.id}`)} icon={MdRemoveRedEye}/>
            </div>)
        }},
    ]

    return(
        <div className="max-w-[1150px] m-auto text-xl">
            <div className="mb-4 mt-8">
                <Heading title="Gerenciar pedidos" center/>
            </div>
            <div style={{height: 600, width:"100%"}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 9 },
                        },
                    }}
                    pageSizeOptions={[9, 20]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </div>
        </div>
    )
}

export default OrderClient