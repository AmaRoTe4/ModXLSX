import { useState, useEffect, ChangeEvent } from 'react';
import Fuse from 'fuse.js';
//@ts-ignore
import { useDebounce } from 'use-debounce';

type SearchableItem = {
    [key: string]: any; // Ajusta según el tipo de objeto
};

type UseSearchProps<T> = {
    items: T[];
    searchKeys: (keyof T)[];
    debounceDelay?: number;
    max?: number;
};

const useSearchDebounce = <T extends SearchableItem>({
    items,
    searchKeys,
    debounceDelay = 500,
    max = 100
}: UseSearchProps<T>) => {
    const [searchText, setSearchText] = useState<string>("");
    const [searchDebounce] = useDebounce(searchText, debounceDelay);
    const [filteredItems, setFilteredItems] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false); // Estado para la carga

    useEffect(() => {
        if (searchText.trim().length === 0) {
            setFilteredItems([...items]);
            setIsLoading(false); // Finaliza la carga
            return;
        }

        const fuse = new Fuse(items, {
            keys: searchKeys as string[], // `keys` espera un array de strings
            threshold: 0.4,
        });

        const results = fuse.search(searchDebounce).map((result) => result.item);
        setFilteredItems(results);
        setIsLoading(false); // Finaliza la carga después de filtrar
    }, [searchDebounce, items]);

    const onChangeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
        if (typeof e.target.value === 'string') {
            setIsLoading(true); // Inicia la carga cuando el filtro comienza
            setSearchText(e.target.value)
        };
    };

    return {
        searchText,
        onChangeSearchText,
        filteredItems: filteredItems.slice(0, max),
        isLoading, // Retorna el estado de carga
        setSearchText
    };
};

export default useSearchDebounce;
