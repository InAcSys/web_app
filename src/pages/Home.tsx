import sapiensLogo from "../assets/sapiens-logo.png";
import { Button } from "../components";
import { useAuthContext } from "../contexts/AuthContext";
import "../styles/home.css";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  const {isLogged} = useAuthContext()

  const handleRedirectLogIn = () => {
    if (isLogged()) {
      navigate("/dashboard");
    } else {
      navigate("/log-in");
    }
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
        <Button
          label="Registrar institución"
          onClick={handleRedirectRegistration}
        />
        <Button
          styleVariant="secondary"
          label="Acceder a mi institución"
          onClick={handleRedirectLogIn}
        />
      </div>
    </div>
  );
}
