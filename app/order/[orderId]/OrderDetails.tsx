'use client'

import Status from '@/app/components/products/Status'
import { formatPrice } from '@/utils/formatPrice'
import { Order } from '@prisma/client'
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from 'react-icons/md'
import OrdemItem from './OrdemItem'
import moment from 'moment'
import 'moment/locale/pt-br'
import Heading from '@/app/components/products/Heading'

interface OrderDetailsProps{
    order: Order
}

const OrderDetails: React.FC<OrderDetailsProps> = ({order}) => {
    return (
        <div className='max-w-[1150px] m-auto flex flex-col gap-2'>
            <div className='mt-8'>
                <Heading title='Detalhes do pedido'/>
            </div>
            <div className='pt-6'>
                ID do pedido: {order.id}
            </div>
            <div>
                Preço: <span className='font-bold'>{formatPrice(order.amount/100)}</span>
            </div>
            <div className='flex gap-2 items-center'>
                <div>Status do pagamento</div>
                <div>
                    {order.status === 'pending' ? <Status 
                        text='Pendente'
                        icon={MdAccessTimeFilled}
                        bg='bg-slate-200'
                        color='text-slate-700'
                    /> : order.status === 'complete' ? <Status
                        text='Completo'
                        icon={MdDone}
                        bg='bg-green-200'
                        color='text-green-700'
                    /> : <></>}
                </div>
            </div>
            <div className='flex gap-2 items-center'>
                <div>Status do pagamento</div>
                <div>
                    {order.deliveryStatus === 'pending' ? (<Status 
                        text='Pendente'
                        icon={MdAccessTimeFilled}
                        bg='bg-slate-200'
                        color='text-slate-700'
                    />) : order.deliveryStatus === 'dispatched' ? (<Status
                        text='Despachando'
                        icon={MdDeliveryDining}
                        bg='bg-purple-200'
                        color='text-purple-700'
                    />) : order.deliveryStatus === 'delivered' ? (<Status
                        text='Entregue'
                        icon={MdDone}
                        bg='bg-green-200'
                        color='text-green-700'
                    />) : (<></>)}
                </div>
            </div>
            <div>
                Data: {moment(order.createDate).fromNow()}
            </div>
            <div className='pt-10'>
                <h2 className='font-semibold mt-4 mb-2'>Detalhes do produto</h2>
                <div className='grid grid-cols-5 gap-4 pb-2 items-center'>
                    <div className='col-span-2 justify-self-start'>Produto</div>
                    <div className='justify-self-center'>Preço</div>
                    <div className='justify-self-center'>Quantidade</div>
                    <div className='justify-self-end'>Total</div>
                </div>
                {order.products && 
                    order.products.map((item) =>{
                        return <OrdemItem key={item.id} item={item}/>
                    })
                }
            </div>
        </div>
    )
}

export default OrderDetails