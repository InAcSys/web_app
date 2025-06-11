import axios from "axios";
import { Button } from "../../../buttons/Button";
import { CloseButton } from "../../components/close-button/CloseButton";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { usePopUpContext } from "../../../../contexts/PopUpContext";
import { SuccessPopUp } from "../../success-pop-up/SuccessPopUp";
import "./delete-user-pop-up.css";
import { FailedPopUp } from "../../failed-pop-up/FailedPopUp";

interface Props {
  userId: string;
}

export const DeleteUserPopUp = ({ userId }: Props) => {
  const { jwt } = useAuthContext();
  const { setPopUp, closePopUp } = usePopUpContext();

  const handleDeleteUser = async () => {
    if (jwt) {
      const result = await axios.delete(
        `http://localhost:3000/users/delete/${userId}`,
        {
          headers: {
            Authorization: jwt,
          },
        }
      );
      if (result.status === 500) {
        setPopUp(<FailedPopUp message="Este usuario no pudo ser eliminado" />);
      } else {
        setPopUp(<SuccessPopUp message="Usuario eliminado con éxito" />);
      }
    }
  };

  return (
    <div className="delete-user-pop-up-container pop-up-component-container flex-column-center">
      <CloseButton />
      <h3 className="delete-user-pop-up-title">
        ¿Deseas eliminar este usuario?
      </h3>
      <div className="delete-user-pop-up-actions-buttons-section flex-row-center">
        <Button label="Eliminar" onClick={handleDeleteUser} />
        <Button
          styleVariant="secondary"
          label="Cancelar"
          onClick={closePopUp}
        />
      </div>
    </div>
  );
};
