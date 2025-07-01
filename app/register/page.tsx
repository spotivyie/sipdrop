export const dynamic = 'force-dynamic';

import getCurrentUser from "@/actions/getCurrentUser"
import Cadastrar from "./Register"
import Container from "../components/Container"
import FormWrap from "../components/products/FormWrap"

const RegisterPage = async () => {
    const currentUser = await getCurrentUser()

    return(
        <Container>
            <FormWrap>
                <Cadastrar currentUser={currentUser} />
            </FormWrap>
        </Container>
    )
}

export default RegisterPage