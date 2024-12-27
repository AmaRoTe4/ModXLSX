import { NormalModal } from "../NormalModal";
import { useFormStore } from "../../store/form";
import { useEffect, useState } from "react";

interface props {
}

export default function ModalDownload({ }: props) {
    const {
        setModalDonwloadView,
        getValoresDonwload,
        setValoresDonwload,
        getColumns,
        getNewColumns
    } = useFormStore()
    const [columnsUse, setColumnsUse] = useState<string[]>([])

    useEffect(() => {
        setColumnsUse([...getColumns, ...getNewColumns.map((_, i) => `col-${i + 1}`)])
    }, [getColumns, getNewColumns])

    const onChangeType = ({ index }: { index: number }) => {
        setValoresDonwload(getValoresDonwload.map((n, i) => {
            const type = (Number(n.type) > 2 ? 1 : Number(n.type) + 1).toString();
            return i === index ? { ...n, type } : n
        }))
    }

    const onChangeValor = ({ index, valor }: { index: number, valor: string }) => {
        setValoresDonwload(getValoresDonwload.map((n, i) => {
            return i === index ? { ...n, valor } : n
        }))
    }

    return (
        <NormalModal onClose={() => setModalDonwloadView(false)}>
            <div className="flex flex-col justify-start items-start">
                <div className="border p-4 rounded shadow bg-white min-w-[700px]">
                    {
                        getValoresDonwload.map((n, i) => {
                            const type = n.type

                            const onChange = (e: any) => onChangeValor({ index: i, valor: e.target.value })

                            return (
                                <div key={i} className="flex justify-between items-center text-black border border-black px-5 py-2 rounded">
                                    <span className="flex-grow font-medium text-black">{n.name}</span>

                                    {(type === "1" || type === "0") && <input
                                        type="text"
                                        value={n.valor}
                                        onChange={onChange}
                                        placeholder="Enter column value"
                                        className="p-2 border rounded flex-grow"
                                    />}

                                    {type === "2" && <select
                                        value={n.valor}
                                        onChange={onChange}
                                        className="p-2 border rounded flex-grow"
                                    >
                                        <option value="">Select a base column</option>
                                        {columnsUse.map((col, index) => (
                                            <option key={index} value={col}>{col}</option>
                                        ))}
                                    </select>}

                                    <button
                                        type="button"
                                        onClick={() => onChangeType({ index: i })}
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        TYPE
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </NormalModal>
    );
}