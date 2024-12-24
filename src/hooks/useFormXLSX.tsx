import { useEffect, useState } from "react"
import useXLSX from "./use/useXLSX"
import vna from "../const/vna"

export default function useFormXLSX() {
    const [useColumnView, setUseColumnView] = useState(false)
    const [use, setUse] = useState(false)
    const [columns, setColumns] = useState<any[]>([])
    const [data, setData] = useState<any[]>([])
    const [dataRender, setDataRender] = useState<any[]>([])
    const [newColumns, setNewColumns] = useState<any[]>([])
    const [valoresColumn, setValoresColumn] = useState<string[]>([])
    const [loadingDonwload, setLoadingDonwload] = useState(false)
    const { file, handleFileUpload, loading, loadingSubmit, onDownloadFile, valoresUpload } = useXLSX()

    useEffect(() => {
        const valores_use = [...valoresUpload]
        const use_use = valores_use.length > 0
        const columns_use = use_use ? Object.keys(valores_use.sort((a, b) => Object.keys(b)?.length - Object.keys(a)?.length)?.[0]) : []
        const data_use = use_use ? valores_use : []
        const data_render_user = data_use.filter((_, i) => i < 20)

        setUse(use_use)
        setDataRender(data_render_user)
        setColumns(columns_use)
        setData(data_use)
        setValoresColumn(columns_use.map((_, i) => "1"))
    }, [valoresUpload, file])

    const normalizeData = (data: any[]) => {
        const { add, divide, por, remove } = vna.valores_new_columns

        return data.map((row, i) => {
            let valores = { ...row }

            const keys = Object.keys(row)

            if (keys.length === 0 || keys.length !== columns.length) return valores

            newColumns.map((n, i) => {
                const { columns, condicion, type } = n
                const { num, valor } = condicion

                if (valor !== "" && type === "1") {
                    const v = valores?.[num];
                    if (typeof v === "undefined") return;

                    let valores_mod = Number(Number(valores[columns[0].valor]).toFixed(2));
                    const no_aplica = valor.toString() !== v?.toString() || !valores_mod


                    if (no_aplica) return valores = { ...valores, [`col-${i + 1}`]: valores_mod };
                    const valor_use = Number(columns[2].valor)
                    const operacion = columns[1].valor

                    if (operacion === add) {
                        valores_mod += valor_use;
                    }
                    if (operacion === por) {
                        valores_mod *= valor_use;
                    }
                    if (operacion === divide) {
                        valores_mod /= valor_use;
                    }
                    if (operacion === remove) {
                        valores_mod -= valor_use;
                    }

                    return valores = { ...valores, [`col-${i + 1}`]: valores_mod };
                }

                if (type === "2") {
                    let valores_mod = columns.reduce((add: any, index: any) => {
                        const use_index = index?.valor
                        const more = valores?.[use_index]

                        return add + " " + more
                    }, "");

                    return valores = { ...valores, [`col-${i + 1}`]: valores_mod };
                }
            })

            keys.forEach((key, index) => {
                if (valoresColumn[index] === "2") {
                    delete valores?.[key]
                }
            })

            return valores
        })
    }

    const downloadFile = async () => {
        if (loadingDonwload) return;

        setLoadingDonwload(true)
        await onDownloadFile(normalizeData(data))
        setLoadingDonwload(false)
    }

    const onChange = ({ index }: { index: number }) => (valor: string) => setValoresColumn(valoresColumn.map((n, j) => j === index ? valor : n))

    const onAddNewColumns = (newColumn: any[]) => {
        setNewColumns([...newColumns, newColumn])
    }

    const onRemoveNewColumns = (id: string) => {
        setNewColumns([...newColumns].filter(n => n.id !== id))
    }

    return {
        loading,
        handleFileUpload,
        valoresUpload,
        loadingSubmit,
        file,
        onDownloadFile,
        loadingDonwload,
        downloadFile,
        useColumnView, setUseColumnView,
        use, setUse,
        columns, setColumns,
        data, setData,
        dataRender, setDataRender,
        onAddNewColumns,
        onRemoveNewColumns,
        valoresColumn,
        setValoresColumn,
        onChange,
        newColumns
    }
}