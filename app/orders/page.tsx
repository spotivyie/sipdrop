export const dynamic = 'force-dynamic';

import getCurrentUser from "@/actions/getCurrentUser"
import NullData from "@/app/components/products/NullData"
import getOrdersByUserId from "@/actions/getOrdersByUserId"
import OrdersClient from "./OrderClient"
import Container from "../components/Container"

const Orders = async() => {
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return <NullData title="Oops! Acesso negado"/>
    }

    const orders = await getOrdersByUserId(currentUser.id)

    if(!orders){
        return <NullData title="Sem pedidos ainda..."/>
    }

    return(
        <div className="pt-8">
            <Container>
                <OrdersClient orders={orders}/>
            </Container>
        </div>
    )
}

export default Orders