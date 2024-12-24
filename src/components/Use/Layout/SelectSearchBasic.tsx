import { forwardRef, useState } from "react";
import useSelectSearchKeyPress from "../../../hooks/use/useSelectSearchKeyPress";

interface Option {
    label: string;
    value: string;
    values_search?: string[]
    status?: boolean
}

interface SearchableSelectProps {
    options: Option[];
    onChange: (value: string) => void;
    selectedValue: string;
    placeholder?: string;
    useBlockOptions?: boolean;
    searchText?: string
    setSearchText?: React.Dispatch<React.SetStateAction<string>>
}

const SelectSearchBasic = forwardRef<HTMLInputElement, SearchableSelectProps>(
    (
        {
            searchText,
            setSearchText,
            useBlockOptions = false,
            selectedValue,
            options,
            onChange,
            placeholder = "Select an option..."
        },
        ref,
    ) => {
        const [searchTerm, setSearchTerm] = useState('');

        const {
            filteredOptions, id, isOpen, setIsOpen, handleSelect, optionsListRef, onSearch
        } = useSelectSearchKeyPress({
            getSearchTerm: searchText ? searchText : searchTerm,
            onChange,
            options,
            selectedValue,
            setSearchTerm: setSearchText ? setSearchText : setSearchTerm,
        })

        return (
            <div className="relative w-full">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={onSearch}
                    onFocus={() => setIsOpen(true)}
                    placeholder={placeholder}
                    className={`w-full p-2 border border-gray-300 rounded ${id}`}
                />
                {isOpen && (
                    <ul className={`absolute z-10 w-full bg-gray-300 border border-gray-500 rounded mt-1 max-h-60 overflow-y-auto ${id}`} ref={optionsListRef}>
                        {filteredOptions.length > 0 &&
                            (
                                filteredOptions.map((option) => {
                                    const selected = selectedValue === option.value
                                    const status = option?.status === undefined || option?.status

                                    return (
                                        <li
                                            key={option.value}
                                            onClick={() => { status ? handleSelect(option.value) : "" }}
                                            className={`p-2 text-black ${selected ? "hover:brightness-110 bg-yellow-400" : status ? "hover:brightness-50" : useBlockOptions ? "bg-red-500" : ""} ${status ? "cursor-pointer" : ""} ${id}`}
                                        >
                                            {option.label}
                                        </li>
                                    )
                                })
                            )

                        }{filteredOptions.length === 0 && (
                            <li className="p-2 text-gray-500" onClick={() => setIsOpen(false)}>SIN RESULTADOS RELACIONADOS</li>
                        )}
                    </ul>
                )}
            </div>
        );
    });

export default SelectSearchBasic