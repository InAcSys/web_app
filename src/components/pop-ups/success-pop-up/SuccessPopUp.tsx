import { CircleCheck } from "lucide-react";
import { Button } from "../../buttons/Button";
import { usePopUpContext } from "../../../contexts/PopUpContext";
import "./success-pop-up.css"

interface Props {
  message: string;
}

export const SuccessPopUp = ({ message }: Props) => {

  const {closePopUp} = usePopUpContext()

  const handleClose = () => {
    closePopUp()
    window.location.reload()
  }

  return (
    <div className="success-pop-up-container pop-up-component-container flex-column-center">
      <h2 className="success-pop-up-title">Acción completada exitosamente</h2>
      <CircleCheck className="success-pop-up-icon" />
      <div className="success-pop-up-message">{message}</div>
      <Button label="Entendido" onClick={handleClose} />
    </div>
  );
};
