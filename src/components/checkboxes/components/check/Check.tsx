import { CheckIcon } from "lucide-react";
import "./check.css";

interface Props {
  isChecked: boolean;
  changeChecked: (checked: boolean) => void;
}

export const Check = ({ isChecked, changeChecked }: Props) => {
  return (
    <button
      className={`check-component flex-column-center ${
        isChecked ? "checked" : ""
      }`}
      onClick={() => changeChecked(!isChecked)}
    >
      {isChecked ? <CheckIcon /> : ""}
    </button>
  );
};
