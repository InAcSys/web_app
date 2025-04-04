import InputView from "./components/input-view/InputView";
import { Label, ErrorNote } from "../generals";
import "./input.css";

interface Props {
  label?: string;
  onChange: (value: string) => void;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  isMandatory?: boolean;
  isSecret?: boolean;
}

const Input = ({
  label = "Label",
  onChange,
  value,
  placeholder = "Placeholder",
  disabled = false,
  error = "",
  isMandatory = false,
  isSecret = false,
}: Props) => {
  return (
    <div className="input-component">
      <Label text={label} isMandatory={isMandatory} />
      <InputView
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        isSecret={isSecret}
        isMandatory={isMandatory}
        hasError={error.length > 0}
      />
      <ErrorNote error={error} />
    </div>
  );
};

export default Input;
