import { useNavigate } from "react-router";
import "./option.css";
import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  path: string;
}

export const DefaultOption = ({ icon: Icon, path }: Props) => {
  const navigate = useNavigate();

  const navigateToPath = () => {
    navigate(path);
  };

  return (
    <button
      className="option-side-bar-menu-section flex-column-center"
      onClick={navigateToPath}
    >
      <Icon className="option-side-bar-menu-icon" />
    </button>
  );
};
