import { useEffect, useState } from "react";
import { Input } from "../../../inputs/Input";
import "./create-user-pop-up.css";
import { usePopUpContext } from "../../../../contexts/PopUpContext";
import { Button } from "../../../buttons/Button";
import { Dropdown } from "../../../dropdown/Dropdown";
import { CalendarInput } from "../../../calendar/input/CalendarInput";
import axios from "axios";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { SuccessPopUp } from "../../success-pop-up/SuccessPopUp";
import { CloseButton } from "../../components/close-button/CloseButton";
import { UploadProfile } from "../../../images/profiles/upload-profile/UploadProfile";

export const CreateUserPopUp = () => {
  const { setPopUp, closePopUp } = usePopUpContext();
  const { jwt } = useAuthContext();

  const currentDate = new Date();
  const identifyType = ["Cédula de identidad", "Pasaporte"];
  const genders = ["Masculino", "Femenino"];
  const [minimumYear] = useState(currentDate.getFullYear() - 100);
  const [maximumYear] = useState(currentDate.getFullYear() - 3);

  const [firstnames, setFirstnames] = useState("");
  const [lastnames, setLastnames] = useState("");
  const [ci, setCi] = useState("");
  const [ciType, setCiType] = useState("");
  const [gender, setGender] = useState("");
  const [ciTypeOption, setCITypeOption] = useState(-1);
  const [genderOption, setGenderOption] = useState(-1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState<Date>();
  const [roles, setRoles] = useState<Map<number, string>>();
  const [rolesList, setRolesList] = useState<Array<string>>([]);
  const [roleOption, setRoleOption] = useState(-1);
  const [imageUrl, setImageUrl] = useState("");
  const [imageToUpload, setImageToUpload] = useState<File>();

  const getRoles = async () => {
    try {
      const response = await axios.get("http://localhost:3000/auth/roles", {
        headers: {
          Authorization: jwt,
        },
      });

      if (!response.data) {
        throw new Error("Roles not found");
      }

      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const getRoleNames = () => {
    if (roles) {
      const result = Object.values(roles);
      setRolesList(result);
    }
  };

  const createUser = async (imageUrlParam: string) => {
    if (!birthDate) return;
    const birthDateAux = `${birthDate.getFullYear()}-${String(
      birthDate.getMonth() + 1
    ).padStart(2, "0")}-${String(birthDate.getDate()).padStart(2, "0")}`;
    const shortname = handleCreateShortName();
    const requestBody = {
      firstNames: firstnames,
      lastNames: lastnames,
      shortName: shortname,
      ci: ci,
      ciType: ciType,
      imageUrl: imageUrlParam,
      address: "",
      phoneNumber: "",
      email: email,
      password: password,
      gender: gender,
      birthDate: birthDateAux,
      roleId: roleOption + 1,
    };
    const result = await axios.post(
      "http://localhost:3000/create-user",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: jwt,
        },
      }
    );

    if (result) {
      setPopUp(<SuccessPopUp message="Usuario creado con éxito" />);
    }
  };

  const handleUploadImage = async () => {
    if (!imageToUpload) return;

    const formData = new FormData();
    formData.append("file", imageToUpload);
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

  const handleCreateUser = async () => {
    let finalImageUrl = "";
    if (imageToUpload) {
      const uploadedUrl = await handleUploadImage();
      if (uploadedUrl) {
        setImageUrl(uploadedUrl);
        finalImageUrl = uploadedUrl;
      }
    }

    await createUser(finalImageUrl);
  };

  const handleCreateShortName = () => {
    const first = firstnames.split(" ");
    const last = lastnames.split(" ");
    return `${first[0]} ${last[0]}`;
  };

  useEffect(() => {
    setCiType(identifyType[ciTypeOption] ?? "");
  }, [ciTypeOption]);

  useEffect(() => {
    if (genderOption > -1) {
      setGender(genders[genderOption].charAt(0) ?? "");
    }
  }, [genderOption]);

  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    getRoleNames();
  }, [roles]);

  return (
    <div className="create-user-pop-up-container pop-up-component-container">
      <CloseButton />
      <h3 className="create-user-pop-up-title complete-left">
        Crear nuevo usuario
      </h3>
      <div className="create-user-pop-up-form">
        <div className="flex-column-center">
          <UploadProfile
            imageUrl={imageUrl}
            setImageToUpload={setImageToUpload}
          />
        </div>
        <Dropdown
          label="Selecciona el rol dentro del sistema"
          placeholder="Seleccionar rol"
          isMandatory
          options={rolesList}
          optionSelected={roleOption}
          changeOptionSelected={setRoleOption}
        />
        <Input
          label="Nombres"
          placeholder="Denis Jorge"
          isMandatory
          value={firstnames}
          onChange={setFirstnames}
        />
        <Input
          label="Apellidos"
          placeholder="Gandarillas Delgado"
          isMandatory
          value={lastnames}
          onChange={setLastnames}
        />
        <Input
          label="Identificación nacional"
          placeholder="1234567"
          isMandatory
          value={ci}
          onChange={setCi}
        />
        <Dropdown
          label="Tipo de identificación"
          placeholder="Selecciona el tipo de identificación"
          isMandatory
          options={identifyType}
          optionSelected={ciTypeOption}
          changeOptionSelected={setCITypeOption}
        />
        <Input
          label="Correo electrónico"
          placeholder="user@sapiens360.edu"
          isMandatory
          value={email}
          onChange={setEmail}
        />
        <Input
          label="Contraseña"
          placeholder="Pass123"
          isMandatory
          value={password}
          onChange={setPassword}
        />
        <Dropdown
          label="Seleccione su sexo"
          placeholder="Seleccione su sexo"
          isMandatory
          options={genders}
          optionSelected={genderOption}
          changeOptionSelected={setGenderOption}
        />
        <CalendarInput
          label="Fecha de nacimiento"
          setDate={setBirthDate}
          minimunYear={minimumYear}
          maximunYear={maximumYear}
        />
      </div>
      <div className="create-user-pop-up-action-buttons flex-row-between">
        <Button label="Crear usuario" onClick={handleCreateUser} />
        <Button
          styleVariant="secondary"
          label="Cancelar"
          onClick={closePopUp}
        />
      </div>
    </div>
  );
};
