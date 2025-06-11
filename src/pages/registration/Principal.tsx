import { Button } from "../../components";
import { useRegistrationContext } from "../../contexts/RegistrationContext";
import { PrincipalRegistration } from "./components/registration/PrincipalRegistration";

export default function Principal() {

  const {registerPrincial} = useRegistrationContext()

  return (
    <>
      <h1 className="complete-left">
        Registro de <span>Autoridad Institucional</span>
      </h1>
      <PrincipalRegistration />
      <div className="form-input-section">
        <Button label="Siguiente" onClick={registerPrincial} />
      </div>
    </>
  );
}
