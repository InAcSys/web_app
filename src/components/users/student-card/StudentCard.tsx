import { useEffect, useState } from "react";
import "./student-card.css";
import { User } from "../../../models/user/User";
import axios from "axios";
import { useAuthContext } from "../../../contexts";
import { ProfileImage } from "../../images/profiles/profile-image/ProfileImage";

interface Props {
  studentId: string;
}

export const StudentCard = ({ studentId }: Props) => {
  const API_URL = "http://127.0.0.1:8000/api/";

  const { sessionData } = useAuthContext();

  const [student, setStudent] = useState<User>();

  const getStudent = async () => {
    if (!sessionData) return;
    const response = await axios.get(
      `${API_URL}users/by?column=id&value=${studentId}`,
      {
        withCredentials: true,
      }
    );

    setStudent(response.data.data);
  };

  useEffect(() => {
    getStudent();
  }, [sessionData, studentId]);

  if (!student) return;

  return (
    <div className="student-card-component">
      <div className="student-card-profile">
        <ProfileImage user={student} />
      </div>
      <p className="student-card-full-name">{student.name}</p>
    </div>
  );
};
