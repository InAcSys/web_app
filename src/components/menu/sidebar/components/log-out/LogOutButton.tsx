import { LogOut } from "lucide-react";
import "./log-out-button.css";
import { useAuthContext } from "../../../../../contexts/AuthContext";

export const LogOutButton = () => {
  const { logOut } = useAuthContext();

  return (
    <button className="log-out-button" onClick={logOut}>
      <LogOut className="log-out-icon-button" />
    </button>
  );
};
