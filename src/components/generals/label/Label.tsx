import "./label.css";

interface Props {
  text: string;
  isMandatory: boolean;
  canCrossedOut?: boolean;
  isCrossedOut?: boolean;
}

export const Label = ({
  text,
  isMandatory,
  canCrossedOut = false,
  isCrossedOut = false,
}: Props) => {
  return (
    <div
      className={`label-component ${
        canCrossedOut && isCrossedOut ? "crossed-out" : ""
      }`}
    >
      <span className={`label-component-text ${
        canCrossedOut && isCrossedOut ? "crossed-out" : ""
      }`}>{text}</span>
      {isMandatory && (
        <span className="label-component-mandatory-symbol">*</span>
      )}
    </div>
  );
};
