import axios from "axios";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { usePopUpContext } from "../../../../contexts/PopUpContext";
import { Button } from "../../../buttons/Button";
import { CloseButton } from "../../components/close-button/CloseButton";
import "./edit-user-pop-up.css";
import { useEffect, useState } from "react";
import { Input } from "../../../inputs/Input";
import { Dropdown } from "../../../dropdown/Dropdown";
import { CalendarInput } from "../../../calendar/input/CalendarInput";
import { SuccessPopUp } from "../../success-pop-up/SuccessPopUp";
import { User } from "../../../../models/user/User";
import { UploadProfile } from "../../../images/profiles/upload-profile/UploadProfile";
import { Role } from "../../../../models/role/Role";

interface Props {
  userId: string;
}

export const EditUserPopUp = ({ userId }: Props) => {
  const API_URL = "http://127.0.0.1:8000/api/";

  const { sessionData } = useAuthContext();
  const { setPopUp, closePopUp } = usePopUpContext();
  const [user, setUser] = useState<User>();

  const currentDate = new Date();
  const genders = ["Masculino", "Femenino"];
  const [minimumYear] = useState(currentDate.getFullYear() - 100);
  const [maximumYear] = useState(currentDate.getFullYear() - 3);

  const [firstnames, setFirstnames] = useState("");
  const [lastnames, setLastnames] = useState("");
  const [shortName, setShortName] = useState("");
  const [ci, setCi] = useState("");
  const [gender, setGender] = useState("");
  const [genderOption, setGenderOption] = useState(-1);
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState<Date>();
  const [roles, setRoles] = useState<Array<Role>>([]);
  const [rolesList, setRolesList] = useState<Array<string>>([]);
  const [roleOption, setRoleOption] = useState(-1);
  const [imageUrl, setImageUrl] = useState("");
  const [imageToUpload, setImageToUpload] = useState<File>();

  const getUserInfo = async () => {
    if (sessionData) {
      const response = await axios.get(
        `${API_URL}users/by?column=id&value=${userId}`,
        {
          withCredentials: true,
        }
      );
      setUser(response.data);
    }
  };

  const getRoles = async () => {
    try {
      const response = await axios.get(`${API_URL}authorization/roles`, {
        withCredentials: true,
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
      const result = roles.map((role) => role.name);
      setRolesList(result);
    }
  };

  const updateUser = async () => {
    const image = await handleUploadImage();
    const updateUser = {
      firstnames: firstnames ?? user?.firstnames,
      lastnames: lastnames ?? user?.lastnames,
      shortname: shortName ?? user?.shortname,
      ci: ci ?? user?.ci,
      image_url: image ?? user?.image_url,
      address: user?.address,
      phoneNumber: user?.phone,
      email: email ?? user?.email,
      gender: gender ?? user?.gender,
      birthDate: birthDate
        ? new Date(birthDate).toISOString().split("T")[0]
        : user?.birthdate,
      roleId: roleOption + 1 || user?.role_id,
    };

    const result = await axios.put(
      `${API_URL}/users/${user?.id}`,
      updateUser,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (result) {
      setPopUp(<SuccessPopUp message="Usuario actualizado con éxito" />);
    }
  };

  const handleUpdateUserInfo = () => {
    const apiGendersOptions = ["M", "F"];
    if (user) {
      setFirstnames(user.firstnames);
      setLastnames(user.lastnames);
      setShortName(user.shortname);
      setCi(user.ci);
      setEmail(user.email);
      setGenderOption(apiGendersOptions.indexOf(user.gender));
      setBirthDate(user.birthdate);
      setRoleOption(user.role_id);
      setImageUrl(user.image_url ?? "");
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
        withCredentials: true,
      }
    );

    if (response.status === 200 || response.status === 201) {
      let url = response.data.data.url;
      url = url.replace("file-server:8000", "localhost:8002");
      return url;
    }

    return "";
  };

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

  useEffect(() => {
    getUserInfo();
  }, [sessionData, userId]);

  useEffect(() => {
    handleUpdateUserInfo();
  }, [user]);

  return (
    <div className="edit-user-pop-up-container pop-up-component-container">
      <CloseButton />
      <h3 className="edit-user-pop-up-title">Editar información de usuario</h3>
      <div className="edit-user-pop-up-form">
        <div className="flex-column-center">
          <UploadProfile
            imageUrl={imageUrl}
            setImageToUpload={setImageToUpload}
          />
        </div>
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
          label="Nombre corto"
          placeholder="Denis Gandarillas"
          isMandatory
          value={shortName}
          onChange={setShortName}
        />
        <Input
          label="Identificación nacional"
          placeholder="1234567"
          isMandatory
          value={ci}
          onChange={setCi}
        />
        <Input
          label="Correo electrónico"
          placeholder="user@sapiens360.edu"
          isMandatory
          value={email}
          onChange={setEmail}
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
          date={birthDate}
          setDate={setBirthDate}
          minimunYear={minimumYear}
          maximunYear={maximumYear}
        />
        <Dropdown
          label="Selecciona el rol dentro del sistema"
          placeholder="Seleccionar rol"
          isMandatory
          options={rolesList}
          optionSelected={roleOption}
          changeOptionSelected={setRoleOption}
        />
      </div>
      <div className="edit-pop-up-action-buttons-section flex-row-between">
        <Button label="Editar" onClick={updateUser} />
        <Button
          styleVariant="secondary"
          label="Cancelar"
          onClick={closePopUp}
        />
      </div>
    </div>
  );
};
