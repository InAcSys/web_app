import { CircleX } from "lucide-react";
import { Button } from "../../buttons/Button";
import { usePopUpContext } from "../../../contexts/PopUpContext";

interface Props {
  message: string;
}

export const FailedPopUp = ({ message }: Props) => {
  const { closePopUp } = usePopUpContext();

  return (
    <div className="failed-pop-up-container pop-up-component-container">
      <h3 className="failed-pop-up-title">Error en la operación</h3>
      <CircleX className="failed-pop-up-icon" />
      <p className="failed-pop-up-message">{message}</p>
      <Button label="Entendido" onClick={closePopUp} />
    </div>
  );
};
