import { useEffect, useState } from "react"
import useXLSX from "../../hooks/use/useXLSX"
import { Table } from "../Use/Layout/Table"
import useFormXLSX from "../../hooks/useFormXLSX"
import ModalNewColumn from "./ModalNewColumn"

const valores = {
    use: "1",
    no_use: "2",
}

const SelectTypeColumn = ({ valor, onChange }: { valor: string, onChange: (valores: any) => void }) => {
    return (
        <div className="w-full flex justify-between items-center pt-2">
            <select className="w-full px-3 py-2 bg-white bg-opacity-10 text-black text-sm rounded-lg" onChange={(e) => onChange(e.target.value)} value={valor}>
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
        columns,
        dataRender,
        downloadFile,
        file,
        handleFileUpload,
        loading,
        loadingDonwload,
        onChange,
        onDownloadFile,
        setUseColumnView,
        useColumnView,
        use,
        valoresColumn,
        onAddNewColumns,
        onRemoveNewColumns,
        newColumns,
    } = useFormXLSX()

    return (
        <div className="flex flex-col justify-start items-start text-black py-5 mx-auto">

            {useColumnView && <ModalNewColumn
                onAddNewColumns={onAddNewColumns}
                columns={columns}
                newColumns={newColumns}
                onClose={() => setUseColumnView(false)}
                onRemoveNewColumns={onRemoveNewColumns}
            />
            }

            {!use && <div className="max-w-[500px] mx-auto w-full">
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

            {use && <div className="w-full px-5 pt-10 mx-auto">

                <div className="w-full flex justify-between items-start">
                    <div className="w-full max-w-[1000px] me-auto bg-zinc-800 p-5">
                        <div className="flex gap-2 w-full pb-5">
                            {
                                valoresColumn.map((_, i) => {
                                    return (
                                        <SelectTypeColumn
                                            key={i}
                                            valor={valoresColumn[i]}
                                            onChange={onChange({ index: i })}
                                        />
                                    )
                                })
                            }
                        </div>

                        <div className="w-full flex max-h-20 h-20 overflow-y-auto overflow-x-hidden">
                            <Table
                                columns={columns}
                                data={dataRender}
                            />
                        </div>
                    </div>

                    <div className="w-full ps-10 flex justify-end items-end">
                        <div>
                            <button type="button" onClick={() => setUseColumnView(true)} className="w-fit flex justify-center items-center bg-blue-500 border border-white text-white px-3 py-2 rounded">
                                NEW COLUMN
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full flex justify-end items-center px-5 pb-2">
                    <button
                        type="button"
                        onClick={downloadFile}
                        className="min-w-[200px] bg-custom-azul border border-white px-3 py-2 rounded text-white"
                    >
                        {loadingDonwload ? "DESCARGANDO EDITABLE..." : "DESCARGAR EDITABLE"}
                    </button>
                </div>

            </div>}
        </div>
    )
}