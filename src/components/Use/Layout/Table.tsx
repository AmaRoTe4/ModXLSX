// Componente para la tabla
import React, { useState } from "react";

interface TableProps {
    data: Array<any>;
    columns: Array<string>;
    onClickAll?: (id: any) => void;
    onClickToId?: (id: string) => void;
    BTN?: {
        useBtn?: boolean
        onClickToBtn?: (id: string) => void
        SVGBTN?: JSX.Element
        conditionBtn?: (valores: any) => boolean
    }[]
}

export const Table: React.FC<TableProps> = ({ data, columns, onClickToId, BTN, onClickAll }) => {
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);

    const sortedData = React.useMemo(() => {
        if (!sortConfig) return data;
        const sorted = [...data].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (typeof aValue === "number" && typeof bValue === "number") {
                return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
            }
            if (typeof aValue === "string" && typeof bValue === "string") {
                return sortConfig.direction === "asc"
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }
            return 0;
        });
        return sorted;
    }, [data, sortConfig]);

    const handleSort = (key: string) => {
        setSortConfig((prev) => {
            if (prev && prev.key === key) {
                return {
                    key,
                    direction: prev.direction === "asc" ? "desc" : "asc",
                };
            }
            return { key, direction: "asc" };
        });
    };

    if (sortedData.length === 0) return (
        <div className="overflow-auto w-full flex text-white items-center justify-center">
            <p>
                No hay datos disponibles
            </p>
        </div>
    )

    return (
        <div className="overflow-auto">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                    <tr>
                        {columns.map((col, index) => (
                            <th
                                key={index}
                                className="border border-gray-300 p-2 text-left cursor-pointer hover:bg-gray-300"
                                onClick={() => handleSort(col)}
                            >
                                {col} {sortConfig?.key === col ? (sortConfig.direction === "asc" ? "⬆️" : "⬇️") : ""}
                            </th>
                        ))}
                        {BTN && BTN.filter(n => n?.useBtn).map(n => {
                            return (
                                <th
                                    className="border border-gray-300 p-2 text-left cursor-pointer hover:bg-gray-300"
                                >
                                    Acciones
                                </th>)
                        })}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((row, rowIndex) => {
                        const state = Boolean(row.state)
                        const onClick = () => onClickAll ? onClickAll(row) : onClickToId ? onClickToId(row?.id) : () => ""
                        const useOnClick = onClickToId
                        const bg = row?.bg ?? "bg-white"

                        return (
                            <tr
                                onClick={onClick}
                                key={rowIndex}
                                className={`${state ? "brightness-100" : "brightness-75"} ${useOnClick ? "hover:cursor-pointer hover:brightness-90" : ""} ${bg}`}
                            >
                                {columns.map((col, colIndex) => {
                                    const valor = row?.[col] ?? "0"

                                    return (
                                        <td key={colIndex} className="border border-gray-300 p-2">
                                            {valor}
                                        </td>
                                    )
                                })}
                                {
                                    BTN && BTN.filter(n => n?.useBtn).map(n => {
                                        const onClickToBtn = n?.onClickToBtn
                                        const SVGBTN = n?.SVGBTN
                                        const conditionBtn = n?.conditionBtn
                                        const useBtnInternal = conditionBtn ? conditionBtn(row) : false
                                        const onClickBTN = (e?: any) => {
                                            e.stopPropagation()
                                            if (onClickToBtn) onClickToBtn(row?.id)
                                        }

                                        return (
                                            <td className="border border-gray-300 p-2 w-fit">
                                                {useBtnInternal && <button type="button" onClick={onClickBTN} className="border border-black bg-primary text-black px-3 py-2 rounded w-fit">
                                                    {SVGBTN}
                                                </button>}
                                            </td>)
                                    })
                                }
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
};
