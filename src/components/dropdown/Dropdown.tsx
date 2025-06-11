import "./dropdown.css";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Option } from "./components";
import { ErrorNote, Label } from "../generals";
import { useState } from "react";

interface Props {
  label?: string;
  placeholder?: string;
  isMandatory?: boolean;
  optionSelected?: number;
  changeOptionSelected: (option: number) => void;
  options: string[];
  isDisabled?: boolean;
  error?: string;
  errorIsVisible?: boolean;
}

export const Dropdown = ({
  label = "",
  placeholder = "Select an option",
  isMandatory = false,
  optionSelected = 0,
  changeOptionSelected,
  options,
  isDisabled = false,
  error = "",
  errorIsVisible = true,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const changeOpenOptions = () => {
    if (!isDisabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={`dropdown-component ${isDisabled ? "disabled" : ""}`}>
      <Label text={label} isMandatory={isMandatory} />
      <div className="dropdown-section">
        <button
          className="dropdown-component-option-selected flex-row-center"
          onClick={changeOpenOptions}
        >
          <span className="dropdown-component-option-selected-text">
            {optionSelected < 0 ? placeholder : options[optionSelected]}
          </span>
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </button>
        <div className={`dropdown-component-options ${isOpen ? "open" : ""}`}>
          {options.length > 0 ? (
            options.map((option, index) => (
              <Option
                key={`dropdown-option-${index}`}
                closeDropdown={changeOpenOptions}
                position={index}
                changeOption={changeOptionSelected}
                label={option}
                isSelected={optionSelected === index}
              />
            ))
          ) : (
            <span>Sin opciones</span>
          )}
        </div>
      </div>
      {
        errorIsVisible ? <ErrorNote error={error} /> : ""
      }
    </div>
  );
};
