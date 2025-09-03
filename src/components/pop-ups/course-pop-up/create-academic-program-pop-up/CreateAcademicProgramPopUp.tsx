import { useState } from "react";
import { useAuthContext, usePopUpContext } from "../../../../contexts";
import { Button } from "../../../buttons";
import { Input } from "../../../inputs";
import { TextArea } from "../../../textarea/TextArea";
import { CloseButton } from "../../components/close-button/CloseButton";
import { AcademicProgram } from "../../../../models/course/AcademicProgram";
import axios from "axios";
import { SuccessPopUp } from "../../success-pop-up/SuccessPopUp";
import { FailedPopUp } from "../../failed-pop-up/FailedPopUp";

export const CreateAcademicProgramPopUp = () => {
  const API_URL = "http://127.0.0.1:8000/api/";

  const { sessionData } = useAuthContext();
  const { closePopUp, setPopUp } = usePopUpContext();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");

  const handleCreate = async () => {
    if (!sessionData) return;

    const requestBody: AcademicProgram = {
      name,
      description,
      code,
      periods: 10,
      duration_type: "Semestral",
      tenant_id: sessionData.user.tenant_id,
    };

    const response = await axios.post(
      `${API_URL}courses/programs`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    const status = response.status;

    if (status === 200 || status === 201) {
      setPopUp(<SuccessPopUp message="Nivel académico creado con éxito." />);
    } else {
      setPopUp(
        <FailedPopUp message="Error al crear el nivel académico. Intenta nuevamente." />
      );
    }
  };

  return (
    <div className="create-academic-level-pop-up-component pop-up-component-container">
      <CloseButton />
      <h3>Crear nivel académico</h3>
      <div className="create-academic-level-form">
        <Input
          label="Nombre"
          value={name}
          onChange={setName}
          placeholder="Secundaria"
        />
        <TextArea
          label="Descripción"
          value={description}
          onChange={setDescription}
          placeholder="Descripción..."
        />
        <Input
          label="Código"
          value={code}
          onChange={setCode}
          placeholder="SEC-001"
        />
      </div>
      <div className="create-academic-level-actions flex-row-between">
        <Button label="Crear" onClick={handleCreate} />
        <Button
          label="Cancelar"
          onClick={closePopUp}
          styleVariant="secondary"
        />
      </div>
    </div>
  );
};
