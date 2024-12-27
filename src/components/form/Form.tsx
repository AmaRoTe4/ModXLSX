import { Table } from "../Use/Layout/Table"
import useFormXLSX from "../../hooks/useFormXLSX"
import ModalNewColumn from "./ModalNewColumn"
import ModalDownload from "./ModalDownload"
import { useFormStore } from "../../store/form"

const valores = {
    use: "1",
    no_use: "2",
}

const SelectTypeColumn = ({ valor, onChange }: { valor: string, onChange: (valores: any) => void }) => {
    return (
        <div className="w-full flex justify-between items-center">
            <select className="w-full px-3 py-2 bg-white text-black text-sm rounded-lg" onChange={(e) => onChange(e.target.value)} value={valor}>
                {
                    Object.keys(valores).map((n, i) => {
                        const valor = Object.values(valores)[i]
                        return <option key={i} value={valor}>{n}</option>
                    })
                }
            </select>
        </div>
    )
}

export const FormUseXLSX = () => {
    const {
        getColumns,
        getDataRender,
        getData,
        getLoadingDonwload,
        getUseColumnView,
        getUse,
        getValoresColumn,
        getNewColumns,
        downloadFile,
        file,
        handleFileUpload,
        loading,
        onChange,
        onDownloadFile,
        setUseColumnView,
        onAddNewColumns,
        onRemoveNewColumns,
        onResetForm,
        insertColumn,
        removeColumn,
        textNewColumna,
        setTextNewColumna,
    } = useFormXLSX()
    const { getModalDonwloadView, setModalDonwloadView } = useFormStore()

    return (
        <div className="flex flex-col justify-start items-start text-black p-5 w-full">

            {getModalDonwloadView && <ModalDownload />}

            {getUseColumnView && <ModalNewColumn
                onAddNewColumns={onAddNewColumns}
                columns={getColumns}
                newColumns={getNewColumns}
                onClose={() => setUseColumnView(false)}
                onRemoveNewColumns={onRemoveNewColumns}
            />
            }

            {!getUse && <div className="flex flex-col w-full">
                <div className="w-full flex justify-end items-center px-5 pb-2">
                    <button
                        type="button"
                        onClick={() => onDownloadFile([{}])}
                        className="min-w-[200px] bg-custom-azul border border-white px-3 py-2 rounded text-white"
                    >
                        {loading ? "DESCARGANDO EDITABLE..." : "DESCARGAR EDITABLE"}
                    </button>
                </div>

                <div className="w-full flex justify-end items-center px-5 pt-10">
                    <div className="flex flex-col items-center justify-center w-full h-64 bg-zinc-600 p-6 rounded shadow-lg">
                        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-white-400 hover:bg-white hover:bg-opacity-20 transition-all rounded-lg cursor-pointer">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <p className="mb-2 text-sm text-white">
                                    <span className="font-semibold">Click para subir un archivo</span>
                                </p>
                                <p className="text-xs text-white">CSV</p>
                            </div>
                            <input
                                type="file"
                                accept=".csv,.xlsx"
                                onChange={handleFileUpload}
                                disabled={loading}
                                className="hidden"
                            />
                        </label>

                        {file && (
                            <div className="mt-4 p-2 bg-white bg-opacity-10 text-white text-sm rounded-lg">
                                <p className="truncate">Archivo seleccionado: {file.name}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>}

            {getUse && <div className="w-full flex flex-col min-h-[95vh] justify-between items-start">

                <div className="w-full flex justify-between items-start gap-10">
                    <div className="w-full max-w-[1000px] bg-zinc-800 p-5">
                        <div className="flex gap-2 w-full pb-5 text-white">
                            {
                                getValoresColumn.map((_, i) => {
                                    return (
                                        <SelectTypeColumn
                                            key={i}
                                            valor={getValoresColumn[i]}
                                            onChange={onChange({ index: i })}
                                        />
                                    )
                                })
                            }
                        </div>

                        <div className="w-full flex max-h-[50vh] h-[50vh] overflow-y-auto overflow-x-hidden">
                            <Table
                                columns={getColumns}
                                data={getDataRender}
                            />
                        </div>
                    </div>

                    <div className="w-full flex flex-col justify-start items-start gap-2">
                        <div className="w-full flex justify-between items-end gap-2">
                            <div className="flex text-white">
                                TOTAL DE TODOS LOS REGISTROS TOMADOS: {getData?.length}
                            </div>
                            <div className="flex gap-2">
                                <div className="flex justify-end items-end">
                                    <button type="button" onClick={() => setUseColumnView(true)} className="w-fit flex justify-center items-center bg-blue-500 border border-white text-white px-3 py-2 rounded text-nowrap">
                                        NEW COLUMN
                                    </button>
                                </div>
                                <div className="flex justify-end items-end">
                                    <button type="button" onClick={onResetForm} className="w-fit flex justify-center items-center bg-red-500 border border-white text-white px-3 py-2 rounded text-nowrap">
                                        REINICIAR
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex bg-white p-5">
                            <div className="w-full">
                                <h3 className="text-md font-semibold">COLUMNAS</h3>

                                <form className="flex justify-start items-center gap-2 py-2" onSubmit={(e) => { e.preventDefault(); insertColumn() }}>
                                    <input
                                        value={textNewColumna}
                                        onChange={(e) => setTextNewColumna(e.target.value)}
                                        type="text"
                                        name="valores"
                                        id="valores"
                                        placeholder="Nombre de la columna"
                                        className="py-2 px-3 border border-black rounded"
                                    />
                                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                                        AGREGAR COLUMNA
                                    </button>
                                </form>

                                <ul className="space-y-2 max-h-[25vh] min-h-[25vh] overflow-y-scroll overflow-x-hidden pb-10">
                                    {getColumns.length > 0 && getColumns.map((n, i) => {
                                        return (
                                            <li key={i} className="flex items-center gap-2 border border-black px-5 py-2 rounded">
                                                <span className="flex-grow font-medium">
                                                    {n}
                                                </span>
                                                <button
                                                    onClick={() => removeColumn(n)}
                                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                                >
                                                    Remove
                                                </button>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                        {getNewColumns.length > 0 && <div className="w-full flex bg-white p-5">
                            <div className="w-full">
                                <h3 className="text-md font-semibold">NUEVAS COLUMNAS</h3>
                                <ul className="space-y-2 max-h-[25vh] min-h-[25vh] overflow-y-scroll overflow-x-hidden pb-10">
                                    {getNewColumns.map((colGroup) => {
                                        const type = colGroup?.type
                                        const isJoin = type === "1"

                                        return (
                                            <li key={colGroup.id} className="flex items-center gap-2 border border-black px-5 py-2 rounded">
                                                <span className="flex-grow font-medium">
                                                    {type}
                                                </span>

                                                {isJoin && <span className="flex-grow font-medium">
                                                    {colGroup?.columns.map((c: any) => c.valor).join(" + ")}
                                                </span>}
                                                <button
                                                    onClick={() => onRemoveNewColumns(colGroup.id)}
                                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                                >
                                                    Remove
                                                </button>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>}
                    </div>
                </div>

                <div className="w-full flex justify-end items-start gap-2">
                    <button
                        type="button"
                        onClick={() => setModalDonwloadView(true)}
                        className="bg-blue-500 border border-white px-3 py-2 rounded text-white"
                    >
                        EDITAR FINAL
                    </button>
                    <button
                        type="button"
                        onClick={() => downloadFile(true, true)}
                        className="min-w-[200px] bg-green-500 border border-white px-3 py-2 rounded text-white"
                    >
                        {getLoadingDonwload ? "DESCARGANDO EDITABLE..." : "DESCARGAR EDITABLE FINAL"}
                    </button>
                    <button
                        type="button"
                        onClick={() => downloadFile(false)}
                        className="min-w-[200px] bg-green-500 border border-white px-3 py-2 rounded text-white"
                    >
                        {getLoadingDonwload ? "DESCARGANDO EDITABLE..." : "DESCARGAR EDITABLE"}
                    </button>
                </div>

            </div>}
        </div>
    )
}