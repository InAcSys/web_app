import { useEffect } from "react";
import { Button } from "../../components";
import "../../styles/pages/registration.css";
import { NAME_PAGE } from "../../utils/constants";
import { FormRegistration } from "./components/registration/FormRegistration";
import { useRegistrationContext } from "../../contexts/RegistrationContext";

export default function Registration() {
  const { createInstitute } = useRegistrationContext();

  useEffect(() => {
    document.title = `Registro - ${NAME_PAGE}`;
  }, []);

  return (
    <>
      <h1 className="registration-title complete-left">
        Registro de <span>Institución Académica</span>
      </h1>

      <FormRegistration />

      <div className="form-input-section">
        <Button label="Siguiente" onClick={() => createInstitute()} />
      </div>
    </>
  );
}
