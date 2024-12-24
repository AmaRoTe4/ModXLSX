import { useEffect } from "react";

export const useTab = (refStart: React.MutableRefObject<null>, textRetorno: string, action: string = "Tab") => {
    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    const restarFocus = () => {
        if (refStart.current) {
            //@ts-ignore
            refStart?.current?.focus();
        }
    }

    const handleKeyUp = (e: any) => {
        if (refStart.current && e.key === action && e.target.innerHTML && e.target.innerHTML === textRetorno) {
            restarFocus();
        }
    };
}