import "./option.css";
import { Check } from "lucide-react";

interface Props {
  position: number;
  changeOption: (option: number) => void;
  label?: string;
  isSelected: boolean;
}

const Option = ({
  position,
  changeOption,
  label = "Option",
  isSelected,
}: Props) => {
  return (
    <button
      className={`dropdown-option-component ${isSelected ? "selected" : ""}`}
      onClick={() => {
        changeOption(position)
        console.log(position)
      }}
    >
      <span className="dropdown-option-component-label">{label}</span>
      {isSelected ? <Check /> : ""}
    </button>
  );
};

export default Option;
