import { Home, Settings, User } from "lucide-react";
import SapiensLogo from "../../../assets/logo.png";
import { useAuthContext } from "../../../contexts/AuthContext";
import { DefaultOption } from "./components/option/DefaultOption";
import { Option } from "./components/option/Option";
import "./sidebar-menu.css";
import { LogOutButton } from "./components/log-out/LogOutButton";

interface Props {
  logo?: string;
}

export const SidebarMenu = ({ logo = SapiensLogo }: Props) => {
  const { permissions } = useAuthContext();

  return (
    <div className="side-bar-menu flex-column-between">
      <div className="side-bar-menu-options-sections flex-column-center">
        <img
          src={logo}
          alt="Institute logo"
          className="side-bar-menu-logo"
          width="60px"
        />
        <div className="side-bar-menu-options flex-column-center">
          <DefaultOption icon={Home} path="/dashboard" />
          <DefaultOption icon={User} path="/profile" />
          <DefaultOption icon={Settings} path="/settings" />
          {Array.isArray(permissions) &&
            permissions.map((category) => (
              <Option key={`main-option-${category.id}`} category={category} />
            ))}
            <LogOutButton />
        </div>
      </div>
      <p className="sapiens-side-bar-copy notes-text">
        Sapiens<span>360</span>
      </p>
    </div>
  );
};
