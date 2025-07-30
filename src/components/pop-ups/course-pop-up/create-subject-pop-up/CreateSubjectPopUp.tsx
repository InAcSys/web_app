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
import { UploadCover } from "../../../images/covers/upload-cover/UploadCover";
import "./create-subject-pop-up.css";
import { AcademicLevel } from "../../../../models/course/AcademicLevel";

export const CreateSubjectPopUp = () => {
  const { closePopUp } = usePopUpContext();
  const { jwt } = useAuthContext();
  const { setPopUp } = usePopUpContext();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [credits, setCredits] = useState("0");
  const [imageUrl, setImageUrl] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [levelId, setLevelId] = useState("");

  const [image, setImage] = useState<File>();

  const [teachers, setTeachers] = useState<Array<User>>([]);
  const [teachersNames, setTeachersNames] = useState<Array<string>>([]);
  const [selectTeacher, setSelectTeacher] = useState(-1);

  const [levels, setLevels] = useState<Array<AcademicLevel>>([]);
  const [levelsNames, setLevelsNames] = useState<Array<string>>([]);
  const [selectLevel, setSelectLevel] = useState(-1);

  const createSubject = async (imageUrl: string) => {
    const requestBody = {
      credits,
      lmsId: 0,
      academicLevelId: levelId,
      teacherId,
      name,
      description,
      code,
      imageUrl,
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

  const getLevels = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/academic-levels?pageNumber=1&pageSize=100",
        {
          headers: {
            Authorization: jwt,
          },
        }
      );

      setLevels(response.data.data.items);
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

  const getLevelsNames = () => {
    if (levels) {
      const names = levels.map((level) => {
        return level.name;
      });
      setLevelsNames(names);
    }
  };

  const handleUploadImage = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);
    const response = await axios.post(
      `http://localhost:3000/files/upload`,
      formData,
      {
        headers: {
          Authorization: jwt,
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      let url = response.data.data.url;
      url = url.replace("file-server:8000", "localhost:8002");
      return url;
    }

    return "";
  };

  const handleCreateSubject = async () => {
    let finalImageUrl = "";
    if (image) {
      const uploadedUrl = await handleUploadImage();
      if (uploadedUrl) {
        setImageUrl(uploadedUrl);
        finalImageUrl = uploadedUrl;
      }
    }

    await createSubject(finalImageUrl);
  };

  useEffect(() => {
    if (selectTeacher >= 0 && teachers[selectTeacher]) {
      const id = teachers[selectTeacher].id;
      setTeacherId(id);
    }
  }, [selectTeacher, teachers]);

  useEffect(() => {
    if (selectLevel >= 0 && levels[selectLevel]) {
      const id = levels[selectLevel].id;
      setLevelId(id?.toString() ?? "");
    }
  }, [selectLevel, levels]);

  useEffect(() => {
    getTeachers();
  }, [jwt]);

  useEffect(() => {
    getLevels();
  }, [jwt]);

  useEffect(() => {
    getTeachersNames();
  }, [teachers]);

  useEffect(() => {
    getLevelsNames();
  }, [levels]);

  return (
    <div className="create-subject-pop-up-container pop-up-component-container">
      <CloseButton />
      <h3 className="create-subject-pop-up-title complete-left">
        Crear una nueva materia
      </h3>
      <div className="create-subject-pop-up-form">
        <UploadCover imageUrl={imageUrl} setImageToUpload={setImage} />
        <Dropdown
          label="Nivel academico"
          placeholder="Selecciona un nivel academico"
          options={levelsNames}
          optionSelected={selectLevel}
          changeOptionSelected={setSelectLevel}
        />
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
        <Button label="Crear materia" onClick={handleCreateSubject} />
        <Button
          styleVariant="secondary"
          label="Cancelar"
          onClick={closePopUp}
        />
      </div>
    </div>
  );
};
