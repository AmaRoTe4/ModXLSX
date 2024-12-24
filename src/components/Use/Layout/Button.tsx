import React from "react"
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react"

export const Button = (props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
    const className = "px-3 py-2 border border-black text-black text-xs md:text-base" + " " + props.className

    return (
        <div className="flex w-full ">
            <button {...props} className={className}>
                {props.children}
            </button>
        </div>
    )
}