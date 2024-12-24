import React, { useState, useRef, useEffect } from "react";

type Option = {
  id: string;
  label: string;
  checked: boolean;
};

interface CheckboxSelectProps {
  options: Option[];
  onChange: (updatedOptions: Option[]) => void;
  placeholder?: string;
}

const CheckboxSelect: React.FC<CheckboxSelectProps> = ({ options, onChange, placeholder = "Select options..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (id: string) => {
    const updatedOptions = options.map((option) =>
      option.id === id ? { ...option, checked: !option.checked } : option
    );
    onChange(updatedOptions);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded text-black"
      />
      {isOpen && (
        <ul className="absolute z-10 w-full bg-white border border-gray-500 rounded mt-1 max-h-60 overflow-y-auto shadow-lg">
          {filteredOptions.map((option) => (
            <li
              key={option.id}
              className="flex items-center p-2 hover:bg-gray-200 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={option.checked}
                onChange={() => toggleOption(option.id)}
                className="mr-2"
              />
              <span>{option.label}</span>
            </li>
          ))}
          {filteredOptions.length === 0 && (
            <li className="p-2 text-gray-500">No matching options found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default CheckboxSelect;
