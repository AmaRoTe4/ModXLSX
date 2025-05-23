import { PropsInputText } from "../../../types_use"
import { ChangeEvent } from "react"

export const InputText = ({ key_value, title, error, status_error = false, onChange, value, disabled = false }: PropsInputText) => {
    const localChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        onChange({ key: key_value, value })
    }

    return (
        <span className="flex flex-col justify-start items-center w-full text-black text-xs md:text-base">
            <div className="w-full flex justify-start items-start">
                <label htmlFor={key_value} className="">{title}</label>
            </div>
            <div className="w-full bg-white text-black">
                <input
                    disabled={disabled}
                    onChange={localChange}
                    value={value}
                    type="text"
                    name={key_value}
                    id={key_value}
                    className="w-full text-start px-3 py-2 border border-black"
                />
            </div>
            <div className="w-full">
                {status_error && <p className="w-full text-start text-red-600">{error}</p>}
            </div>
        </span>
    )
}