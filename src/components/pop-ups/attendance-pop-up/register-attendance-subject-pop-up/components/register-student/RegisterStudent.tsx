import { useEffect, useState } from "react";
import { User } from "../../../../../../models/user/User";
import { Dropdown } from "../../../../../dropdown";
import { ProfileImage } from "../../../../../images/profiles/profile-image/ProfileImage";
import "./register-student.css";
import { TextArea } from "../../../../../textarea/TextArea";
import { MessageSquarePlus } from "lucide-react";
import { useAuthContext } from "../../../../../../contexts";
import axios from "axios";

interface Props {
  student: User;
  status: string[];
  onChange: (entry: {
    userId: string;
    status: string;
    comment: string;
  }) => void;
  subjectId: string;
}

export const RegisterStudent = ({
  student,
  status,
  onChange,
  subjectId,
}: Props) => {
  const { jwt } = useAuthContext();

  const [selectedOption, setSelectedOption] = useState(0);
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);

  const statusTranslations: Record<string, string> = {
    Presente: "present",
    Tardío: "late",
    Ausente: "absent",
    Justificado: "excused",
    Injustificado: "unexcused",
    "Se fue temprano": "left_early",
    Remoto: "remote",
    Incompleto: "incomplete",
  };

  const statusEnum: Array<string> = [
    "present",
    "late",
    "absent",
    "excused",
    "unexcused",
    "Se fue temprano",
    "remote",
    "incomplete",
  ];

  const statusIndexMap: Record<string, number> = Object.entries(
    statusTranslations
  ).reduce((acc, [value], index) => {
    acc[value] = index;
    return acc;
  }, {} as Record<string, number>);

  const getRegisterData = async () => {
    if (!subjectId || !jwt || !student.id) return;

    const response = await axios.get(
      `http://localhost:3000/attendance/student/${student.id}?subjectId=${subjectId}`,
      {
        headers: {
          Authorization: jwt,
        },
      }
    );

    const data = response.data.data;

    if (data) {
      setComment(data.comment);
      setSelectedOption(statusEnum.indexOf(data.status) ?? -1);
    }
  };

  useEffect(() => {
    onChange({
      userId: student.id,
      status: statusTranslations[status[selectedOption]],
      comment,
    });
  }, [selectedOption, comment]);

  useEffect(() => {
    getRegisterData();
  }, [subjectId, jwt, student]);

  return (
    <div className="register-attendance-student-component flex-column">
      <div className="rasc-main-section flex-row-between">
        <div className="rasc-ms-student-info flex-row-center-start">
          <div className="rasc-ms-si-profile">
            <ProfileImage user={student} />
          </div>
          <p className="rasc-ms-si-fullname">{`${student.lastNames} ${student.firstNames}`}</p>
        </div>
        <div className="rasc-ms-status-section flex-row">
          <Dropdown
            options={status}
            optionSelected={selectedOption}
            changeOptionSelected={setSelectedOption}
          />
          <button
            className="rasc-ms-comment-status-button flex-column-center"
            onClick={() => setOpen(!open)}
          >
            <MessageSquarePlus />
          </button>
        </div>
      </div>
      <div className="rasc-comment-section flex-column-center">
        {open && (
          <TextArea
            value={comment}
            onChange={setComment}
            placeholder={`Comentario sobre ${student.shortName ?? ""}`}
          />
        )}
      </div>
    </div>
  );
};
