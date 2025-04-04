import "./sub-domain.css";
import { Label, ErrorNote } from "../generals";

interface Props {
  value: string;
  changeValue: (value: string) => void;
  error?: string;
}

const SubDomain = ({ value, changeValue, error = "" }: Props) => {
  return (
    <div className="sub-domain-component">
      <Label text="Nombre de subdominio" isMandatory={true} />
      <div className="sub-domain-component-input flex-row-center">
        <input
          type="text"
          className="sub-domain-component-input-section"
          value={value}
          onChange={(e) => changeValue(e.target.value)}
          placeholder="sub-domain"
        />
        <div className="sub-domain-component-input-domain">
          <span className="sub-domain-component-input-domain-text">
            .sapiens360.xyz
          </span>
        </div>
      </div>
      <ErrorNote error={error} />
    </div>
  );
};

export default SubDomain;
