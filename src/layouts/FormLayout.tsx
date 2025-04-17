import "../styles/layouts/form-layout.css";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const FormLayout = ({ children }: Props) => {
  return (
    <div className="form-layout-section">
      <div className="image-form-layout-section"></div>
      <div className="children-form-layout-section flex-column-center">
        {children}
      </div>
    </div>
  );
};

export default FormLayout;
