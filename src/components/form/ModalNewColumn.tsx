import { useEffect, useState } from "react";
import { NormalModal } from "../NormalModal";
import newUUID from "../../functions/uuid";
import vna from "../../const/vna";

interface props {
    onClose: () => void,
    columns: any[],
    newColumns: { id: string; columns: any[], type: string, condicion: { num: string, valor: string } }[];
    onAddNewColumns: (columns: any) => void;
    onRemoveNewColumns: (id: string) => void;
}

const base_condicion = {
    num: "0",
    valor: "",
}

export default function ModalNewColumn({ onClose, columns, onAddNewColumns, onRemoveNewColumns, newColumns }: props) {
    const [newColumn, setNewColumn] = useState<any[]>([]);
    const [currentValue, setCurrentValue] = useState("");
    const [baseColumn, setBaseColumn] = useState<string>("");
    const [condicion, setCondicion] = useState<any>(base_condicion);
    const [columnsRender, setColumnsRender] = useState<any[]>([]);
    const [type, setType] = useState<string>("1");
    const isJoin = type === "2"
    const length = newColumn.length
    const columnUse = length === 0;
    const operationUse = length === 1;
    const valorUse = length === 2;
    const text_condicion = `SI EL VALOR DE LA COLUMNA ${condicion.num} ES ${condicion.valor}`

    const operationColumn = () => setType("1")
    const joinColumn = () => setType("2")

    useEffect(() => {
        setColumnsRender([...columns, ...newColumns.map((_, i) => `col-${i + 1}`)])
    }, [columns, newColumns])

    const onChangeNumberCondition = (columnIndex: string) => {
        setCondicion({
            ...condicion,
            num: columnIndex,
        });
    };

    const onChangeValorCondition = (valor: string) => {
        setCondicion({
            ...condicion,
            valor,
        });
    };

    const addSignos = (valor: string) => setNewColumn([...newColumn, { id: newUUID(), valor }]);

    const handleAddValue = () => {
        if (currentValue.trim() === "") return;
        setNewColumn([...newColumn, { id: newUUID(), valor: currentValue.trim() }]);
        setCurrentValue("");
    };

    const handleAddDerivedValue = () => {
        if (baseColumn.trim() === "") return;
        const derivedValue = `${baseColumn}`; // Example of a derived value, adjust logic as needed
        setNewColumn([...newColumn, { id: newUUID(), valor: derivedValue }]);
    };

    const handleRemoveValue = (id: string) => {
        setNewColumn(newColumn.filter((col) => col.id !== id));
    };

    const handleAddNewColumns = () => {
        if (newColumn.length === 0) return;
        onAddNewColumns({ id: newUUID(), columns: newColumn, condicion, type });
        setNewColumn([]);
        setCondicion(base_condicion);
    };

    return (
        <NormalModal onClose={onClose}>
            <div className="flex flex-col justify-start items-start">
                <div className="gap-2 w-full flex justify-start items-start pb-5">
                    <button type="button" onClick={joinColumn} className={`w-fit flex border border-white text-white justify-center items-center ${type === "2" ? "bg-blue-500" : "bg-transparent"} px-3 py-2 rounded`}>
                        UNION
                    </button>
                    <button type="button" onClick={operationColumn} className={`w-fit flex border border-white text-white justify-center items-center ${type === "1" ? "bg-blue-500" : "bg-transparent"} px-3 py-2 rounded`}>
                        OPERACION
                    </button>
                </div>
                <div className="border p-4 rounded shadow bg-white min-w-[700px]">

                    {(isJoin || columnUse) && <div className="flex space-x-2 mb-4">
                        <select
                            value={baseColumn}
                            onChange={(e) => setBaseColumn(e.target.value)}
                            className="p-2 border rounded flex-grow"
                        >
                            <option value="">Select a base column</option>
                            {columnsRender.map((col, index) => (
                                <option key={index} value={col}>{col}</option>
                            ))}
                        </select>
                        <button
                            onClick={handleAddDerivedValue}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            SELECCIONAR COLUMAN
                        </button>
                    </div>}

                    {!isJoin && operationUse && <div className="flex space-x-2 mb-4">
                        <button
                            onClick={() => addSignos(vna.valores_new_columns.add)}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            +
                        </button>
                        <button
                            onClick={() => addSignos(vna.valores_new_columns.remove)}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            -
                        </button>
                        <button
                            onClick={() => addSignos(vna.valores_new_columns.por)}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            X
                        </button>
                        <button
                            onClick={() => addSignos(vna.valores_new_columns.divide)}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            DIV
                        </button>
                    </div>}

                    {!isJoin && valorUse && <div className="flex space-x-2 mb-4">
                        <input
                            type="text"
                            value={currentValue}
                            onChange={(e) => setCurrentValue(e.target.value)}
                            placeholder="Enter column value"
                            className="p-2 border rounded flex-grow"
                        />
                        <button
                            onClick={handleAddValue}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Add Value
                        </button>
                    </div>}

                    <div className="w-full flex justify-start items-start">
                        <ul className="space-y-2 mb-4 text-white w-full flex flex-col min-h-[30vh] max-h-[30vh] overflow-y-auto overflow-x-hidden bg-zinc-300">
                            {newColumn.length === 0 && <p className="text-center text-sm text-black pt-5">No hay columnas nuevas</p>}
                            {newColumn.map((col) => (
                                <li key={col.id} className="flex w-full justify-between items-center text-black border border-black px-5 py-2 rounded">
                                    <span className="flex-grow font-medium">{col.valor}</span>
                                    <button
                                        onClick={() => handleRemoveValue(col.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {!isJoin && <div className="flex flex-col justify-start items-start gap-1 pb-5">
                        <label htmlFor="" className="text-xs">(OPCIONAL)</label>
                        <div className="flex w-full justify-between items-end gap-2">
                            <select
                                value={condicion.num}
                                onChange={(e) => onChangeNumberCondition(e.target.value)}
                                className="px-3 py-2 border rounded flex w-full"
                            >
                                <option value="">Select a base column</option>
                                {columnsRender.map((col, index) => {
                                    return (
                                        <option key={index} value={col}>{col}</option>
                                    )
                                })}
                            </select>
                            <input
                                type="text"
                                value={condicion.valor}
                                onChange={(e) => onChangeValorCondition(e.target.value)}
                                placeholder="VALOR"
                                className="px-3 py-2 border rounded flex w-full"
                            />
                        </div>
                    </div>}
                    {!isJoin && condicion.valor !== "" && <div>
                        {text_condicion}
                    </div>}

                    <div className="w-full flex justify-end items-center">
                        <button
                            onClick={handleAddNewColumns}
                            className="bg-green-500 text-white px-4 py-2 rounded mb-4"
                        >
                            AGREGAR NUEVA COLUMNA
                        </button>
                    </div>

                    {newColumns.length > 0 && <div>
                        <h3 className="text-md font-semibold">NUEVAS COLUMNAS</h3>
                        <ul className="space-y-2">
                            {newColumns.map((colGroup) => {
                                const type = colGroup?.type
                                const isJoin = true;

                                return (
                                    <li key={colGroup.id} className="flex items-center gap-2 border border-black px-5 py-2 rounded">
                                        <span className="flex-grow font-medium">
                                            {type}
                                        </span>

                                        {isJoin && <span className="flex-grow font-medium">
                                            {colGroup?.columns.map((c) => c.valor).join(" + ")}
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
                    </div>}
                </div>
            </div>
        </NormalModal>
    );
}