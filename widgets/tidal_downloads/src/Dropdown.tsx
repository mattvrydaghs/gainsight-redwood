import { useState, useEffect } from "react";

export interface DropdownOption {
  label: string;
  value: string | number;
}

export interface DropdownProps {
  label: string;
  options: DropdownOption[];
  value?: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function Dropdown({
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
}: DropdownProps) {
  const [selectedValue, setSelectedValue] = useState<string | number | undefined>(value);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    // Convert back to number if the original options use numbers
    const option = options.find(opt => String(opt.value) === newValue);
    const finalValue = option ? option.value : newValue;
    
    setSelectedValue(finalValue);
    onChange(finalValue);
  };

  return (
    <div className="dropdown-container">
      {label && <label htmlFor="dropdown-select">{label}</label>}
      <select
        id="dropdown-select"
        value={String(selectedValue || "")}
        onChange={handleChange}
        disabled={disabled}
        className="dropdown-select"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={String(option.value)}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
