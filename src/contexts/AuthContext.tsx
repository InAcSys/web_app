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
import { User } from "../models/user/User";
import { Role } from "../models/role/Role";

interface Props {
  children: ReactNode;
}

interface Type {
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
  const API_URL = "http://127.0.0.1:8000/api/";

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

    const response = await axios.post(`${API_URL}auth/login`, requestInfo, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    console.log(response);

    if (response.status === 200 || response.status === 201) {
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

  const getPermissions = async () => {
    if (!sessionData) {
      return;
    }

    if (sessionData) {
      const response = await axios.get(
        `${API_URL}authorization/role-permissions/role/${
          sessionData?.role.id ?? 1
        }/permissions?tenant=${sessionData.user.tenant_id}`,
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      const data = response.data as Permissions;
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
    const userResponse = await axios.get(`${API_URL}auth/me`, {
      withCredentials: true,
    });

    console.log(userResponse.data);

    const userData = userResponse.data as User;

    const roleResponse = await axios.get(
      `${API_URL}authorization/roles/by?column=id&value=${userData.role_id}`,
      {
        withCredentials: true,
      }
    );

    const roleData = roleResponse.data as Role;

    const data: SessionData = {
      user: userData,
      role: roleData,
    };

    console.log(data);

    setSessionData(data);
  };

  useEffect(() => {
    getPermissions();
  }, [sessionData]);

  useEffect(() => {
    getSessionData();
  }, []);

  const objValue = useMemo(
    () => ({
      emailError,
      passwordError,
      formError,
      logIn,
      permissions,
      logOut,
      verifyPermission,
      sessionData,
    }),
    [emailError, passwordError, formError, permissions, sessionData]
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
