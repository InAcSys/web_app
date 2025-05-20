import { useState } from "react";
import { Dropdown, Input, SubDomain } from "../../../../components";
import { CalendarInput } from "../../../../components/calendar/input/CalendarInput";
import { useRegistrationContext } from "../../../../contexts/RegistrationContext";

export const FormRegistration = () => {
  const {
    name,
    setName,
    subDomain,
    setSubDomain,
    institutionType,
    setInstitutionType,
    institutionNature,
    setInstitutionNature,
    institutionPeriod,
    setInstitutionPeriod,
    department,
    setDepartment,
    city,
    setCity,
    location,
    setLocation,
    setStartDate,
    setEndDate,
    departments,
    cities,
    instituteTypes,
    natures,
    periods,
    subDomainError,
  } = useRegistrationContext();

  const currentDate = new Date();

  const [minimumYear] = useState(currentDate.getFullYear());
  const [maximumYear] = useState(minimumYear + 10);

  return (
    <div className="registration-form-section">
      <div className="form-input-section double-form-section">
        <Input
          label="Nombre de la institución"
          placeholder="Sapiens360"
          isMandatory
          value={name}
          onChange={setName}
        />
        <Dropdown
          label="Tipo de institución"
          placeholder="Selecciona un tipo"
          isMandatory
          optionSelected={institutionType}
          options={instituteTypes.map((item) => item.name)}
          changeOptionSelected={setInstitutionType}
        />
      </div>
      <div className="form-input-section double-form-section">
        <Dropdown
          label="Naturaleza de institución"
          placeholder="Selecciona"
          isMandatory
          options={natures.map((item) => item.name)}
          optionSelected={institutionNature}
          changeOptionSelected={setInstitutionNature}
        />
        <Dropdown
          label="Tipo de período académico"
          placeholder="Selecciona"
          isMandatory
          options={periods.map((item) => item.name)}
          optionSelected={institutionPeriod}
          changeOptionSelected={setInstitutionPeriod}
        />
      </div>
      <div className="form-input-section">
        <SubDomain
          label="Nombre de subdominio"
          placeholder="sapiens-institute"
          value={subDomain}
          changeValue={setSubDomain}
          error={subDomainError}
        />
      </div>
      <div className="form-input-section double-form-section">
        <Dropdown
          label="Departamento"
          placeholder="Selecciona"
          isMandatory
          options={departments.map((item) => item.name)}
          optionSelected={department}
          changeOptionSelected={setDepartment}
        />
        <Dropdown
          label="Ciudad"
          placeholder="Selecciona"
          isMandatory
          options={cities.map((item) => item.name)}
          optionSelected={city}
          changeOptionSelected={setCity}
        />
      </div>
      <div className="form-input-section">
        <Input
          label="Ubicación"
          placeholder="Av. Ejemplo #123"
          isMandatory
          value={location}
          onChange={setLocation}
        />
      </div>
      <div className="form-input-section double-form-section">
        <CalendarInput
          label="Fecha de inicio"
          setDate={setStartDate}
          minimunYear={minimumYear}
          maximunYear={maximumYear}
        />
        <CalendarInput
          label="Fecha de finalización"
          setDate={setEndDate}
          minimunYear={minimumYear}
          maximunYear={maximumYear}
        />
      </div>
    </div>
  );
};
