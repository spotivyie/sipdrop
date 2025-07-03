'use client'

import { useRouter } from "next/navigation"
import queryString from "query-string"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { CiSearch } from "react-icons/ci";

const SearchBar = () =>{
    const router = useRouter()

    const{
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<FieldValues>({
        defaultValues: {
            searchTerm: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if(!data.searchTerm) return router.push('/')

        const url = queryString.stringifyUrl({
            url: '/search',
            query: {
                searchTerm: data.searchTerm
            }
        }, {skipNull: true})

        router.push(url)
        reset()
    }

    return(
        <div className="flex items-center border border-orange-400 rounded-md w-full lg:w-80 overflow-hidden">
            <input 
                {...register('searchTerm')}
                autoComplete="off"
                type="text"
                placeholder="Procurar" 
                className="p-2 flex-grow focus:outline-none focus:border-orange-500"
            />
            <button 
                onClick={handleSubmit(onSubmit)} 
                className="
                bg-orange-500
                hover:opacity-80
                text-white
                p-2
                flex items-center justify-center
                "
            >
                <CiSearch size={26}/>
            </button>
        </div>
    )
}

export default SearchBar
