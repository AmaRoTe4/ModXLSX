import { useEffect, useState } from "react"
import { cartelError } from "../../functions/carteles/swal"
import { parseFile } from "../../functions/csv/uploadCSV"
import { downloadFile } from "../../functions/csv/dowloadCSV"

export default function useXLSX({ restart, useColumns, useSheets, normalize = true }: { useSheets?: string[], useColumns?: string[], restart?: () => void, normalize?: boolean }) {
    const [loading, setLoading] = useState(false)
    const [valores, setValores] = useState<any[]>([])
    const [valoresUpload, setValoresUpload] = useState<any[]>([])
    const [valoresUploadForSheet, setValoresUploadForSheet] = useState<any[]>([])
    const [file, setFile] = useState<File | undefined>(undefined);

    useEffect(() => {
        if (file) handleFileReload()
        else if (restart) restart()
    }, [useColumns, file]) // este es un cambio a tene en cuenta

    const onDownloadFile = async (file?: any[], name: string = "index") => {
        if (loading) return;

        if (!file) file = [{}]

        setLoading(true)
        const res = await downloadFile(file, name, "xlsx")
        setLoading(false)

        if (!res.status) {
            cartelError("ERROR AL CREAR EL ARCHIVO")
            return;
        }

        return res
    }

    const handleFileReload = async () => {
        if (file) {
            setLoading(true);

            try {
                const parsedData = await parseFile(file, useSheets, useColumns, normalize);
                setValores(JSON.parse(JSON.stringify(parsedData)))
                setValoresUpload(parsedData?.valores);
                setValoresUploadForSheet(parsedData?.valores_for_sheet);
                return parsedData;
            } catch (err) {
                cartelError("Hubo un error al procesar el archivo.");
                console.error(err);
                return [];
            } finally {
                setLoading(false);
            }
        } else {
            return [];
        }
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFile(file);
            setLoading(true);

            try {
                const parsedData = await parseFile(file, useSheets, useColumns, normalize);
                setValoresUpload(parsedData?.valores);
                setValoresUploadForSheet(parsedData?.valores_for_sheet);
                return parsedData;
            } catch (err) {
                cartelError("Hubo un error al procesar el archivo.");
                console.error(err);
                return [];
            } finally {
                setLoading(false);
            }
        } else {
            return [];
        }
    };

    const onReset = () => {
        setLoading(false)
        setFile(undefined)
        setValoresUpload([])
    }

    return {
        onReset,
        loading,
        handleFileUpload,
        valoresUpload,
        file,
        onDownloadFile,
        valoresUploadForSheet,
        valores
    }
}