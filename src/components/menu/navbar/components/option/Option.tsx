import "./option.css";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";

interface Props {
  text: string;
  path: string;
}

export const Option = ({ text, path }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSelected, setIsSelected] = useState(false);

  const handleGo = () => {
    navigate(path);
  };

  useEffect(() => {
    const url = location.pathname;
    setIsSelected(url === path);
  }, [location, path]);

  return (
    <button
      className={`nav-bar-option-component ${isSelected ? "selected" : ""}`}
      onClick={handleGo}
    >
      {text}
    </button>
  );
};
