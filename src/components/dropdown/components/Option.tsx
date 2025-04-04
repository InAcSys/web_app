import "./option.css";
import { Check } from "lucide-react";

interface Props {
  position: number;
  changeOption: (option: number) => void;
  label?: string;
  isSelected: boolean;
  closeDropdown: () => void;
}

export const Option = ({
  position,
  closeDropdown,
  changeOption,
  label = "Option",
  isSelected,
}: Props) => {
  return (
    <button
      className={`dropdown-option-component flex-row-center ${isSelected ? "selected" : ""}`}
      onClick={() => {
        closeDropdown()
        changeOption(position)
      }}
    >
      <span className="dropdown-option-component-label">{label}</span>
      {isSelected ? <Check /> : ""}
    </button>
  );
};
