import SapiensLogo from "../../../assets/logo.png";
import { Option } from "./components/option/Option";
import "./sidebar-menu.css";
import {
  Home,
  User,
  Settings,
  ChartNoAxesCombined,
  Calendar,
  PiggyBank,
  Users,
  Inbox,
} from "lucide-react";

interface Props {
  logo?: string;
}

export const SidebarMenu = ({ logo = SapiensLogo }: Props) => {
  return (
    <div className="side-bar-menu flex-column-between">
      <div className="side-bar-menu-options-sections flex-column-between">
        <img
          src={logo}
          alt="Institute logo"
          className="side-bar-menu-logo"
          width="60px"
        />
        <div className="side-bar-menu-options">
          <Option icon={Home} />
          <Option icon={User} />
          <Option icon={Settings} />
          <Option icon={ChartNoAxesCombined} />
          <Option icon={Calendar} />
          <Option icon={PiggyBank} />
          <Option icon={Users} />
          <Option icon={Inbox} />
        </div>
      </div>
      <p className="sapiens-side-bar-copy notes-text">
        Sapiens<span>360</span>
      </p>
    </div>
  );
};
