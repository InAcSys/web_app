import { ReactNode } from "react";
import { SidebarMenu } from "../components/menu/sidebar/SidebarMenu";
import "../styles/layouts/general-layout.css"

interface Props {
  header: ReactNode;
  children: ReactNode;
}

const GeneralLayout = ({ header, children }: Props) => {
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
