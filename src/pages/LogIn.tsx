import { data, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import FormLayout from "../layouts/FormLayout";
import "../styles/log-in.css";
import Logo from "../assets/logo.png";
import { Button, ErrorNote, Input } from "../components";
import { NAME_PAGE } from "../utils/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import logInSchema from "../validations/log-in-schema";
import { getClientInfo } from "../utils/ClientInfo";

export default function LogIn() {
  const navigate = useNavigate();

  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(logInSchema),
  });

  const email = watch("email") || "";
  const password = watch("password") || "";

  const logIn = async (data: { email: string; password: string }) => {
    const clientInfo = await getClientInfo();
    const requestInfo = {
      email: data.email,
      password: data.password,
      ip: clientInfo.ip,
      userAgent: clientInfo.userAgent,
      device: clientInfo.device,
      browser: clientInfo.browser,
      os: clientInfo.os,
    };
    const response = await fetch(
      "http://localhost:5003/api/Authentication/log-in",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestInfo),
      }
    );

    if (response.ok) {
      const token = await response.text();
      localStorage.setItem(
        "sapiens_360_gwEjbpFRQsyFZm4VVYBTSk5zP7DmM9tpzAAmW1f4FvndB2HvJmyKytdFYkq2bK53",
        token
      );
      navigate("/dashboard");
    }
  };

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
      <form
        onSubmit={handleSubmit((data) => logIn(data))}
        className="log-in-form-section"
      >
        <Input
          label="Correo electrónico"
          isMandatory
          value={email}
          onChange={(value) => setValue("email", value)}
          placeholder="example@sapiens360.com"
          error={errors.email?.message}
          register={register("email")}
        />
        <Input
          label="Contraseña"
          isMandatory
          value={password}
          onChange={(value) => setValue("password", value)}
          placeholder="contraseña"
          isSecret
          error={errors.password?.message}
          register={register("password")}
        />
        <ErrorNote error={formError} />
        <div className="button-log-in-form-section flex-row-center">
          <Button label="Iniciar sesion" type="submit" />
          <Button label="Olvide mi contraseña" styleVariant="action" />
        </div>
      </form>
    </FormLayout>
  );
}
