import { useEffect, useState } from "react"
import { cartelError } from "../../functions/carteles/swal"
import { parseFile } from "../../functions/csv/uploadCSV"
import { downloadFile } from "../../functions/csv/dowloadCSV"

export default function useXLSX(useSheets?: string[], useColumns?: string[], restart?: () => void) {
    const [loading, setLoading] = useState(false)
    const [valoresUpload, setValoresUpload] = useState<any[]>([])
    const [valoresUploadForSheet, setValoresUploadForSheet] = useState<any[]>([])
    const [file, setFile] = useState<File | undefined>(undefined);

    useEffect(() => {
        if (file) handleFileReload()
        else if (restart) restart()
    }, [useColumns])

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
                const parsedData = await parseFile(file, useSheets, useColumns);
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
                const parsedData = await parseFile(file, useSheets, useColumns);
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
        valoresUploadForSheet
    }
}