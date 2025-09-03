import { Subject } from "../../../../../../../../models/course/Subject";
import { User } from "../../../../../../../../models/user/User";
import DefaultBanner from "../../../../../../../../assets/backgrounds/light.png";
import "./banner.css";

interface Props {
  teacher?: User;
  subject?: Subject;
}

export const Banner = ({ teacher, subject }: Props) => {
  return (
    <div className="lms-subject-header">
      <img
        src={subject?.imageUrl ?? DefaultBanner}
        alt=""
        className="subject-banner"
      />
      <div className="subject-info-section">
        <h2 className="subject-name-text complete-left">
          {subject?.name ?? "Materia"}
        </h2>
        <p className="teacher-name-subject-text complete-left">
          {teacher?.shortname ?? "Docente"}
        </p>
        <p className="description-subject-text">{subject?.description ?? ""}</p>
      </div>
    </div>
  );
};
