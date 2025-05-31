import { X } from "lucide-react";
import { usePopUpContext } from "../../../../contexts/PopUpContext";

export const CloseButton = () => {
  const { closePopUp } = usePopUpContext();

  return (
    <button className="close-pop-up" onClick={closePopUp}>
      <X />
    </button>
  );
};
