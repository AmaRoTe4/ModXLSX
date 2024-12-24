import { ChangeEvent, useEffect, useRef, useState } from "react";
import useKeyPress from "../useKeyPress";
import { OptionSearchandle } from "../../types_use";
import newUUID from "../../functions/uuid";

interface props {
    options: OptionSearchandle[]
    getSearchTerm: string
    onChange: (value: string) => void;
    selectedValue: string;
    conditionTab?: boolean
    actionTab?: () => void
    setSearchTerm: (curretPage: string) => void
}

export default function useSelectSearchKeyPress({
    options,
    getSearchTerm,
    onChange,
    selectedValue,
    actionTab,
    conditionTab,
    setSearchTerm
}: props) {

    const [isOpen, setIsOpen] = useState(false);
    const [id, setId] = useState(newUUID())
    const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)
    const optionsListRef = useRef<HTMLUListElement>(null);

    const filteredOptions = options.filter(option => {
        return option.label.toLowerCase().includes(getSearchTerm.toLowerCase()) || option.values_search?.some(item => item.toLowerCase().includes(getSearchTerm.toLowerCase()));
    });

    const newSelected = (value: number) => {
        const newValue = filteredOptions[value]?.value
        onChange(newValue)
        setHighlightedIndex(value)
    }

    const handlerTab = (event: KeyboardEvent) => {
        if (!isOpen) return;

        if (actionTab && conditionTab) {
            actionTab()
            setIsOpen(false)
        } else if (selectedValue) {
            setIsOpen(false)
        }
        else if (!selectedValue) {
            event.preventDefault()
            onChange(filteredOptions[0].value)
            setHighlightedIndex(0)
        }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
        if (!isOpen) return;

        const prevIndex = highlightedIndex

        if (event.key === 'ArrowDown') {
            // Navigate down
            event.preventDefault();
            if (prevIndex === null) return newSelected(0)
            const next_value = prevIndex + 1
            return newSelected(next_value === filteredOptions.length ? 0 : next_value)
        } else if (event.key === 'ArrowUp') {
            // Navigate up
            event.preventDefault();
            if (prevIndex === null) return newSelected(0)
            const next_value = prevIndex - 1
            return newSelected(next_value === -1 ? filteredOptions.length - 1 : next_value)
        }
    }

    useKeyPress('Escape', () => {
        setIsOpen(false)
    });
    useKeyPress('Tab', handlerTab);
    useKeyPress('ArrowDown', handleKeyDown);
    useKeyPress('ArrowUp', handleKeyDown);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            //@ts-ignore
            if (event?.target?.className.toString().includes(id)) return;
            setIsOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [])

    useEffect(() => {
        if (filteredOptions.length === 0) {
            setHighlightedIndex(null);
        } else if (highlightedIndex !== null && (highlightedIndex >= filteredOptions.length || highlightedIndex < 0)) {
            setHighlightedIndex(0);
        }
    }, [filteredOptions]);

    useEffect(() => {
        if (highlightedIndex !== null && optionsListRef.current) {
            const list = optionsListRef.current;
            const item = list.children[highlightedIndex] as HTMLElement;
            if (item) {
                item.scrollIntoView({
                    behavior: 'auto',
                    block: 'center'
                });
            }
        }
    }, [highlightedIndex]);

    const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
        newSelected(0)
    }

    const handleSelect = (value: string) => {
        onChange(selectedValue === value ? "0" : value);
        setSearchTerm('');
        setIsOpen(false);
    };

    return {
        setIsOpen,
        isOpen,
        newSelected,
        handlerTab,
        handleKeyDown,
        onSearch,
        handleSelect,
        id,
        optionsListRef,
        filteredOptions
    }
}