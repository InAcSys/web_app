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
  const API_URL = "http://127.0.0.1:8000/api/";
  const navigate = useNavigate();
  const { sessionData } = useAuthContext();

  const [teacher, setTeacher] = useState<User>();

  const handleGoSubject = () => {
    navigate(`/lms/subject/${subject.id}`);
  };

  const handleGetTeacherInfo = async () => {
    try {
      const response = await axios.get(
        `${API_URL}users/by?column=id&value=${subject.teacherId}`,
        {
          withCredentials: true,
        }
      );

      setTeacher(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetTeacherInfo();
  }, [sessionData, subject]);

  return (
    <div className="subject-card-container">
      <img
        src={subject.imageUrl ?? subjectCover}
        alt="Subject cover"
        className="subject-card-cover"
      />
      <div className="subject-card-text-section">
        <button className="subject-name-text" onClick={handleGoSubject}>
          <b>{subject.name}</b>
        </button>
        <p className="subject-card-teacher-name">{teacher?.shortname}</p>
      </div>
    </div>
  );
};
