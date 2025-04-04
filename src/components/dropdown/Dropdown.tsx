import Option from "./components/Option";
import "./dropdown.css";
import { ChevronUp, ChevronDown } from "lucide-react";

interface Props {
  optionSelected?: number;
  changeOptionSelected: (option: number) => void;
  options: string[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isDisabled?: boolean;
}

const Dropdown = ({
  optionSelected = 0,
  changeOptionSelected,
  options,
  isOpen,
  setIsOpen,
  isDisabled = false,
}: Props) => {
  const changeOpenOptions = () => {
    if (!isDisabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={`dropdown-component ${isDisabled ? "disabled" : ""}`}>
      <button
        className="dropdown-component-option-selected flex-row-center"
        onClick={changeOpenOptions}
      >
        <span className="dropdown-component-option-selected-text">
          {optionSelected < 0 ? "Select an option" : options[optionSelected]}
        </span>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      <div className={`dropdown-component-options ${isOpen ? "open" : ""}`}>
        {options.length > 0 ? (
          options.map((option, index) => (
            <Option
              key={`dropdown-option-${index}`}
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
  );
};

export default Dropdown;
