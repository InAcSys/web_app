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
  const { jwt } = useAuthContext();

  const [student, setStudent] = useState<User>();

  const getStudent = async () => {
    if (!jwt) return;
    const response = await axios.get(
      `http://localhost:3000/user/${studentId}`,
      {
        headers: {
          Authorization: jwt,
        },
      }
    );

    setStudent(response.data.data);
  };

  useEffect(() => {
    getStudent();
  }, [jwt, studentId]);

  if (!student) return;

  return (
    <div className="student-card-component">
      <div className="student-card-profile">
        <ProfileImage user={student} />
      </div>
      <p className="student-card-full-name">
        {`${student.lastNames} ${student.firstNames}`}
      </p>
    </div>
  );
};
