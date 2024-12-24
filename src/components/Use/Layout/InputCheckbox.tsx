import { PropsInputRadio } from "../../../types_use"
import React, { ChangeEvent } from "react"

export const InputCheckbox = ({ key_value, title, onChange, checked }: PropsInputRadio) => {
    const localChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.checked
        onChange({ key: key_value, value })
    }

    return (
        <span className="flex gap-2 justify-start items-center w-full">
            <div className="flex justify-center items-center">
                <input
                    type="checkbox"
                    name={key_value}
                    checked={checked}
                    onChange={localChange}
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