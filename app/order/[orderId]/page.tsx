import getOrderById from "@/actions/getOrderById"
import OrderDetails from "./OrderDetails"
import NullData from "@/app/components/products/NullData"
import Container from "@/app/components/Container"

interface IParams {
    orderId?: string
}

const Order = async ({params}: {params: IParams}) => {
    const order = await getOrderById(params)

    if(!order) return <NullData title="Sem pedido"/>

    return (
        <div className="p-8">
            <Container>
                <OrderDetails order={order} />
            </Container>
        </div>
    )
}

export default Order