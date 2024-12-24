interface props {
    className: string
}

export const SVGArrowUp = ({ className }: props) => {
    return (
        <svg className={`flex-shrink-0 w-5 h-5 transition duration-75 text-gray-400 group-hover: ${className}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" /></svg>
    )
}