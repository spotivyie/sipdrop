import Link from "next/link"
import Container from "../Container"
import FooterList from "./FooterList"
import { AiFillInstagram, AiFillFacebook, AiOutlineTwitter } from "react-icons/ai"

const Footer = () => {
    return ( 
        <footer className="
            text-sm
            mt-16"
        >
            <Container>
                <div className="flex flex-col md:flex-row justify-between pt-1 pb-8">
                    <FooterList>
                        <h3 className="text-base font-bold mb-2">Categorias</h3>
                        <Link href="#" className="hover:text-orange-500">Whisky</Link>
                        <Link href="#" className="hover:text-orange-500">Vinho</Link>
                        <Link href="#" className="hover:text-orange-500">Gin</Link>
                        <Link href="#" className="hover:text-orange-500">Vodka</Link>
                    </FooterList>
                    <FooterList>
                        <h3 className="text-base font-bold mb-2">Contato</h3>
                        <p>Segunda a sexta: 8h às 18h30</p>
                        <p>atendimento@atendimento.com</p>
                        <p>(99) 99999-9999</p>
                        <p>Localizado no estado, cidade,<br/>bairro, numero</p>
                    </FooterList>
                    <FooterList>
                        <h3 className="text-base font-bold mb-2">Sobre nós</h3>
                        <p>algo aqui</p>
                        <p>&copy; {new Date().getFullYear()} SipDrop todos os direitos reservados</p>
                    </FooterList>
                    <FooterList>
                        <h3 className="text-base font-bold mb-2">Redes sociais</h3>
                        <div className="flex gap-2">
                            <Link href="#"className="hover:text-orange-500">
                                <AiFillInstagram size={30} />
                            </Link>
                            <Link href="#"className="hover:text-orange-500">
                                <AiFillFacebook size={30} />
                            </Link>
                            <Link href="#"className="hover:text-orange-500">
                                <AiOutlineTwitter size={30} />
                            </Link>
                        </div>
                    </FooterList>
                </div>
            </Container>
        </footer>
    )
}

export default Footer