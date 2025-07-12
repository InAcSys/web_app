import "./navbar.css";
import Logo from "../../../assets/logo.png";
import { useNavigate } from "react-router";
import { Option } from "./components/option/Option";
import { Button } from "../../buttons";
import { useAuthContext } from "../../../contexts";

export const NavBar = () => {
  const navigate = useNavigate();
  const { jwt } = useAuthContext();
  const options = new Array<{ name: string; path: string }>(
    { name: "Inicio", path: "/" },
    { name: "Precios", path: "/pricing" },
    { name: "Contáctanos", path: "/contact" }
  );

  const handleHome = () => {
    navigate("/");
  };

  const handleRedirectLogIn = () => {
    if (jwt) {
      navigate("/dashboard");
    } else {
      navigate("/log-in");
    }
  };

  const handleRegistrion = () => {
    navigate("/registration");
  };

  return (
    <header className="nav-bar-component flex-row-between">
      <button
        className="nav-bar-logo-section flex-column-center"
        onClick={handleHome}
      >
        <img src={Logo} alt="Sapiens360 logo" className="nav-bar-logo" />
      </button>
      <div className="nav-bar-actions-section flex-row-center">
        <div className="nav-bar-options-section flex-row-center">
          {options ? (
            options.map((option, index) => (
              <Option
                key={`option-nav-bar-${index}`}
                text={option.name}
                path={option.path}
              />
            ))
          ) : (
            <></>
          )}
        </div>
        <div className="nav-bar-main-actions-section flex-row-center">
          <Button
            styleVariant="secondary"
            label="Iniciar sesión"
            onClick={handleRedirectLogIn}
          />
          <Button label="Registrar mi institución" onClick={handleRegistrion} />
        </div>
      </div>
    </header>
  );
};
