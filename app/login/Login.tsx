"use client"

import { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { SafeUser } from '@/types'
import Button from '../components/products/Button'
import Input from '../components/inputs/Input'
import Heading from '../components/products/Heading'
import { AiOutlineGoogle } from 'react-icons/ai'

interface LoginFormProps{
    currentUser: SafeUser | null
}

const Login: React.FC<LoginFormProps> = ({currentUser}) => {
    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const router = useRouter()

    useEffect(() => {
        if (currentUser) {
            router.push('/')
            router.refresh()
        }
    }, [])

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        signIn('credentials', {
            ...data,
            redirect: false,
        }).then((callback) => {
            setIsLoading(false)

            if(callback?.ok){
                router.push("/")
                router.refresh()
                toast.success("Logado")
            }
            if(callback?.error){
                toast.error(callback.error)
            }
        })
    }

    if (currentUser) {
        return <p className='text-center'>Entrando</p>
    }

    return (
        <>
            <Heading title='Entrar'/>
            <Button 
                label='Entrar com google'
                outline
                onClick={() => {signIn('google')}}
                icon={AiOutlineGoogle}
            />
            <hr className='bg-slate-300 w-full h-px'/>
            <Input
                id="email"
                type="email"
                label="E-mail"
                register={register}
                disabled={isLoading}
                errors={errors}  
            />
            <Input
                id="password"
                type="password"
                label="Senha"
                register={register}
                disabled={isLoading}
                errors={errors}  
            />
            <Button 
                label={isLoading ? "Carregando" : "Entrar"} 
                onClick={handleSubmit(onSubmit)}
            />
            <p className='text-sm'>Não possui conta?{""}
                <Link className='underline' href='/register'>
                    Cadastrar
                </Link>
            </p>
        </>
    )
}

export default Login
