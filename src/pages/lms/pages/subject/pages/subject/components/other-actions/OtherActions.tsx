import "./other-actions.css";
import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
  secondaryAction?: ReactNode;
}

export const OtherAction = ({ title, children, secondaryAction }: Props) => {
  return (
    <div className="other-action-component flex-column">
      <div className="title-other-action-section">
        <div className="header-title-other-action-section flex-row-between">
          <h4>{title}</h4>
          {secondaryAction}
        </div>
        <hr />
      </div>
      {children}
    </div>
  );
};
