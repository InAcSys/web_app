import "./error-note.css";

interface Props {
  error: string;
}

export const ErrorNote = ({ error }: Props) => {
  return (
    <div className="error-note-component flex-column-center">
      {error && <p className="error-note-component-text">{error}</p>}
    </div>
  );
};
