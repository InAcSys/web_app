import "./sub-domain.css";
import { Label, ErrorNote } from "../generals";

interface Props {
  label?: string;
  placeholder?: string;
  value: string;
  changeValue: (value: string) => void;
  error?: string;
}

export const SubDomain = ({ label = "Insert subdomain", placeholder = "subdomain", value, changeValue, error = "" }: Props) => {
  return (
    <div className="sub-domain-component flex-column-center">
      <Label text={label} isMandatory={true} />
      <div className={`sub-domain-component-input flex-row-center ${error.length > 0 ? "error" : ""}`}>
        <input
          type="text"
          className={`sub-domain-component-input-section ${error.length > 0 ? "error" : ""}`}
          value={value}
          onChange={(e) => changeValue(e.target.value)}
          placeholder={placeholder}
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
