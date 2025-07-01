'use client'

import { useCallback, useEffect, useState } from "react"
import SelectImages from "./SelectImages"
import { ImageType } from "@/app/admin/add-products/AddProductForm"
import Button from "../products/Button"

interface SelectImageProps{
    item: ImageType
    addImageToState: (value: ImageType) => void
    removeImageFromState: (value: ImageType) => void
    isProductCreated: boolean
}

const SelectImage: React.FC<SelectImageProps> = ({item, addImageToState, 
removeImageFromState, isProductCreated}) => {
    const [isSelected, setIsSelected] = useState(true)
    const [file, setFile] = useState<File | null>(null) 

    useEffect(() => {
        setIsSelected(true)
        setFile(null)
    }, [isProductCreated])

    const handleFileChange = useCallback((value: File) => {
        setFile(value)
        addImageToState({...item, image: value})
    }, [])

    // const handleCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    //     setIsSelected(e.target.checked)

    //     if(!e.target.checked){
    //         setFile(null)
    //         removeImageFromState(item)
    //     }
    // }, [])

    return(
        <div className="border-b-[1.2px] border-slate-200 items-center p-2 text-center">
            <div className="pb-4">
                <label>Imagem</label>
                {/* <input type="checkbox" checked={isSelected} onChange={handleCheck}/> */}
            </div>
            <>
                {isSelected && !file && (
                    <div className="text-center">
                        <SelectImages 
                            item={item}
                            handleFileChange={handleFileChange}
                        />
                    </div>
                )}
                {file && (
                    <div className="flex flex-row gap-2 text-sm col-span-2 items-center justify-between">
                        <p>{file?.name}</p>
                        <div className="w-70px">
                            <Button label="Remover" small outline onClick={() => {
                                setFile(null)
                                removeImageFromState(item)
                            }}/>
                        </div>
                    </div>
                )}
            </>
        </div>
    )
}

export default SelectImage