'use client'

import { FieldValues, UseFormRegister } from "react-hook-form"

interface CustomCheckBoxProps{
    id: string
    label: string
    disabled?: boolean
    register: UseFormRegister<FieldValues>
}

const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({id, label, disabled, register}) => {
    return (
        <div className="w-full flex flex-row gap-2 items-center justify-center">
            <input
                id={id}
                disabled={disabled}
                type="checkbox"
                {...register(id)}
                placeholder=""
                className="cursor-pointer"
            />
            <label htmlFor={id} className="font-medium cursor-pointer">{label}</label>
        </div>
    )
}

export default CustomCheckBox