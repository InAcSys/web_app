import { useParams } from "react-router";
import { Button } from "../../../../../../components";
import { useAuthContext, usePopUpContext } from "../../../../../../contexts";
import "./users.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { EnrollStudentsPopUp } from "../../../../../../components/pop-ups/lms-pop-up/subject-pop-up/enroll-students-pop-up/EnrollStudentsPopUp";
import { StudentCard } from "../../../../../../components/users/student-card/StudentCard";
import { VerifyPermission } from "../../../../../../components/permission/VerifyPermission";

export const Users = () => {
  const { jwt } = useAuthContext();
  const { id } = useParams();
  const { setPopUp } = usePopUpContext();

  const [students, setStudents] = useState<string[]>();

  const getStudents = async () => {
    if (!jwt || !id) return;

    const response = await axios.get(
      `http://localhost:3000/subject/students?subjectId=${id}`,
      {
        headers: {
          Authorization: jwt,
        },
      }
    );

    if (response.data.status === 200) {
      setStudents(response.data.data);
    }
  };

  const handleEnroll = () => {
    if (!id) return;
    setPopUp(
      <EnrollStudentsPopUp subjectId={id} enrollmentStudents={students ?? []} />
    );
  };

  useEffect(() => {
    getStudents();
  }, [id, jwt]);

  return (
    <div className="users-page">
      <div className="users-header flex-row-between">
        <h2 className="users-lms-title">Estudiantes</h2>
        <VerifyPermission permission="ENROLL_STUDENTS">
          <Button label="Matricular estudiante" onClick={handleEnroll} />
        </VerifyPermission>
      </div>
      <div className="users-list-section">
        {students && students.length > 0 ? (
          students.map((student) => (
            <StudentCard key={`student-${student}`} studentId={student} />
          ))
        ) : (
          <p className="users-page-not-found">Estudiantes no encontrados</p>
        )}
      </div>
    </div>
  );
};
