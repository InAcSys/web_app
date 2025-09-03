import "./register-attendance-subject-pop-up.css";
import { useEffect, useState } from "react";
import { useAuthContext, usePopUpContext } from "../../../../contexts";
import { Button } from "../../../buttons";
import { CloseButton } from "../../components/close-button/CloseButton";
import { User } from "../../../../models/user/User";
import axios from "axios";
import { RegisterStudent } from "./components/register-student/RegisterStudent";
import { SuccessPopUp } from "../../success-pop-up/SuccessPopUp";
import { FailedPopUp } from "../../failed-pop-up/FailedPopUp";

interface Props {
  id: string;
}

export const RegisterAttendanceSubjectPopUp = ({ id }: Props) => {
  const { closePopUp, setPopUp } = usePopUpContext();
  const { jwt } = useAuthContext();
  const [students, setStudents] = useState<Array<User>>([]);
  const [attendanceData, setAttendanceData] = useState<
    Array<{ userId: string; status: string; comment: string }>
  >([]);

  const getStudents = async () => {
    if (!jwt || !id) return;
    const enrollStudents = await axios.get(
      `http://localhost:3000/subject/students?subjectId=${id}`,
      {
        headers: {
          Authorization: jwt,
        },
      }
    );

    const enrollData = enrollStudents.data.data;

    const data = await Promise.all(
      enrollData.map(async (enroll: string) => {
        const student = await axios.get(
          `http://localhost:3000/user/${enroll}`,
          {
            headers: {
              Authorization: jwt,
            },
          }
        );

        return student.data.data as User;
      })
    );

    data.sort((a, b) => {
      const nombreA = `${a.lastNames} ${a.firstNames}`;
      const nombreB = `${b.lastNames} ${b.firstNames}`;
      return nombreA.localeCompare(nombreB, "es", { sensitivity: "base" });
    });

    setStudents(data);
  };

  const handleRegister = async () => {
    if (!id || !jwt) return;

    const response = await axios.post(
      `http://localhost:3000/attendance/subject/${id}`,
      attendanceData,
      {
        headers: {
          Authorization: jwt,
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;

    if (data.status === 200)
      setPopUp(
        <SuccessPopUp message="Lista de asistencia actualizada exitosamente." />
      );
    else
      setPopUp(
        <FailedPopUp message="No se pudo registrar la asistencia. Por favor, intenta nuevamente." />
      );
  };

  useEffect(() => {
    getStudents();
  }, [id, jwt]);

  return (
    <div className="register-attendance-pop-up pop-up-component-container">
      <CloseButton />
      <div className="register-attendance-header">
        <h3>Asistencia</h3>
      </div>
      <div className="register-attendance-body">
        {students && students.length > 0 ? (
          students.map((student) => {
            return (
              <RegisterStudent
                key={`register-attendance-${student.id}`}
                student={student}
                status={[
                  "Presente",
                  "Tardío",
                  "Ausente",
                  "Justificado",
                  "Injustificado",
                  "Se fue temprano",
                  "Remoto",
                  "Incompleto",
                ]}
                subjectId={id}
                onChange={(updated) => {
                  setAttendanceData((prev) => {
                    const others = prev.filter(
                      (x) => x.userId !== updated.userId
                    );
                    return [...others, updated];
                  });
                }}
              />
            );
          })
        ) : (
          <p>No students</p>
        )}
      </div>
      <div className="register-attendance-actions-section flex-row-between">
        <Button label="Registar" onClick={handleRegister} />
        <Button
          label="Cancelar"
          styleVariant="secondary"
          onClick={closePopUp}
        />
      </div>
    </div>
  );
};
