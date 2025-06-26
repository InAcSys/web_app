import "./error-page.css";
import { useLocation, useNavigate } from "react-router";
import { Button } from "../../components";
import {
  FileX,
  Frown,
  LucideIcon,
  ServerCrash,
  ShieldAlert,
} from "lucide-react";

export function ErrorPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { code?: number; message?: string };

  const code = state?.code ?? 404;
  const message = state?.message;

  const errorMessages: Record<number, { message: string; icon: LucideIcon }> = {
    404: { message: "La página que buscas no existe.", icon: FileX },
    403: {
      message: "No tienes permisos para acceder a esta página.",
      icon: ShieldAlert,
    },
    500: {
      message: "Ocurrió un error interno del servidor.",
      icon: ServerCrash,
    },
  };

  const Icon = errorMessages[code].icon ?? Frown;

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="error-page flex-column-center">
      <h1>Error {code}</h1>
      <Icon className="error-page-icon" />
      <p>
        {(message ?? errorMessages[code].message) ||
          "Ocurrió un error inesperado."}
      </p>
      <Button label="Volver a la página anterior" onClick={handleBack} />
    </div>
  );
}
