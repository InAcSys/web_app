import { useEffect } from "react";
import sapiensLogo from "../assets/sapiens-logo.png";
import { Button } from "../components";
import "../styles/home.css";
import { useNavigate } from "react-router";
import { NAME_PAGE } from "../utils/constants";

export default function Home() {
  const navigate = useNavigate();

  const handleRedirectLogIn = () => {
    navigate("log-in");
  };

  const handleRedirectRegistration = () => {
    navigate("registration");
  };

  return (
    <div className="home-cover-section flex-column-center">
      <div className="home-cover-text-section flex-column-center">
        <img src={sapiensLogo} alt="Sapiens 360 Logo" />
        <p>Simplificando la gestión académica con inteligencia y precisión.</p>
      </div>
      <div className="home-cover-buttons-section flex-row-center">
        <Button label="Registrar institución" onClick={handleRedirectRegistration} />
        <Button type="secondary" label="Acceder a mi institución" onClick={handleRedirectLogIn} />
      </div>
    </div>
  );
}
