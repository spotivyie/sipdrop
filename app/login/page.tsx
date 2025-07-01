export const dynamic = 'force-dynamic';

import getCurrentUser from "@/actions/getCurrentUser"
import Login from "./Login"
import Container from "../components/Container"
import FormWrap from "../components/products/FormWrap"

const LoginPage = async () => {
    const currentUser = await getCurrentUser()

    return(
        <Container>
            <FormWrap>
                <Login currentUser={currentUser}/>
            </FormWrap>
        </Container>
    )
}

export default LoginPage