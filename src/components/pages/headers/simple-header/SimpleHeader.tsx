import "./simple-headers.css"

interface Props {
  title?: string;
}

export const SimpleHeader = ({ title = "Page" }: Props) => {
  return (
    <div className="single-header-title-container">
      <h1>{title}</h1>
    </div>
  );
};
