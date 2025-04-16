import { useState } from "react";
import "./input-view.css";
import { Eye, EyeClosed } from 'lucide-react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled: boolean;
  isMandatory: boolean;
  isSecret: boolean;
  hasError: boolean;
}

export const InputView = ({
  value,
  onChange,
  placeholder,
  disabled,
  isMandatory,
  isSecret,
  hasError
}: Props) => {

  const [isVisible, setIsVisible] = useState(true);

  const changeVisibilityValue = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={`input-view-component ${hasError ? "error" : ""}`}>
      <input
        className={`input-view-component-input ${hasError ? "error" : ""}`}
        type={isVisible ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required={isMandatory}
        aria-required={isMandatory}
      />
      {isSecret && (
        <button
          className={`input-view-component-secret-button flex-column-center ${hasError ? "error" : ""}`}
          onClick={changeVisibilityValue}
          disabled={disabled}
        >
          {isVisible ? <Eye /> : <EyeClosed />}
        </button>
      )}
    </div>
  );
};
