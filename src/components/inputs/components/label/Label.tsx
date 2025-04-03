import "./label.css";

interface Props {
  text: string;
  isMandatory: boolean;
}

const Label = ({ text, isMandatory }: Props) => {
  return (
    <div className="label-component">
      <span className="label-component-text">{text}</span>
      {isMandatory && <span className="label-component-mandatory-symbol">*</span>}
    </div>
  );
};

export default Label;