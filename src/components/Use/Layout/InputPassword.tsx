
//import SVGEye from "../../../svg/eye"
//import SVGEyeSlash from "../../../svg/eye-slash"
import { PropsInputText } from "../../../types_use"
import { ChangeEvent, useState } from "react"

export const InputPassword = ({ key_value, title, error, status_error = false, onChange, value, disabled = false }: PropsInputText) => {
    const [view, setView] = useState(false)

    const localChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        onChange({ key: key_value, value })
    }

    return (
        <span className="flex flex-col justify-start items-start w-full text-black text-xs md:text-base">
            <div className="w-full flex justify-start items-start">
                <label htmlFor={key_value} className="">{title}</label>
            </div>
            <div className="flex justify-start items-center w-full gap-2">
                <div className="flex">
                    <button type="button" onClick={() => setView(!view)} className="hover:scale-110">
                        {/*{!view ? <SVGEye className="min-h-[25px] min-w-[25px] max-w-[25px] max-h-[25px]" /> : <SVGEyeSlash className="min-h-[25px] min-w-[25px] max-w-[25px] max-h-[25px]" />}*/}
                    </button>
                </div>
                <div className="w-full bg-white text-black">
                    <input
                        disabled={disabled}
                        onChange={localChange}
                        value={value}
                        type={view ? "text" : "password"}
                        name={key_value}
                        id={key_value}
                        className="w-full text-start px-3 py-2 border border-black"
                    />
                </div>
            </div>
            <div className="w-full">
                {status_error && <p className="w-full text-start text-red-600">{error}</p>}
            </div>
        </span>
    )
}