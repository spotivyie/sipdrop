import NullData from "@/app/components/products/NullData"
import AddProductForm from "./AddProductForm"
import getCurrentUser from "@/actions/getCurrentUser"
import Container from "@/app/components/Container"
import FormWrapAdd from "@/app/components/products/FormWrapAdd"

const AddProducts = async() => {
    const currentUser = await getCurrentUser()

    if(!currentUser || currentUser.role !== "ADMIN"){
        return <NullData title="Oops! Acesso negado"/>
    }

    return(
        <div className="pt-8">
            <Container>
                <FormWrapAdd>
                    <AddProductForm />
                </FormWrapAdd>
            </Container>
        </div>
    )
}

export default AddProducts