import "./sub-domain.css";
import { Label, ErrorNote } from "../generals";

interface Props {
  value: string;
  changeValue: (value: string) => void;
  error: string;
}

export const SubDomain = ({ value, changeValue, error = "" }: Props) => {
  return (
    <div className="sub-domain-component flex-column-center">
      <Label text="Nombre de subdominio" isMandatory={true} />
      <div className={`sub-domain-component-input flex-row-center ${error.length > 0 ? "error" : ""}`}>
        <input
          type="text"
          className={`sub-domain-component-input-section ${error.length > 0 ? "error" : ""}`}
          value={value}
          onChange={(e) => changeValue(e.target.value)}
          placeholder="sub-domain"
        />
        <div className={`sub-domain-component-input-domain ${error.length > 0 ? "error" : ""}`}>
          <span className="sub-domain-component-input-domain-text">
            .sapiens360.xyz
          </span>
        </div>
      </div>
      <ErrorNote error={error} />
    </div>
  );
};
