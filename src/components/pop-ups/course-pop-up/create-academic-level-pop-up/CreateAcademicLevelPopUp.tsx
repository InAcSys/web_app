import { useState } from "react";
import { useAuthContext, usePopUpContext } from "../../../../contexts";
import { Input } from "../../../inputs";
import { CloseButton } from "../../components/close-button/CloseButton";
import "./create-academic-level-pop-up.css";
import { Button } from "../../../buttons";
import { TextArea } from "../../../textarea/TextArea";
import { AcademicLevel } from "../../../../models/course/AcademicLevel";
import axios from "axios";
import { SuccessPopUp } from "../../success-pop-up/SuccessPopUp";
import { FailedPopUp } from "../../failed-pop-up/FailedPopUp";

export const CreateAcademicLevelPopUp = () => {
  const { jwt } = useAuthContext();
  const { closePopUp, setPopUp } = usePopUpContext();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");

  const handleCreate = async () => {
    if (!jwt) return;

    const requestBody: AcademicLevel = {
      order: 0,
      name,
      description,
      code,
    };

    const response = await axios.post(
      "http://localhost:3000/academic-level",
      requestBody,
      {
        headers: {
          Authorization: jwt,
          "Content-Type": "application/json",
        },
      }
    );

    const status = response.data.statusCode;

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
