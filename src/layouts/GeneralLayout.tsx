import { SidebarMenu } from "../components/menu/sidebar/SidebarMenu";
import "../styles/layouts/general-layout.css";
import { useNavigate } from "react-router";
import { useAuthContext } from "../contexts/AuthContext";
import { usePopUpContext } from "../contexts/PopUpContext";
import "../styles/layouts/form-layout.css";
import { ReactNode, useEffect } from "react";
import { FailedPopUp } from "../components";

interface Props {
  header: ReactNode;
  children: ReactNode;
}

const GeneralLayout = ({ header, children }: Props) => {
  const { jwt } = useAuthContext();
  const { setPopUp } = usePopUpContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt === null) return;
    if (!jwt) {
      setPopUp(
        <FailedPopUp message="No tienes autorización para acceder. Por favor, inicia sesión para continuar." />
      );
      navigate("/log-in");
    }
  }, [jwt]);

  return (
    <div className="general-layout">
      <SidebarMenu />
      <div className="visual-general-container">
        {header}
        <div className="visual-children-general-container">{children}</div>
      </div>
    </div>
  );
};

export default GeneralLayout;
