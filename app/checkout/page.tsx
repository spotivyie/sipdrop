export const dynamic = 'force-dynamic'

import CheckoutClient from './CheckoutClient'
import Container from '../components/Container'
import FormWrap from '../components/products/FormWrap'

const Checkout = () => {
    return (
            <div className='p-8'>
                <Container>
                    <FormWrap>
                        <CheckoutClient/>
                    </FormWrap>
                </Container>
            </div>
    )
}

export default Checkout