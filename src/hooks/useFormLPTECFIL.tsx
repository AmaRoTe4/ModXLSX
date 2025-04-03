import { useEffect, useState } from "react"
import useXLSX from "./use/useXLSX"
import { downloadFile } from "../functions/csv/dowloadCSV"

const base_col = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
]

//const precio_dolar = 1300;

function extraerPrecio(texto: string): number {
    // Eliminar todos los caracteres que no sean números, puntos o comas
    const soloNumerosYSeparadores = texto.replace(/[^\d.,]/g, '');

    if (!soloNumerosYSeparadores) {
        return 0;
    }

    // Manejar formato de números con punto como separador de miles y coma como decimal
    // Ejemplo: 1.000,5 -> 1000.5
    if (soloNumerosYSeparadores.includes('.') && soloNumerosYSeparadores.includes(',')) {
        // Si tiene ambos separadores, asumimos formato 1.000,00
        const sinPuntos = soloNumerosYSeparadores.replace(/\./g, '');
        const conPuntoDecimal = sinPuntos.replace(',', '.');
        return parseFloat(conPuntoDecimal);
    }
    // Si solo tiene comas, las tratamos como separador decimal
    else if (soloNumerosYSeparadores.includes(',')) {
        return parseFloat(soloNumerosYSeparadores.replace(',', '.'));
    }

    // Si solo tiene puntos o ningún separador
    return parseFloat(soloNumerosYSeparadores);
}

export default function useFormLPTECFIL() {
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
            const cinco = n?.[5]?.toString()?.trim()?.toLowerCase()
            const cuatro = n?.[4]?.toString()?.trim()?.toLowerCase()
            const tres = n?.[3]?.toString()?.trim()?.toLowerCase()
            const no_use = cinco.length < 3 && cuatro.length < 3 && tres.length < 3

            return !no_use;
        })

        filter_data_1.map((n, i) => {
            //2 codigo si es mayor 3 de largo
            //3 o 4 precio (sacar el $) (el que sea numero)
            //5 o 6 o 7 nombre (el que sea mas largo)

            const dos = n?.[2]?.toString()?.trim()?.toLowerCase()
            const tres = n?.[3]?.toString()?.trim()?.toLowerCase()
            const cuatro = n?.[4]?.toString()?.trim()?.toLowerCase()
            const cinco = n?.[5]?.toString()?.trim()?.toLowerCase()
            const seis = n?.[6]?.toString()?.trim()?.toLowerCase()
            const siete = n?.[7]?.toString()?.trim()?.toLowerCase()

            const nombre = (!dos.includes("$") && dos.length > 3 && 15 > dos.length) ? dos : ""
            const descripcion = [cinco, seis, siete].reduce((longest, current) =>
                (current?.length || 0) > (longest?.length || 0) ? current : longest, "")
            let use_precio = extraerPrecio(tres)
            let precio = !use_precio || isNaN(use_precio) || use_precio === 0 ? extraerPrecio(cuatro) : use_precio

            const valor = {
                nombre,
                precio,
                descripcion
            }

            if (precio === 0 || nombre.length === 0) return;

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