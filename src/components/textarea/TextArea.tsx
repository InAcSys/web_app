import { ErrorNote, Label } from "../generals";
import "./textarea.css"

interface Props {
  label?: string;
  onChange: (value: string) => void;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  isMandatory?: boolean;
}

export const TextArea = ({
  label = "Label",
  onChange,
  value,
  placeholder = "Placeholder",
  disabled = false,
  error = "",
  isMandatory = false,
}: Props) => {
  return (
    <div className="text-area-component flex-column-center">
      <Label text={label} isMandatory={isMandatory} />
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="text-area-input"
      />
      <ErrorNote error={error} />
    </div>
  );
};
