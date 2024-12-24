import { PropsInputRadio } from "../../../types_use"
import React from "react"

export const InputRadio = ({ name, key_value, title, onChange, checked }: PropsInputRadio) => {
    return (
        <span className="flex gap-2 justify-start items-center w-full">
            <div className="flex justify-center items-center">
                <input
                    type="radio"
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    id={key_value}
                    className="text-start px-3 py-2 border border-black"
                />
            </div>
            <div className="w-full flex justify-start items-start">
                <label htmlFor={key_value}>{title}</label>
            </div>
        </span>
    )
}