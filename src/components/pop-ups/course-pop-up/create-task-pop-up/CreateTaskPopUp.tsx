import { useState } from "react";
import { usePopUpContext } from "../../../../contexts/PopUpContext";
import { Button } from "../../../buttons";
import { Input } from "../../../inputs";
import { CloseButton } from "../../components/close-button/CloseButton";
import { TextArea } from "../../../textarea/TextArea";
import { CalendarInput } from "../../../calendar/input/CalendarInput";
import dayjs from "dayjs";
import { FailedPopUp } from "../../failed-pop-up/FailedPopUp";
import axios from "axios";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { SuccessPopUp } from "../../success-pop-up/SuccessPopUp";

interface Props {
  id: string | undefined;
}

export const CreateTaskPopUp = ({ id }: Props) => {
  const { closePopUp, setPopUp } = usePopUpContext();
  const { jwt } = useAuthContext();

  const currentDate = new Date();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date>(currentDate);

  const createTask = async () => {
    if (!id) {
      setPopUp(
        <FailedPopUp message="Hubo un error durante la ejecución, inténtalo más tarde" />
      );
    }
    const requestBody = {
      title,
      description,
      dueDate: dayjs(dueDate).format("YYYY-MM-DD HH:mm:ss"),
      courseId: id,
    };
    const response = await axios.post(
      "http://localhost:3000/task",
      requestBody,
      {
        headers: {
          Authorization: jwt,
        },
      }
    );
    console.log(response.data.data);
    if (response.status === 200 || response.status === 201) {
      setPopUp(<SuccessPopUp message="Tarea asignada correctamente" />);
    }
  };

  return (
    <div className="create-task-pop-up-container pop-up-component-container">
      <CloseButton />
      <h3 className="create-task-title complete-left">Crear nueva tarea</h3>
      <div className="create-task-pop-up-form">
        <Input
          label="Título"
          value={title}
          onChange={setTitle}
          placeholder="Tarea"
        />
        <TextArea
          label="Descripción"
          value={description}
          onChange={setDescription}
          placeholder="Ingrese una descripción de la tarea"
        />
        <CalendarInput
          label="Fecha de entrega"
          date={dueDate}
          setDate={setDueDate}
          minimunYear={currentDate.getFullYear()}
          maximunYear={currentDate.getFullYear()}
        />
      </div>
      <div className="create-task-pop-up-action-buttons flex-row-between">
        <Button label="Crear materia" onClick={createTask} />
        <Button
          styleVariant="secondary"
          label="Cancelar"
          onClick={closePopUp}
        />
      </div>
    </div>
  );
};
