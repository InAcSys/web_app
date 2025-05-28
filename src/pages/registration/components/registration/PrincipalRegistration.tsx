import { useEffect, useState } from "react";
import { Dropdown, Input } from "../../../../components";
import { useRegistrationContext } from "../../../../contexts/RegistrationContext";
import { CalendarInput } from "../../../../components/calendar/input/CalendarInput";

export const PrincipalRegistration = () => {
  const {
    firstNames,
    setFirstNames,
    lastNames,
    setLastNames,
    shortName,
    setShortName,
    ci,
    setCI,
    setCIType,
    // imageUrl,
    // setImageUrl,
    // address,
    // setAddress,
    // phone,
    // setPhone,
    email,
    setEmail,
    password,
    setPassword,
    repeatPassword,
    setRepeatPassword,
    setGender,
    setBirthDate,
  } = useRegistrationContext();

  const currentDate = new Date();

  const [minimumYear] = useState(currentDate.getFullYear() - 100);
  const [maximumYear] = useState(currentDate.getFullYear() - 30);

  const identifyType = ["Cédula de identidad", "Pasaporte"];
  const genders = ["Masculino", "Femenino"];
  const [ciTypeOption, setCITypeOption] = useState(-1);
  const [genderOption, setGenderOption] = useState(-1);
  useEffect(() => {
    setCIType(identifyType[ciTypeOption]);
  }, [ciTypeOption]);

  useEffect(() => {
    if (genderOption > -1) {
      setGender(genders[genderOption].charAt(0));
    }
  }, [genderOption]);

  return (
    <div className="registration-form-section">
      <div className="form-input-section double-form-section">
        <Input
          label="Nombres"
          placeholder="Denis Jorge"
          isMandatory
          value={firstNames}
          onChange={setFirstNames}
        />
        <Input
          label="Apellidos"
          placeholder="Gandarillas Delgado"
          isMandatory
          value={lastNames}
          onChange={setLastNames}
        />
      </div>
      <div className="form-input-section double-form-section">
        <Input
          label="Nombre corto"
          placeholder="Denis Gandarillas"
          isMandatory
          value={shortName}
          onChange={setShortName}
        />
        <Input
          label="Correo electrónico"
          placeholder="principal@sapiens360.edu"
          isMandatory
          value={email}
          onChange={setEmail}
        />
      </div>
      <div className="form-input-section double-form-section">
        <Input
          label="Contraseña"
          placeholder="Contraseña"
          isSecret
          isMandatory
          value={password}
          onChange={setPassword}
        />
        <Input
          label="Repite contraseña"
          placeholder="Contraseña"
          isMandatory
          isSecret
          value={repeatPassword}
          onChange={setRepeatPassword}
        />
      </div>
      <div className="form-input-section double-form-section">
        <Input
          label="Identificación nacional"
          placeholder="1234567"
          isMandatory
          value={ci}
          onChange={setCI}
        />
        <Dropdown
          label="Tipo de identificación"
          placeholder="Selecciona el tipo de identificación"
          isMandatory
          options={identifyType}
          optionSelected={ciTypeOption}
          changeOptionSelected={setCITypeOption}
        />
      </div>
      <div className="form-input-section double-form-section">
        <Dropdown
          label="Seleccione su sexo"
          placeholder="Seleccione su sexo"
          isMandatory
          options={genders}
          optionSelected={genderOption}
          changeOptionSelected={setGenderOption}
        />
        <CalendarInput
          label="Fecha de inicio"
          setDate={setBirthDate}
          minimunYear={minimumYear}
          maximunYear={maximumYear}
        />
      </div>
    </div>
  );
};
