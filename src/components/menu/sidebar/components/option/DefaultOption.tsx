import { useLocation, useNavigate } from "react-router";
import "./option.css";
import { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  icon: LucideIcon;
  path: string;
}

export const DefaultOption = ({ icon: Icon, path }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSelected, setIsSelected] = useState(false);

  const handleIsSelected = () => {
    setIsSelected(location.pathname.startsWith(path));
  };

  useEffect(() => {
    handleIsSelected();
  }, [location]);

  const navigateToPath = () => {
    navigate(path);
  };

  return (
    <button
      className={`option-side-bar-menu-section flex-column-center ${
        isSelected ? "selected" : ""
      }`}
      onClick={navigateToPath}
    >
      <Icon className="option-side-bar-menu-icon" />
    </button>
  );
};
