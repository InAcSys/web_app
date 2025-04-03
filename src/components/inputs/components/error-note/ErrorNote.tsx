import "./error-note.css";

interface Props {
  error: string;
}

const ErrorNote = ({error}: Props) => {
return (
    <div className="error-note-component">
      {
        error && (
          <span className="error-note-component-text">{error}</span>
        )
      }
    </div>
  );
};

export default ErrorNote;