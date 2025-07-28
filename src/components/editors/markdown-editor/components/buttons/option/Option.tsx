import { LucideIcon } from "lucide-react";
import "./option.css";
import { useState } from "react";

interface Props {
  icon: LucideIcon;
  handleClick: () => void;
}

export const Option = ({ icon: Icon, handleClick }: Props) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClickOption = () => {
    setIsClicked(!isClicked);
    handleClick();
  };

  return (
    <button
      className={`markdown-editor-option-component flex-column-center ${
        isClicked ? "is-clicked" : ""
      }`}
      onClick={handleClickOption}
    >
      <Icon className="markdown-editor-option-icon" />
    </button>
  );
};
