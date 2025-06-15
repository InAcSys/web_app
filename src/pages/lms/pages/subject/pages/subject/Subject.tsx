import { useParams } from "react-router";
import "./subject.css";
import axios from "axios";
import { useAuthContext } from "../../../../../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { Subject as SubjectType } from "../../../../../../models/course/Subject";

export function Subject() {
  const { id } = useParams();
  const { jwt } = useAuthContext();

  const [subject, setSubject] = useState<SubjectType>();

  const getSubject = async () => {
    const respose = await axios.get(`http://localhost:3000/subject/${id}`, {
      headers: {
        Authorization: jwt,
      },
    });

    setSubject(respose.data);
  };

  useEffect(() => {
    getSubject();
  }, [id, jwt]);

  return (
    <div className="lms-subject-page">
      <h2 className="subject-name-text">{subject?.name}</h2>
    </div>
  );
}
