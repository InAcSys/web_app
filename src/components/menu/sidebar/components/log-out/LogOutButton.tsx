import { LogOut } from "lucide-react";
import "./log-out-button.css";
import { useAuthContext } from "../../../../../contexts/AuthContext";

export const LogOutButton = () => {
  const { logOut } = useAuthContext();

  const handleLogOut = () => {
    logOut();
    window.location.reload();
  };

  return (
    <button className="log-out-button" onClick={handleLogOut}>
      <LogOut className="log-out-icon-button" />
    </button>
  );
};
