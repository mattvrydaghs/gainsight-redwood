import { useState, useEffect } from "react";

export interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownProps {
  label: string;
  options: DropdownOption[];
  value?: string;
  onChange: (value: string) => void;
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
  const [selectedValue, setSelectedValue] = useState<string>(value || "");

  useEffect(() => {
    setSelectedValue(value || "");
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
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
