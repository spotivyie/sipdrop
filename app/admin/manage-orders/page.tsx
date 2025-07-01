import getCurrentUser from "@/actions/getCurrentUser"
import NullData from "@/app/components/products/NullData"
import ManageOrdersClient from "./ManageOrderClient"
import getOrders from "@/actions/getOrders"
import Container from "@/app/components/Container"

const ManageOrders = async() => {
    const orders = await getOrders()
    const currentUser = await getCurrentUser()

    if(!currentUser || currentUser.role !== "ADMIN"){
        return <NullData title="Oops! Acesso negado"/>
    }

    return(
        <div className="pt-8">
            <Container>
                <ManageOrdersClient orders={orders}/>
            </Container>
        </div>
    )
}

export default ManageOrders