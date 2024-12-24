import { PropsSelect } from "../../../types_use";
import { ChangeEvent } from "react";

export function Select({ key_value, title, error, status_error = false, onChange, value, disabled = false, options }: PropsSelect) {
    const localChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        onChange({ key: key_value, value });
    };

    return (
        <span className="flex flex-col justify-start items-center w-full text-black text-xs md:text-base">
            <div className="w-full flex justify-start items-start">
                <label htmlFor={key_value?.toString()} className="">{title}</label>
            </div>
            <div className="w-full bg-white text-black">
                <select
                    disabled={disabled}
                    onChange={localChange}
                    value={value}
                    name={key_value?.toString()}
                    id={key_value?.toString()}
                    className="w-full text-start px-3 py-2 border border-black"
                >
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="w-full">
                {status_error && <p className="w-full text-start text-red-600">{error}</p>}
            </div>
        </span>
    );
};
