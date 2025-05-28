import { useNavigate } from "react-router";
import "./sub-option.css"

interface Props {
  label: string;
  path: string
  // permissions: Array<Permission>;
}

export const SubOption = ({ label, path }: Props) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(path);
  };

  return (
    <button className="sub-option-container complete-left" onClick={handleNavigation}>
      {label}
    </button>
  );
};
