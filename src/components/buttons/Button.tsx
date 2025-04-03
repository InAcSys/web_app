import './button.css';

interface Props {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "primary" | "secondary";
}

const Button = ({ label = "Button", onClick = () => console.log("Click :D"), disabled = false, type = "primary" }: Props) => {

  const buttonOnClick = () => {
    !disabled && onClick()
  }

  return (
    <button className={`button-component ${type}`} onClick={buttonOnClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;