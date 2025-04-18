import "../../styles/pages/registration/terms-and-conditions.css";
import { useEffect, useState } from "react";
import FormLayout from "../../layouts/FormLayout";
import { Button, CheckBox } from "../../components";
import { useNavigate } from "react-router";
import { NAME_PAGE } from "../../utils/constants";

export default function TermsAndConditions() {
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);

  const handleNextStep = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    document.title = `Legal - ${NAME_PAGE}`;
  }, []);

  return (
    <FormLayout>
      <div className="terms-and-conditions-section">
        <h1 className="complete-left">
          Términos y Condiciones de Uso de <span>Sapiens360</span>
        </h1>
        <CheckBox
          label="He leído y acepto los Términos y Condiciones y la Política de Privacidad."
          isMandatory
          isChecked={isChecked}
          changeChecked={setIsChecked}
        />
        <Button
          label="Siguiente"
          disabled={!isChecked}
          onClick={handleNextStep}
        />
      </div>
    </FormLayout>
  );
}
