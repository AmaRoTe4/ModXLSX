import { useState, useEffect } from "react";

export function useFetchData<T>({ reload = 1, setReload, errorMessage, fetchApi, setLoadingStore, getLoadingStore, setData }: { fetchApi: () => Promise<T>, setData: (data: T) => void, getLoadingStore: boolean, setLoadingStore: (loading: boolean) => void, errorMessage: string, reload?: number, setReload?: (loading: number) => void }) {
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if ((typeof reload === "number" && reload === 0) || getLoadingStore) return;
                setLoadingStore(true); // Establece el loading en true
                const result: any = await fetchApi();
                if (!result || !result.status) {
                    throw new Error("No se pudo obtener los datos");
                }
                setData(result?.results); // Actualiza el store con los datos
                setLoadingStore(false); // Establece el loading en false
                if (setReload) setReload(0)
            } catch (err) {
                setError(errorMessage);
                setLoadingStore(false);
            }
        };

        fetchData();
    }, [reload]);

    return { error };
}
