import "./courses.css"
import { useEffect, useState } from "react";
import { SubjectCard } from "../../../../components/courses/subject-card/SubjectCard";
import { Subject } from "../../../../models/course/Subject";
import { useAuthContext } from "../../../../contexts/AuthContext";
import axios from "axios";
import { Button } from "../../../../components";
import { usePopUpContext } from "../../../../contexts/PopUpContext";
import { CreateSubjectPopUp } from "../../../../components/pop-ups/course-pop-up/create-subject-pop-up/CreateSubjectPopUp";

export function Courses() {
  const { jwt } = useAuthContext();
  const { setPopUp } = usePopUpContext();

  const [subjects, setSubjects] = useState<Array<Subject>>();

  const handleGetSubjects = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/subjects?pageNumber=1&pageSize=12`,
        {
          headers: {
            Authorization: jwt,
          },
        }
      );
      setSubjects(response.data.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateSubject = () => {
    setPopUp(<CreateSubjectPopUp />)
  }

  useEffect(() => {
    handleGetSubjects();
  }, [jwt]);

  return (
    <div className="lms-courses-page">
      <div className="lms-course-action-buttons-section flex-row-center-end">
        <Button label="Crear materia" onClick={handleCreateSubject} />
      </div>
      <div className="subjects-section">
        {subjects && subjects.length > 0 ? (
          subjects.map((subject) => {
            return <SubjectCard key={subject.id} subject={subject} />;
          })
        ) : (
          <p className="subjects-not-found-text">No se encontraron materias</p>
        )}
      </div>
    </div>
  );
}
