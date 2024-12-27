import { useEffect, useState } from "react"
import useXLSX from "./use/useXLSX"
import vna from "../const/vna"
import { useFormStore } from "../store/form"

const base_col = [
    "CODIGO",
    "DESCRIPCION",
    "UNIDAD",
    "MONEDA",
    "P. LISTA",
    "P. NETO",
    "P. NETO OFERTA",
    "P.V.Público sugerido FINAL"
]

const base_sheet = [
    "LINEA MARINE y Zest",
    "INDUMENTARIA",
    "LENTES DMF",
    "SEÑUELOS",
    "ANZUELOS mustad",
    "CAÑAS",
    "REELS",
    "ACC.PARA PESCA",
    "MULTIF.CABOS, PIOLINES Y TANZAS",
    "ART.PARA CAMPING",
    "TERMOS Y BIDONES",
    "CONSERVADORAS",
    "LINTERNAS",
    "CUCHILLERIA",
    "ACCESORIOS PARA CAZA",
    "CARTUCHOS",
    "ESCOPETAS",
    "FUSILES y PISTOLAS",
    "BALAS",
]

export default function useFormXLSX() {
    const {
        getSheetRespete, getColumns, getData, getDataRender, getLoadingDonwload, getNewColumns, getUse, getUseColumnView, getValoresColumn, setColumns, setData, setDataRender, setLoadingDonwload, setNewColumns, setSheetRespete, setUse, setUseColumnView, setValoresColumn, setDataForSheet, getValoresDonwload, getDataForSheet
    } = useFormStore()
    const {
        file,
        handleFileUpload,
        loading,
        onReset,
        onDownloadFile,
        valoresUpload,
        valoresUploadForSheet
    } = useXLSX(getSheetRespete, getColumns, () => setUse(false))
    const [textNewColumna, setTextNewColumna] = useState("")

    useEffect(() => {
        if (getSheetRespete.length === 0)
            setSheetRespete(base_sheet.map(n => n.trim().toLowerCase()))
        if (getColumns.length === 0)
            setColumns(base_col.map(n => n.trim().toLowerCase()))
    }, [])

    useEffect(() => {
        setValoresColumn(getColumns.map((_, i) => "1"))
    }, [getColumns])

    useEffect(() => {
        if (getData.length > 0 && valoresUpload.length === 0) {
            setUse(true)
            return;
        }

        const valores = [...valoresUpload]
        const use_use = valores.length > 0
        const data_use = use_use ? valores : []
        const data_render_user = data_use.filter((_, i) => i < 20)

        setUse(use_use)
        setDataRender(data_render_user)
        setData(data_use)
        setValoresColumn(getColumns.map((_, i) => "1"))
        setDataForSheet(valoresUploadForSheet)
    }, [valoresUpload, file, getColumns])

    const normalizeData = (data: any[], useFinal: boolean) => {
        const { add, divide, por, remove } = vna.valores_new_columns

        const res = data.map((row, i) => {
            let valores = { ...row }

            const keys = Object.keys(row)

            if (keys.length === 0) return valores

            getNewColumns.map((n, i) => {
                const { columns, condicion, type } = n
                const { num, valor } = condicion

                if (type === "1") {
                    const v = valores?.[num];
                    if (typeof v === "undefined" && valor !== "") return;

                    let valores_mod = Number(Number(valores[columns[0].valor]).toFixed(2));
                    const no_aplica = (valor.toString() !== v?.toString() && valor !== "") || !valores_mod

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
                if (getValoresColumn[index] === "2") delete valores?.[key]
                if (!getColumns.includes(key)) delete valores?.[key]
            })

            return valores
        })

        if (!useFinal) return res;

        return res.map(n => {
            let res: any = {}

            getValoresDonwload.map((m, i) => {
                if (m.type === "2") {
                    const valor = n[m.valor]
                    res[m.name] = !valor ? "0" : valor
                } else {
                    res[m.name] = m.valor
                }
            })

            return res;
        })
    }

    const downloadFile = async (useFinal: boolean = false, useSheet: boolean = false) => {
        if (getLoadingDonwload) return;

        setLoadingDonwload(true)
        await onDownloadFile(normalizeData(getData, useFinal))

        if (useSheet) {
            const keys = Object.keys(getDataForSheet)

            for (let i = 0; i < keys.length; i++) {
                const key = keys[i]
                const sheet = getDataForSheet[key]
                await onDownloadFile(normalizeData(sheet, useFinal), key)
            }
        }
        setLoadingDonwload(false)
    }

    const onChange = ({ index }: { index: number }) => (valor: string) => setValoresColumn(getValoresColumn.map((n, j) => j === index ? valor : n))

    const onAddNewColumns = (newColumn: any[]) => {
        setNewColumns([...getNewColumns, newColumn])
    }

    const onRemoveNewColumns = (id: string) => {
        setNewColumns([...getNewColumns].filter(n => n.id !== id))
    }

    const onResetForm = () => {
        onReset()
        setUseColumnView(false)
        setUse(false)
        setLoadingDonwload(false)
        setColumns([])
        setData([])
        setDataRender([])
        setNewColumns([])
        setValoresColumn([])
    }

    const insertColumn = () => {
        if (textNewColumna.trim() === "") return;
        setColumns([...getColumns, textNewColumna])
        setTextNewColumna("")
    }

    const removeColumn = (valor: string) => {
        setColumns(getColumns.filter((n) => n !== valor))
    }

    return {
        loading,
        handleFileUpload,
        valoresUpload,

        file,
        onDownloadFile,
        downloadFile,
        setUse,
        setUseColumnView,
        getLoadingDonwload,
        getUseColumnView,
        getUse,
        getColumns,
        getData,
        getDataRender,
        getValoresColumn,
        getNewColumns,
        setColumns,
        setData,
        setDataRender,
        onAddNewColumns,
        onRemoveNewColumns,
        setValoresColumn,
        onChange,
        onResetForm,
        insertColumn,
        removeColumn,
        textNewColumna,
        setTextNewColumna
    }
}