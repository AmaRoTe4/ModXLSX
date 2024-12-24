import { useEffect, useState } from "react";
import { NormalModal } from "../NormalModal";
import newUUID from "../../functions/uuid";
import vna from "../../const/vna";

interface props {
    onClose: () => void,
    columns: any[],
    newColumns: { id: string; columns: any[] }[];
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
        onAddNewColumns({ id: newUUID(), columns: newColumn, condicion, type: condicion.valor === "" ? "2" : "1" });
        setNewColumn([]);
        setCondicion(base_condicion);
    };

    return (
        <NormalModal onClose={onClose}>
            <div className="border p-4 rounded shadow">
                {/* Select Base Column for Derived Values */}
                <div className="flex space-x-2 mb-4">
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
                        Add Derived Value
                    </button>
                </div>

                <div className="flex space-x-2 mb-4">
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
                </div>

                {/* Input to Add New Values */}
                <div className="flex space-x-2 mb-4">
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
                </div>

                <div className="flex space-x-2 mb-4">
                    <select
                        value={condicion.num}
                        onChange={(e) => onChangeNumberCondition(e.target.value)}
                        className="p-2 border rounded flex-grow"
                    >
                        <option value="">Select a base column</option>
                        {columnsRender.map((col, index) => {
                            console.log({
                                col
                            })

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
                        className="p-2 border rounded flex-grow"
                    />
                </div>
                <div>
                    {JSON.stringify(condicion)}
                </div>

                {/* Display Current Values */}
                <ul className="space-y-2 mb-4 text-white">
                    {newColumn.map((col) => (
                        <li key={col.id} className="flex items-center space-x-4">
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

                {/* Add New Columns Button */}
                <button
                    onClick={handleAddNewColumns}
                    className="bg-green-500 text-white px-4 py-2 rounded mb-4"
                >
                    Add New Columns
                </button>

                {/* Display Existing New Columns */}
                <h3 className="text-md font-semibold">Existing New Columns</h3>
                <ul className="space-y-2">
                    {newColumns.map((colGroup) => {
                        return (
                            <li key={colGroup.id} className="flex items-center space-x-4">
                                <span className="flex-grow font-medium">
                                    {colGroup?.columns.map((c) => c.valor).join(", ")}
                                </span>
                                <button
                                    onClick={() => onRemoveNewColumns(colGroup.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Remove Group
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </NormalModal>
    );
}