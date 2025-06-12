import "./subject-card.css";
import subjectCover from "../../../assets/backgrounds/light.png";
import { useNavigate } from "react-router";
import { Subject } from "../../../models/course/Subject";
import axios from "axios";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { User } from "../../../models/user/User";

interface Props {
  subject: Subject;
}

export const SubjectCard = ({ subject }: Props) => {
  const navigate = useNavigate();
  const {jwt} = useAuthContext()

  const [teacher, setTeacher] = useState<User>()

  const handleGoSubject = () => {
    navigate(`/lms/course/${subject.id}`);
  };

  const handleGetTeacherInfo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/user/${subject.teacherId}`,
        {
          headers: {
            "Authorization": jwt
          }
        }
      );

      setTeacher(response.data.data)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetTeacherInfo()
  }, [jwt, subject])

  return (
    <div className="subject-card-container">
      <img
        src={subjectCover}
        alt="Subject cover"
        className="subject-card-cover"
      />
      <div className="subject-card-text-section">
        <button className="subject-name-text" onClick={handleGoSubject}>
          <b>{subject.name}</b>
        </button>
        <p className="subject-card-teacher-name">
          {teacher?.shortName}
        </p>
      </div>
    </div>
  );
};
