'use client'

import { ImageType } from '@/app/admin/add-products/AddProductForm'
import { useCallback } from 'react'
import {useDropzone} from 'react-dropzone'

interface SelectedImagesProps{
    item?: ImageType
    handleFileChange: (value: File) => void
}

const SelectImages: React.FC<SelectedImagesProps> = ({item, handleFileChange}) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if(acceptedFiles.length > 0){
            handleFileChange(acceptedFiles[0])
        }
    }, [])
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {'image/*' : ['.jpeg', '.png']},
    })

    return(
        <div className='border-2 border-slate-400 p-2 border-dashed cursor-pointer text-sm text-slate-400
        flex items-center justify-center'
        {...getRootProps()}>
            <input {...getInputProps()}/>
            {isDragActive ? (<p>Coloque a imagem aqui</p>) : (<p>Coloque a imagem aqui</p>)}
        </div>
    )
}


export default SelectImages