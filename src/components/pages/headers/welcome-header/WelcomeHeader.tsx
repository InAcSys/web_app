import { useAuthContext } from "../../../../contexts";
import "./welcome-header.css";

export const WelcomeHeader = () => {
  const { sessionData } = useAuthContext();

  return (
    <div className="welcome-header-container">
      <h1 className="welcome-header-shortname-text complete-left">
        ¡Hola <span>{sessionData?.user.shortname ?? "Desconocid@"}</span>!
      </h1>
      <p className="welcome-header-role-text complete-left">
        Rol: <span>{sessionData?.role.name ?? "Usuari@"}</span>
      </p>
    </div>
  );
};
