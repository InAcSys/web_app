import { useLocation, useNavigate } from "react-router";
import "./option.css";
import {
  BrainCircuit,
  CalendarDays,
  ChartLine,
  GraduationCap,
  Inbox,
  LucideIcon,
  PiggyBank,
  User,
  Users,
} from "lucide-react";
import { Category } from "../../../../../models/menu/Menu";
import { useEffect, useState } from "react";
import { SubMenu } from "./components/SubMenu";

interface Props {
  category: Category;
}

const icons = new Map<string, LucideIcon>([
  ["usuarios", Users],
  ["analã­ticas y reportes", ChartLine],
  ["lms", BrainCircuit],
  ["calendario", CalendarDays],
  ["pagos", PiggyBank],
  ["calificaciones", GraduationCap],
  ["mensajerã­a", Inbox],
]);

export const Option = ({ category }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const key = category.name.toLowerCase();
  const Icon = icons.get(key) || User;

  const navigateToPath = () => {
    if (category.permissions && category.permissions.length > 0) {
      navigate(category.path);
    }
  };

  const handleOpen = () => {
    if (category.subCategories && category.subCategories.length > 0) {
      setOpen(!open);
    }
  };

  const handleIsSelected = () => {
    setIsSelected(location.pathname.startsWith(category.path));
  };

  useEffect(() => {
    handleIsSelected();
  }, [location]);

  return (
    <>
      <button
        className={`option-side-bar-menu-section flex-column-center ${
          isSelected ? "selected" : ""
        }`}
        onClick={navigateToPath}
        onMouseDown={handleOpen}
      >
        <Icon className="option-side-bar-menu-icon" />
      </button>
      {open ? (
        <SubMenu
          title={category.name}
          path={category.path}
          categories={category.subCategories}
        />
      ) : (
        <></>
      )}
    </>
  );
};
