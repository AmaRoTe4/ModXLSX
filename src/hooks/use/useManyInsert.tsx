import { useState } from "react"
import { cartelError, cartelSuccess } from "../../functions/carteles/swal"
import { downloadFile } from "../../functions/csv/dowloadCSV"
import { parseFile } from "../../functions/csv/uploadCSV"

interface props {
    reloadAction: () => void
    mensajeSuccessfulSubmit: string
    mensajeErrorSubmit: string
    filename: string
    valores_download_white: any
    valores_download: any
    createManyApi: (body: any[]) => Promise<any>
    onClose?: () => void
}

export default function useManyInsert({
    reloadAction,
    mensajeErrorSubmit,
    mensajeSuccessfulSubmit,
    valores_download,
    valores_download_white,
    createManyApi,
    onClose,
    filename
}: props) {
    const [loading, setLoading] = useState(false)
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const [valoresUpload, setValoresUpload] = useState<any[]>([])
    const [file, setFile] = useState<File | undefined>(undefined);

    const onDownloadFile = async () => {
        if (loading) return;

        setLoading(true)
        const res = await downloadFile(valores_download, filename, "xlsx")
        setLoading(false)

        if (!res.status) {
            cartelError("ERROR AL CREAR EL ARCHIVO")
            return;
        }

        return res
    }

    const onDownloadFileWhite = async () => {
        if (loading) return;

        setLoading(true)
        const res = await downloadFile(valores_download_white, filename, "xlsx")
        setLoading(false)

        if (!res.status) {
            cartelError("ERROR AL CREAR EL ARCHIVO")
            return;
        }

        return res
    }

    // Función asíncrona para manejar la subida del archivo y devolver el array de objetos
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Tomar el primer archivo (File)
        if (file) {
            setFile(file);
            setLoading(true); // Mostrar indicador de carga

            try {
                const parsedData = await parseFile(file); // Parsear el File usando PapaParse
                setValoresUpload(parsedData); // Guardar los datos en el estado
                return parsedData; // Devolver el array de objetos
            } catch (err) {
                cartelError("Hubo un error al procesar el archivo."); // Manejar el error
                console.error(err);
                return []; // Devolver un array vacío en caso de error
            } finally {
                setLoading(false); // Ocultar el indicador de carga
            }
        } else {
            return []; // Si no se seleccionó archivo, devolver un array vacío
        }
    };

    const onSubmit = async () => {
        if (loadingSubmit || valoresUpload.length === 0) return cartelError("TIENE QUE SUBIR EL ARCHIVO DESCARGADO CON LA INFORMACIÓN REQUERIDA...");

        setLoadingSubmit(true)
        const res = await createManyApi(valoresUpload)
        setLoadingSubmit(false)

        if (!res.status) {
            cartelError(mensajeErrorSubmit)
            return;
        }

        setFile(undefined)
        setValoresUpload([])
        cartelSuccess(mensajeSuccessfulSubmit);
        reloadAction()
        if (onClose) onClose()
        return res
    }

    return {
        onSubmit,
        onDownloadFile,
        loading,
        handleFileUpload,
        valoresUpload,
        loadingSubmit,
        file,
        onDownloadFileWhite
    }
}