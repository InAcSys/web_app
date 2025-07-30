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
import { SessionData } from "../models/session/SessionData";
import axios from "axios";

interface Props {
  children: ReactNode;
}

interface Type {
  jwt: string | null;
  sessionData: SessionData | null;
  passwordError: string;
  emailError: string;
  formError: string;
  permissions: Permissions | undefined;
  logIn: (email: string, password: string) => void;
  logOut: () => void;
  verifyPermission: (permission: string) => boolean;
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
  const [sessionData, setSessionData] = useState<SessionData | null>(null);

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
    navigate("/");
  };

  const getToken = () => {
    const token = Cookies.get(
      "sapiens_360_gwEjbpFRQsyFZm4VVYBTSk5zP7DmM9tpzAAmW1f4FvndB2HvJmyKytdFYkq2bK53"
    );
    setJwt(token ?? "");
  };

  const getPermissions = async () => {
    if (!jwt) {
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

  const hasPermissionRecursive = (
    categories: any[],
    permissionCode: string
  ): boolean => {
    for (const category of categories) {
      if (category.code === permissionCode) return true;
      if (
        category.permissions?.some((perm: any) => perm.code === permissionCode)
      ) {
        return true;
      }

      if (category.subCategories && category.subCategories.length > 0) {
        if (hasPermissionRecursive(category.subCategories, permissionCode)) {
          return true;
        }
      }
    }

    return false;
  };

  const verifyPermission = (permissionCode: string): boolean => {
    if (!permissions || !Array.isArray(permissions)) {
      return false;
    }

    return hasPermissionRecursive(permissions, permissionCode);
  };

  const getSessionData = async () => {
    if (!jwt) return;

    const userData = await axios.get("http://localhost:3000/my-info", {
      headers: {
        Authorization: jwt,
      },
    });

    setSessionData(userData.data as SessionData);
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    getPermissions();
  }, [jwt]);

  useEffect(() => {
    getSessionData();
  }, [jwt]);

  const objValue = useMemo(
    () => ({
      jwt,
      emailError,
      passwordError,
      formError,
      logIn,
      permissions,
      logOut,
      verifyPermission,
      sessionData,
    }),
    [jwt, emailError, passwordError, formError, permissions, sessionData]
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
