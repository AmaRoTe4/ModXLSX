import { useState } from "react"
import { cartelError } from "../../functions/carteles/swal"
import { parseFile } from "../../functions/csv/uploadCSV"
import { downloadFile } from "../../functions/csv/dowloadCSV"

export default function useXLSX() {
    const [loading, setLoading] = useState(false)
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const [valoresUpload, setValoresUpload] = useState<any[]>([])
    const [file, setFile] = useState<File | undefined>(undefined);

    const onDownloadFile = async (file?: any[]) => {
        if (loading) return;

        if (!file) file = [{}]

        setLoading(true)
        const res = await downloadFile(file, "index", "xlsx")
        setLoading(false)

        if (!res.status) {
            cartelError("ERROR AL CREAR EL ARCHIVO")
            return;
        }

        return res
    }

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFile(file);
            setLoading(true);

            try {
                const parsedData = await parseFile(file);
                setValoresUpload(parsedData);
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

    return {
        loading,
        handleFileUpload,
        valoresUpload,
        loadingSubmit,
        file,
        onDownloadFile
    }
}