import "./input.css";
import { InputView } from "./components";
import { Label, ErrorNote } from "../generals";

interface Props {
  label?: string;
  onChange: (value: string) => void;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  isMandatory?: boolean;
  isSecret?: boolean;
  register?: any
}

export const Input = ({
  label = "Label",
  onChange,
  value,
  placeholder = "Placeholder",
  disabled = false,
  error = "",
  isMandatory = false,
  isSecret = false,
  register
}: Props) => {
  return (
    <div className="input-component flex-column-center">
      <Label text={label} isMandatory={isMandatory} />
      <InputView
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        isSecret={isSecret}
        isMandatory={isMandatory}
        hasError={error.length > 0}
        register={register}
      />
      <ErrorNote error={error} />
    </div>
  );
};
