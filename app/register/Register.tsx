"use client"

import { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import Link from 'next/link'

import axios from "axios"
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { SafeUser } from '@/types'
import Button from '../components/products/Button'
import Input from '../components/inputs/Input'
import Heading from '../components/products/Heading'
import { AiOutlineGoogle } from 'react-icons/ai'


interface RegisterFormProps{
    currentUser: SafeUser | null
}

const Cadastrar: React.FC<RegisterFormProps> = ({currentUser}) => {
    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    })

    const router = useRouter()

    useEffect(() => {
        if (currentUser) {
            router.push('/')
            router.refresh()
        }
    }, [])

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data).then(() => {
            toast.success("Conta criada");

            signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            }).then((callback) => {
                if(callback?.ok){
                    router.push("/")
                    router.refresh()
                    toast.success("Logado")
                }
                if(callback?.error){
                    toast.error(callback.error)
                }
            })
        })
        .catch(() => toast.error("Algo deu errado"))
        .finally(() => {
            setIsLoading(false)
        })
    }

    if (currentUser) {
        return <p className='text-center'>Registrando</p>
    }

    return (
            <>
                <Heading title='Cadastrar'/>
                <Button 
                    label='Cadastrar com google'
                    outline
                    onClick={() => {signIn('google')}}
                    icon={AiOutlineGoogle}
                />
                <hr className='bg-slate-300 w-full h-px'/>
                <Input 
                    id="name"
                    type="text"
                    label="Nome Completo"
                    register={register}
                    disabled={isLoading} 
                    errors={errors}  
                    required                              
                />
                <Input 
                    id="email"
                    type="email"
                    label="E-mail"
                    register={register}
                    disabled={isLoading}
                    errors={errors}
                    required
                />
                <Input
                    id="password"
                    type="password"
                    label="Senha"
                    register={register}
                    disabled={isLoading}
                    errors={errors}
                    required
                />
                <Button 
                    label={isLoading ? "Carregando" : "Cadastrar"} 
                    onClick={handleSubmit(onSubmit)}
                />
                <p className='text-sm'>
                    Já tem uma conta?{""}
                    <Link className='underline' href='/login'>
                        Acessar
                    </Link>
                </p>
            </>
    )
}

export default Cadastrar