import { AcademicProgram } from "../../../models/course/AcademicProgram";
import "./academic-program-card.css";

interface Props {
  program: AcademicProgram;
}

export const AcademicProgramCard = ({ program }: Props) => {
  return (
    <div className="academic-program-card-component card-component">
      <p className="program-card-name">{program.name}</p>
    </div>
  );
};
