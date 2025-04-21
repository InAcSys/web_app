import "./button.css";

interface Props {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  styleVariant?: "primary" | "secondary" | "action";
  type?: "button" | "submit";
}

export const Button = ({
  label = "Button",
  onClick = () => console.log("Click :D"),
  disabled = false,
  styleVariant = "primary",
  type = "button",
}: Props) => {
  const buttonOnClick = () => {
    !disabled && onClick();
  };

  return (
    <button
      className={`button-component ${styleVariant}`}
      onClick={buttonOnClick}
      disabled={disabled}
      type={type}
    >
      {label}
    </button>
  );
};
