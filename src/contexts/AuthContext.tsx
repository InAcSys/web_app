import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getClientInfo } from "../utils/ClientInfo";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import logInSchema from "../validations/log-in-schema";
import { Permissions } from "../models/menu/Menu";

interface Props {
  children: ReactNode;
}

interface Type {
  jwt: string | null;
  passwordError: string;
  emailError: string;
  formError: string;
  permissions: Permissions | undefined;
  logIn: (email: string, password: string) => void;
  isLogged: () => boolean;
  logOut: () => void;
}

const AuthContext = createContext<Type | undefined>(undefined);

export const AuthProvider = ({ children }: Props) => {
  const [jwt, setJwt] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [formError, setFormError] = useState<string>("");
  const [permissions, setPermissions] = useState<Permissions | undefined>(
    undefined
  );

  const navigate = useNavigate();

  const logIn = async (email: string, password: string) => {
    const result = logInSchema.safeParse({ email, password });

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;

      setEmailError(errors.email?.[0] ?? "");
      setPasswordError(errors.password?.[0] ?? "");
      return;
    }

    setEmailError("");
    setPasswordError("");
    setFormError("");

    const clientInfo = await getClientInfo();

    const requestInfo = {
      email: email,
      password: password,
      ip: clientInfo.ip,
      userAgent: clientInfo.userAgent,
      device: clientInfo.device,
      browser: clientInfo.browser,
      os: clientInfo.os,
    };

    const response = await fetch("http://localhost:3000/log-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestInfo),
    });

    if (response.ok) {
      const token = await response.text();
      setJwt(token);
      Cookies.set(
        "sapiens_360_gwEjbpFRQsyFZm4VVYBTSk5zP7DmM9tpzAAmW1f4FvndB2HvJmyKytdFYkq2bK53",
        token
      );
      navigate("/dashboard");
    } else {
      setFormError("Credenciales inválidas");
    }
  };

  const logOut = () => {
    Cookies.remove(
      "sapiens_360_gwEjbpFRQsyFZm4VVYBTSk5zP7DmM9tpzAAmW1f4FvndB2HvJmyKytdFYkq2bK53"
    );
    navigate("/")
  };

  const isLogged = () => {
    const token = Cookies.get(
      "sapiens_360_gwEjbpFRQsyFZm4VVYBTSk5zP7DmM9tpzAAmW1f4FvndB2HvJmyKytdFYkq2bK53"
    );
    if (token !== undefined) {
      setJwt(token);
      return true;
    }
    return false;
  };

  const getPermissions = async () => {
    if (!isLogged()) {
      return;
    }

    const headers: HeadersInit = {};

    if (jwt) {
      headers["Authorization"] = jwt;

      const response = await fetch("http://localhost:3000/auth/permissions", {
        method: "GET",
        headers: headers,
      });

      const data = (await response.json()) as Permissions;
      setPermissions(data);
    }
  };

  useEffect(() => {
    getPermissions();
  }, [jwt]);

  const objValue = useMemo(
    () => ({
      jwt,
      emailError,
      passwordError,
      formError,
      logIn,
      isLogged,
      permissions,
      logOut
    }),
    [jwt, emailError, passwordError, formError, permissions]
  );

  return (
    <AuthContext.Provider value={objValue}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
