import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Button, Dropdown, Input, SubDomain } from "../../components";
import FormLayout from "../../layouts/FormLayout";
import "../../styles/pages/registration.css";
import { NAME_PAGE } from "../../utils/constants";

export default function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [institutionType, setInstitutionType] = useState(-1);
  const [institutionNature, setInstitutionNature] = useState(-1);
  const [institutionPeriod, setInstitutionPeriod] = useState(-1);
  const [state, setState] = useState(-1);
  const [province, setProvince] = useState(-1);
  const [subdomain, setSubdomain] = useState("");

  const navigate = useNavigate()

  const handleNextStepRegistration = () => {
    navigate('terms-and-conditions')
  }

  useEffect(() => {
    document.title = `Registro - ${NAME_PAGE}`;
  }, []);

  return (
    <FormLayout>
      <h1 className="registration-title complete-left">
        Registro de <span>Institución Académica</span>
      </h1>
      <div className="registration-form-section">
        <div className="form-input-section double-form-section">
          <Input
            label="Nombre de la institución"
            placeholder="Sapiens360"
            isMandatory
            value={name}
            onChange={setName}
          />
          <Input
            label="Correo electrónico"
            placeholder="principal@sapiens360.com"
            isMandatory
            value={email}
            onChange={setEmail}
          />
        </div>
        <div className="form-input-section">
          <Dropdown
            label="Tipo de institución"
            placeholder="Selecciona un tipo"
            isMandatory
            optionSelected={institutionType}
            options={[
              "Universidad",
              "Colegio o Institución Educativa",
              "Instituto Alternativo",
              "Instituto de Idiomas",
            ]}
            changeOptionSelected={setInstitutionType}
          />
        </div>
        <div className="form-input-section double-form-section">
          <Dropdown
            label="Naturaleza de institución"
            placeholder="Selecciona"
            isMandatory
            options={[
              "Público/Gubernamental",
              "Privado/Particular",
              "Convenio",
            ]}
            optionSelected={institutionNature}
            changeOptionSelected={setInstitutionNature}
          />
          <Dropdown
            label="Tipo de período académico"
            placeholder="Selecciona"
            isMandatory
            options={["Semestral", "Trimestral", "Anual"]}
            optionSelected={institutionPeriod}
            changeOptionSelected={setInstitutionPeriod}
          />
        </div>
        <div className="form-input-section">
          <SubDomain
            label="Nombre de subdominio"
            placeholder="sapiens-institute"
            value={subdomain}
            changeValue={setSubdomain}
          />
        </div>
        <div className="form-input-section double-form-section">
          <Dropdown
            label="Departamento"
            placeholder="Selecciona"
            isMandatory
            options={[
              "Beni",
              "Cochabamba",
              "La Paz",
              "Oruro",
              "Pando",
              "Potosí",
              "Santa Cruz",
              "Sucre",
              "Tarija",
            ]}
            optionSelected={state}
            changeOptionSelected={setState}
          />
          <Dropdown
            label="Tipo de período académico"
            placeholder="Selecciona"
            isMandatory
            options={[
              "Beni",
              "Cochabamba",
              "La Paz",
              "Oruro",
              "Pando",
              "Potosí",
              "Santa Cruz",
              "Sucre",
              "Tarija",
            ]}
            optionSelected={province}
            changeOptionSelected={setProvince}
          />
        </div>
        <div className="form-input-section double-form-section">
          <Input
            label="Nombre de usuario"
            isMandatory
            value={username}
            onChange={setUsername}
            placeholder="Principal"
          />
          <Input
            label="Constraseña"
            placeholder="constraseña"
            isMandatory
            value={password}
            onChange={setPassword}
            isSecret
          />
        </div>
        <div className="form-input-section">
          <Button label="Siguiente" onClick={handleNextStepRegistration} />
        </div>
      </div>
    </FormLayout>
  );
}
