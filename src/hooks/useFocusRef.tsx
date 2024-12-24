import { useRef } from 'react';

// Hook personalizado para manejar el foco
const useFocusRef = <T extends HTMLElement>() => {
    // Crear referencia para cualquier elemento
    const elementRef = useRef<T>(null);

    // Función para establecer el foco
    const setFocus = () => {
        if (elementRef.current) {
            elementRef.current.focus();
        }
    };

    // Devolver la referencia y la función para enfocar
    return [elementRef, setFocus] as const;
};

export default useFocusRef;
