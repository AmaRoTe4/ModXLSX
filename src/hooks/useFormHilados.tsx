import { useEffect, useState } from "react"
import useXLSX from "./use/useXLSX"
import { downloadFile } from "../functions/csv/dowloadCSV"

const base_col = [
    "1",
    "2",
    "3",
    "4",
]

const precio_dolar = 1300;

function extraerPrecio(texto: string): number {
    // Buscar patrones de precio en el texto
    const patronPrecio = /\$\s*([0-9.,]+)|\b([0-9.,]+)\s*\$/;
    const match = texto.match(patronPrecio);

    if (match) {
        // Limpiar el valor encontrado (mantener puntos como decimales y reemplazar coma por punto)
        const precioTexto = (match[1] || match[2]).replace(",", ".");
        return parseFloat(precioTexto);
    }

    // Si no se encuentra un patrón de precio, intentar extraer cualquier número
    const patronNumerico = /\b([0-9.,]+)\b/;
    const matchNumerico = texto.match(patronNumerico);

    if (matchNumerico) {
        const precioTexto = matchNumerico[1].replace(",", ".");
        return parseFloat(precioTexto);
    }

    return 0; // Valor por defecto si no se encuentra ningún precio
}

export default function useFormHilados() {
    const {
        file,
        handleFileUpload,
        loading,
        onReset,
        onDownloadFile,
        valores
    } = useXLSX({
        useColumns: base_col,
        normalize: false,
        //useSheets: ["tabula-Hilados"]
    })
    const [getUse, setUse] = useState(false)
    const [getData, setData] = useState<any[]>([])
    const [loadingDowload, setLoadingDowload] = useState<boolean>(false)

    useEffect(() => {
        if (valores?.length > 0) {
            setUse(true)
        } else if (!valores || valores?.length === 0) {
            setUse(false)
        }

        const aux = normalizeInfo(valores);
        setData(aux)
    }, [valores])

    const normalizeInfo = (data: any[]) => {
        let data_use: any[] = []

        const filter_data_1 = data.filter(n => {
            //{
            //    1: 'TORNILLOS DRY ROSCA MET.  8 X 2 1/2" (0811864',
            //    2: 'LA CAJA',
            //    3: '0.000 CAJAS X 200',
            //    4: ''
            //}

            const uno = n?.['1']?.toString()?.trim()?.toLowerCase()
            const tres = n?.['3']?.toString()?.trim()?.toLowerCase()

            const condicion1 = uno === "nombre";
            const condicion2 = tres.length === 0;
            const condicion3 = (tres.match(/\//g) || []).length > 2 || (tres.match(/-/g) || []).length > 2;

            if (condicion1) return false;
            if (condicion2) return false;
            if (condicion3) return false;

            return true;
        })

        filter_data_1.map((n, i) => {
            const uno = n?.['1']?.toString()?.trim()?.toLowerCase()
            const tres = n?.['3']?.toString()?.trim()?.toLowerCase()
            const cuatro = n?.['4']?.toString()?.trim()?.toLowerCase()

            const nombre = uno
            const dolares = tres?.includes("u$s")
            let use_precio = extraerPrecio(tres)
            let precio = !use_precio || isNaN(use_precio) || use_precio === 0 ? extraerPrecio(cuatro) : use_precio

            const valor = {
                nombre,
                precio,
                dolares,
                precio_final: dolares ? precio * precio_dolar : precio
            }

            if (precio === 0) return;

            data_use.push(valor)
        })

        return data_use
    }

    const dowloadInfo = async () => {
        if (getData.length === 0) return alert("NO TIENE INFO");

        setLoadingDowload(true)
        await downloadFile(getData, "info", "xlsx")
        setLoadingDowload(false)
    }

    return {
        loading,
        handleFileUpload,
        onReset,
        valores,
        file,
        onDownloadFile,
        getUse,
        getData,
        dowloadInfo,
        loadingDowload
    }
}