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

interface Props {
  userId: string;
}

export const EditUserPopUp = ({ userId }: Props) => {
  const { jwt } = useAuthContext();
  const { setPopUp, closePopUp } = usePopUpContext();
  const [user, setUser] = useState<User>();

  const currentDate = new Date();
  const identifyType = ["Cédula de identidad", "Pasaporte"];
  const genders = ["Masculino", "Femenino"];
  const [minimumYear] = useState(currentDate.getFullYear() - 100);
  const [maximumYear] = useState(currentDate.getFullYear() - 3);

  const [firstnames, setFirstnames] = useState("");
  const [lastnames, setLastnames] = useState("");
  const [shortName, setShortName] = useState("");
  const [ci, setCi] = useState("");
  const [ciType, setCiType] = useState("");
  const [gender, setGender] = useState("");
  const [ciTypeOption, setCITypeOption] = useState(-1);
  const [genderOption, setGenderOption] = useState(-1);
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState<Date>();
  const [roles, setRoles] = useState<Map<number, string>>();
  const [rolesList, setRolesList] = useState<Array<string>>([]);
  const [roleOption, setRoleOption] = useState(-1);

  const getUserInfo = async () => {
    if (jwt) {
      const response = await axios.get(`http://localhost:3000/user/${userId}`, {
        headers: {
          Authorization: jwt,
        },
      });
      setUser(response.data);
    }
  };

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

  const updateUser = async () => {
    const updateUser = {
      firstNames: firstnames ?? user?.firstNames,
      lastNames: lastnames ?? user?.lastNames,
      shortName: shortName ?? user?.shortName,
      ci: ci ?? user?.ci,
      ciType: ciType ?? user?.ciType,
      imageUrl: user?.imageUrl,
      address: user?.address,
      phoneNumber: user?.phoneNumber,
      email: email ?? user?.email,
      gender: gender ?? user?.gender,
      birthDate: birthDate?.toISOString().split("T")[0] ?? user?.birthDate,
      roleId: roleOption + 1 || user?.roleId,
    };

    const result = await axios.put(
      `http://localhost:3000/users/update/${user?.id}`,
      updateUser,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: jwt,
        },
      }
    );

    if (result) {
      setPopUp(<SuccessPopUp message="Usuario actualizado con éxito" />);
    }
  };

  const handleUpdateUserInfo = () => {
    const apiGendersOptions = ["M", "F"];
    if (user) {
      setFirstnames(user.firstNames);
      setLastnames(user.lastNames);
      setShortName(user.shortName);
      setCi(user.ci);
      setCITypeOption(identifyType.indexOf(user.ciType));
      setEmail(user.email);
      setGenderOption(apiGendersOptions.indexOf(user.gender));
      setBirthDate(user.birthDate);
      setRoleOption(user.roleId - 1);
    }
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

  useEffect(() => {
    getUserInfo();
  }, [jwt, userId]);

  useEffect(() => {
    handleUpdateUserInfo();
  }, [user]);

  return (
    <div className="edit-user-pop-up-container pop-up-component-container">
      <CloseButton />
      <h3 className="edit-user-pop-up-title">Editar información de usuario</h3>
      <div className="edit-user-pop-up-form">
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
