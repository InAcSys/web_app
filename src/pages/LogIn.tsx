import { useEffect, useState } from "react";
import FormLayout from "../layouts/FormLayout";
import "../styles/log-in.css";
import Logo from "../assets/logo.png";
import { Button, ErrorNote, Input } from "../components";
import { NAME_PAGE } from "../utils/constants";
import { useAuthContext } from "../contexts/AuthContext";

export default function LogIn() {
  const { logIn, emailError, passwordError, formError } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = `Inicio de sesión - ${NAME_PAGE}`;
  });

  return (
    <FormLayout>
      <img
        src={Logo}
        alt="Sapiens360 Logo"
        className="log-in-logo"
        width="100px"
      />
      <h1 className="log-in-title">
        Iniciar <span>sesion</span>
      </h1>
      <Input
        label="Correo electrónico"
        isMandatory
        value={email}
        onChange={setEmail}
        placeholder="example@sapiens360.com"
        error={emailError}
      />
      <Input
        label="Contraseña"
        isMandatory
        value={password}
        onChange={setPassword}
        placeholder="contraseña"
        isSecret
        error={passwordError}
      />
      <ErrorNote error={formError} />
      <div className="button-log-in-form-section flex-row-center">
        <Button label="Iniciar sesion" onClick={() => logIn(email, password)} />
        <Button label="Olvide mi contraseña" styleVariant="action" />
      </div>
    </FormLayout>
  );
}
