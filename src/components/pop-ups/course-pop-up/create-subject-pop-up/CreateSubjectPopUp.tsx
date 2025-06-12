import { useEffect, useState } from "react";
import { usePopUpContext } from "../../../../contexts/PopUpContext";
import { Button } from "../../../buttons";
import { CloseButton } from "../../components/close-button/CloseButton";
import { Input } from "../../../inputs";
import { TextArea } from "../../../textarea/TextArea";
import axios from "axios";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { User } from "../../../../models/user/User";
import { Dropdown } from "../../../dropdown";
import { SuccessPopUp } from "../../success-pop-up/SuccessPopUp";

export const CreateSubjectPopUp = () => {
  const { closePopUp } = usePopUpContext();
  const { jwt } = useAuthContext();
  const { setPopUp } = usePopUpContext();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [credits, setCredits] = useState("0");
  const [teacherId, setTeacherId] = useState("");

  const [teachers, setTeachers] = useState<Array<User>>([]);
  const [teachersNames, setTeachersNames] = useState<Array<string>>([]);
  const [selectTeacher, setSelectTeacher] = useState(-1);

  const createSubject = async () => {
    const requestBody = {
      credits,
      lmsId: 0,
      academicLevelId: 1,
      teacherId,
      name,
      description,
      code,
    };
    const response = await axios.post(
      "http://localhost:3000/subject",
      requestBody,
      {
        headers: {
          Authorization: jwt,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      setPopUp(<SuccessPopUp message="Curso creado de manera exitosa" />);
    }
  };

  const getTeachers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users/role/2", {
        headers: {
          Authorization: jwt,
        },
      });

      setTeachers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getTeachersNames = () => {
    if (teachers) {
      const names = teachers.map((teacher) => {
        return `${teacher.lastNames} ${teacher.firstNames}`;
      });
      setTeachersNames(names);
    }
  };

  useEffect(() => {
    if (selectTeacher >= 0 && teachers[selectTeacher]) {
      const id = teachers[selectTeacher].id;
      console.log(id);
      setTeacherId(id);
    }
  }, [selectTeacher, teachers]);

  useEffect(() => {
    getTeachers();
  }, [jwt]);

  useEffect(() => {
    getTeachersNames();
  }, [teachers]);

  return (
    <div className="create-subject-pop-up-container pop-up-component-container">
      <CloseButton />
      <h3 className="create-subject-pop-up-title complete-left">
        Crear una nueva materia
      </h3>
      <div className="create-subject-pop-up-form">
        <Input
          label="Nombre de la materia"
          value={name}
          onChange={setName}
          placeholder="Matemáticas"
        />
        <TextArea
          label="Descripción"
          placeholder="Introduce una descripción del curso"
          value={description}
          onChange={setDescription}
        />
        <Input
          label="Código de la materia"
          value={code}
          onChange={setCode}
          placeholder="SPN-123"
        />
        <Input
          label="Créditos"
          value={credits}
          onChange={setCredits}
          placeholder="0"
        />
        <Dropdown
          label="Docente"
          placeholder="Selecciona un docente"
          options={teachersNames}
          optionSelected={selectTeacher}
          changeOptionSelected={setSelectTeacher}
        />
      </div>
      <div className="create-subject-pop-up-action-buttons flex-row-between">
        <Button label="Crear materia" onClick={createSubject} />
        <Button
          styleVariant="secondary"
          label="Cancelar"
          onClick={closePopUp}
        />
      </div>
    </div>
  );
};
