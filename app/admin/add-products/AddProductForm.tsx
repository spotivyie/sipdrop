'use client'

import CategoryInput from "@/app/components/inputs/CategoryInput"
import CustomCheckBox from "@/app/components/inputs/CustomCheckBox"
import SelectImage from "@/app/components/inputs/SetColor"
import TextArea from "@/app/components/inputs/TextArea"
import { categories } from "@/utils/Categories"
import { imagem } from "@/utils/Images"
import { useCallback, useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import firebaseApp from "@/libs/firebase"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import axios from "axios"
import { useRouter } from "next/navigation"
import Input from "@/app/components/inputs/Input"
import Button from "@/app/components/products/Button"
import Heading from "@/app/components/products/Heading"

export type ImageType = {
    name: string
    image: File | null
}

export type UploadedImageType = {
    name: string
    image: string
}

const AddProductForm = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [image, setImage] = useState<ImageType[] | null>()
    const [isProductCreated, setIsProductCreated] = useState(false)

    const {register, handleSubmit, setValue, watch, reset, formState:{errors}} = useForm<FieldValues>({
        defaultValues:{
            name: '',
            image: [],
            price: '',
            descriptions: '',
            category: '',
            inStock: false
        }
    })

    useEffect(() => {
        setCustomValue('image', image)
    }, [image])

    useEffect(() => {
        if(isProductCreated){
            reset()
            setImage(null)
            setIsProductCreated(false)
        }
    }, [isProductCreated])

    const onSubmit: SubmitHandler<FieldValues> = async(data) => {
        console.log("Product Data", data)
        setIsLoading(true)
        let uploadedImage: UploadedImageType[] = []

        if(!data.category){
            setIsLoading(false)
            return toast.error('Categoria não selecionada')
        }

        if(!data.image || data.image.length === 0){
            setIsLoading(false)
            return toast.error('Imagem não selecionada')
        }

        const handleImageUploads = async() => {
            toast("Criando produto")
            try{
                for(const item of data.image){
                    if(item.image){
                        const fileName = new Date().getTime() + '-' + item.image.name
                        const storage = getStorage(firebaseApp)
                        const storageRef = ref(storage, `products/${fileName}`)
                        const uploadTask = uploadBytesResumable(storageRef, item.image)

                        await new Promise<void>((resolve, reject) => {
                            uploadTask.on(
                                'state_changed',
                                (snapshot) => {
                                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                    console.log('Upload is ' + progress + '% done');
                                    switch (snapshot.state) {
                                    case 'paused':
                                        console.log('Upload is paused');
                                        break;
                                    case 'running':
                                        console.log('Upload is running');
                                        break
                                    }
                                },
                                (error) => {
                                    console.log('error uploading image', error)
                                    reject(error)
                                },
                                () => {
                                    getDownloadURL(uploadTask.snapshot.ref).then(
                                        (downloadURL) => {
                                            uploadedImage.push({
                                                ...item,
                                                image: downloadURL
                                            })
                                            console.log('file available at', downloadURL)
                                            resolve()
                                        }
                                    ).catch((error) => {
                                        console.log('Error getting the download URL', error)
                                        reject(error)
                                    })
                                }
                            )
                        })
                    }
                }
            }catch(error){
                setIsLoading(false)
                console.log('Error handling image uploads', error)
                return toast.error('Error handling image uploads')
            }
        }
        await handleImageUploads()
        const productData = {...data, image: uploadedImage}
        
        axios.post('/api/product', productData).then(() => {
            toast.success('Produto criado')
            setIsProductCreated(true)
            router.refresh()
        }).catch((error) => {
            toast.error('Algo deu errado')
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const category = watch('category')

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    const addImageToState = useCallback((value: ImageType) => {
        setImage((prev) => {
            if(!prev){
                return [value]
            }

            return[...prev, value]
        })
    }, [])

    const removeImageFromState = useCallback((value: ImageType) => {
        setImage((prev) => {
            if(prev){
                const filteredImage = prev.filter((item) => item.name !== value.name)
                return filteredImage
            }

            return prev
        })
    }, [])

    return(
        <> 
            <Heading title="Adicionar produtos" center/>
            <Input
                id="name"
                label="Nome do produto"
                disabled={isLoading}
                register={register}
                required
                errors={errors}  
            />
            <Input
                id="price"
                label="Preço do produto"
                type="number"
                disabled={isLoading}
                register={register}
                required
                errors={errors}  
            />
            <TextArea 
                id="description"
                label="Descrição"
                disabled={isLoading}
                register={register}
                required
                errors={errors} 
            />
            <CustomCheckBox 
                id="inStock"
                label="Este produto está em estoque?"
                disabled={isLoading}
                register={register}
            />
            <div className="w-full font-medium">
                <div className="mb-2 font-semibold">Selecione uma categoria</div>
                <div className="grid grid-cols-2 gap-3 max-h[50vh] overflow-y-auto">
                    {categories.map((item) => {
                        if(item.label === 'Todas as Bebidas'){
                            return null
                        }
                        return <div key={item.label} className="col-span">
                            <CategoryInput
                                onClick={(category) => setCustomValue('category', category)}
                                selected={category === item.label}
                                label={item.label}
                            />
                        </div>
                    })}
                </div>  
            </div>
            <div className="w-full">
                {imagem.map((item, index) => {
                    return(
                        <SelectImage 
                            key={index}
                            item={item} 
                            addImageToState={addImageToState} 
                            removeImageFromState={removeImageFromState} 
                            isProductCreated = {isProductCreated}
                        />
                    )
                })}
            </div>
            <Button
                label={isLoading ? 'Carregando' : 'Adicionar produto'} 
                onClick={handleSubmit(onSubmit)}
            />
        </>
    )
}

export default AddProductForm