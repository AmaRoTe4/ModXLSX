import useFormHilados from "../../hooks/useFormHilados"

export const NormalizeHilados = () => {
    const {
        file,
        handleFileUpload,
        loading,
        valores,
        getUse,
        getData,
        dowloadInfo,
        loadingDowload
    } = useFormHilados()

    return (
        <div className="flex flex-col justify-start items-start text-black p-5 w-full">

            {!getUse && <div className="flex flex-col w-full">
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

                {getData.length}
                <div className="w-full flex justify-end items-start gap-2">
                    <button
                        type="button"
                        onClick={dowloadInfo}
                        className="min-w-[200px] bg-green-500 border border-white px-3 py-2 rounded text-white"
                    >
                        {loadingDowload ? "DESCARGANDO..." : "DESCARGAR FINAL"}
                    </button>
                </div>

            </div>}
        </div>
    )
}