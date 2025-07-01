'use client'

import { Product } from "@prisma/client"
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { formatPrice } from "@/utils/formatPrice"
import Status from "@/app/components/products/Status"
import ActionBtn from "@/app/components/products/ActionBtn"

import { MdCached, MdClose, MdDelete, MdDone, MdRemoveRedEye } from 'react-icons/md'
import { useCallback } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { deleteObject, getStorage, ref } from "firebase/storage"
import firebaseApp from "@/libs/firebase"
import Heading from "@/app/components/products/Heading"

interface ManageProductsClientProps{
    products: Product[]
}

const ManageProductsClient: React.FC<ManageProductsClientProps> = ({ products }) => {
    const router = useRouter()
    const storage = getStorage(firebaseApp)
    let rows: any = []

    if(products){
        rows = products.map((product) =>{
            return {
                id: product.id,
                name: product.name,
                price: formatPrice(product.price),
                image: product.image,
                category: product.category,
                inStock: product.inStock,
            }
        })
    }

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 220},
        {field: 'name', headerName: 'Nome', width: 220},
        {field: 'price', headerName: 'Preço(BRL)', width: 140, renderCell: (params) => {
            return (<div className="font-bold text-slate-800">{params.row.price}</div>)
        }},
        {field: 'category', headerName: 'Categoria', width: 120},
        {field: 'inStock', headerName: 'Em estoque', width: 150, renderCell: (params) => {
            return (<div className="">{params.row.inStock === true ? 
                <Status 
                    text="Em estoque"
                    color="text-teal-700"
                    bg="bg-teal-200"
                    icon={MdDone}
                /> : 
                <Status 
                    text="Fora de estoque"
                    color="text-rose-700"
                    bg="bg-rose-200"
                    icon={MdClose}
                />
            }</div>)
        }},
        {field: 'action', headerName: 'Ações', width: 200, renderCell: (params) => {
            return (<div className="flex justify-between gap-4 w-full pt-2">
                <ActionBtn onClick={() => {handleToggleStock(params.row.id, params.row.inStock)}} icon={MdCached}/>
                <ActionBtn onClick={() => {handleDelete(params.row.id, params.row.images)}} icon={MdDelete}/>
                <ActionBtn onClick={() => router.push(`/product/${params.row.id}`)} icon={MdRemoveRedEye}/>
            </div>)
        }},
    ]

    const handleToggleStock = useCallback((id: string, inStock: boolean) => {
        axios.put('/api/product', {
            id,
            inStock: !inStock
        }).then((res) =>{
            toast.success('Status do produto mudou')
            router.refresh()
        }).catch((err) => {
            toast.error('Oops, Algo deu errado')
            console.log(err)
        })
    }, [])

    const handleDelete = useCallback(async(id: string, images: any[]) => {
        toast('Deletando produto')

        const handleImageDelete = async() => {
            try{
                for(const item of images){
                    if(item.image){
                        const imageRef = ref(storage, item.image)
                        await deleteObject(imageRef)
                        console.log('imagem deletada', item.image)
                    }
                }
            }catch(error){
                return console.log('Erro ao deletar imagens', error)
            }
        }
        
        await handleImageDelete()

        axios
        .delete(`/api/product/${id}`)
        .then((res) =>{
            toast.success('Produto deletado')
            router.refresh()
        }).catch((err) => {
            toast.error('Oops, Algo deu errado')
            console.log(err)
        })
    }, [])

    return(
        <div className="max-w-[1150px] m-auto text-xl mb-10">
            <div className="mb-4 mt-8">
                <Heading title="Gerenciar produtos" center/>
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

export default ManageProductsClient