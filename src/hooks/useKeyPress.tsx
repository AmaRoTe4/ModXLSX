import { useEffect } from 'react';

type KeyEventOptions = {
    eventType?: 'keydown' | 'keyup'; // Tipo de evento: keydown o keyup
    target?: HTMLElement | Window;   // Elemento en el que escuchar el evento (por defecto, window)
    ctrl?: boolean;                  // Detectar si Ctrl está presionado
    shift?: boolean;                 // Detectar si Shift está presionado
    alt?: boolean;                   // Detectar si Alt está presionado
    meta?: boolean;                  // Detectar si Meta (tecla de Windows o Command) está presionado
};

const useKeyPress = (
    targetKey: string,
    handler: (event: KeyboardEvent) => void,
    options: KeyEventOptions = {}
) => {
    const {
        eventType = 'keydown',  // Por defecto, 'keydown'
        target = window,        // Por defecto, window
        ctrl = false,           // Por defecto, no requiere Ctrl
        shift = false,          // Por defecto, no requiere Shift
        alt = false,            // Por defecto, no requiere Alt
        meta = false            // Por defecto, no requiere Meta
    } = options;

    const handleKeyPress = (event: KeyboardEvent) => {
        // Verificar que la tecla es la correcta
        if (event.key === targetKey &&
            event.ctrlKey === ctrl &&
            event.shiftKey === shift &&
            event.altKey === alt &&
            event.metaKey === meta) {
            handler(event);
        }
    };

    useEffect(() => {
        // Agregar el event listener
        target.addEventListener(eventType, handleKeyPress as EventListener);

        // Eliminar el event listener en limpieza
        return () => {
            target.removeEventListener(eventType, handleKeyPress as EventListener);
        };
    }, [targetKey, eventType, ctrl, shift, alt, meta, target, handler]); // Incluir dependencias

};

export default useKeyPress;
