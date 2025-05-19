import "./option.css"
import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
}

export const Option = ({ icon: Icon }: Props) => {
  return (
    <div className="option-side-bar-menu-section flex-column-center">
      <Icon className="option-side-bar-menu-icon" />
    </div>
  );
};
