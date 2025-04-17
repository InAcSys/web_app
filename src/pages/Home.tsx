import sapiensLogo from "../assets/sapiens-logo.png";
import { Button } from "../components";
import "../styles/home.css";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();

  const handleRedirectLogIn = () => {
    navigate("log-in");
  };

  return (
    <div className="home-cover-section flex-column-center">
      <div className="home-cover-text-section flex-column-center">
        <img src={sapiensLogo} alt="Sapiens 360 Logo" />
        <p>Simplificando la gestión académica con inteligencia y precisión.</p>
      </div>
      <div className="home-cover-buttons-section flex-row-center">
        <Button label="Registrar institución" onClick={handleRedirectLogIn} />
        <Button type="secondary" label="Acceder a mi institución" />
      </div>
    </div>
  );
}
