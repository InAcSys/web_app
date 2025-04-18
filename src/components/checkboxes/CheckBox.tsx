import "./check-box.css";
import { Label } from "../generals";
import { Check } from "./components";

interface Props {
  label?: string;
  isMandatory?: boolean;
  isChecked: boolean;
  changeChecked: (check: boolean) => void;
  canCrossedOut?: boolean;
}

export const CheckBox = ({
  label = "Check box",
  isMandatory = false,
  isChecked,
  changeChecked,
  canCrossedOut = false,
}: Props) => {
  return (
    <div className="check-box-component flex-row-center">
      <Check isChecked={isChecked} changeChecked={changeChecked} />
      <Label
        text={label}
        isMandatory={isMandatory}
        canCrossedOut={canCrossedOut}
        isCrossedOut={isChecked}
      />
    </div>
  );
};
