import { useAuthContext, usePopUpContext } from "../../../../../contexts";
import "./enroll-students-pop-up.css";
import { useEffect, useState } from "react";
import { User } from "../../../../../models/user/User";
import { CloseButton } from "../../../components/close-button/CloseButton";
import { Button } from "../../../../buttons";
import { SearchBar } from "../../../../search-bar/SearchBar";
import axios from "axios";
import { UserCardSelect } from "../../../../users/user-card-select/UserCardSelect";
import { SuccessPopUp } from "../../../success-pop-up/SuccessPopUp";
import { FailedPopUp } from "../../../failed-pop-up/FailedPopUp";

interface Props {
  subjectId: string;
  enrollmentStudents: string[];
}

export const EnrollStudentsPopUp = ({
  subjectId,
  enrollmentStudents,
}: Props) => {
  const { jwt } = useAuthContext();
  const { closePopUp, setPopUp } = usePopUpContext();

  const [selectStudents, setSelectStudents] = useState<User[]>([]);
  const [unenrollStudents, setUnenrollStudents] = useState<User[]>([]);
  const [showStudents, setShowStudents] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  const getUsers = async () => {
    if (jwt) {
      try {
        const response = await axios.get(`http://localhost:3000/users/role/1`, {
          headers: {
            Authorization: jwt,
          },
        });
        const data: User[] = response.data;

        const selected = data.filter((student) =>
          enrollmentStudents.includes(student.id)
        );

        const notSelected = data.filter(
          (student) => !enrollmentStudents.includes(student.id)
        );

        setSelectStudents(selected);
        setShowStudents(notSelected);
      } catch (error) {
        console.error("Error al obtener estudiantes:", error);
        setPopUp(<FailedPopUp message="Hubo un error. Intentar más tarde" />);
      }
    }
  };

  const handleAddStudents = (student: User) => {
    if (selectStudents.find((s) => s.id === student.id)) return;

    setSelectStudents([...selectStudents, student]);
    setShowStudents(showStudents.filter((s) => s.id !== student.id));

    setUnenrollStudents((prev) => prev.filter((s) => s.id !== student.id));
  };

  const handleRemoveStudents = (student: User) => {
    setSelectStudents(selectStudents.filter((s) => s.id !== student.id));
    setShowStudents([...showStudents, student]);

    if (enrollmentStudents.includes(student.id)) {
      setUnenrollStudents((prev) => {
        if (prev.find((s) => s.id === student.id)) return prev;
        return [...prev, student];
      });
    } else {
      setUnenrollStudents((prev) => prev.filter((s) => s.id !== student.id));
    }
  };

  const handleEnrollStudents = async () => {
    if (!subjectId || !jwt) return;

    const studentIds: string[] = selectStudents.map((student) => student.id);
    const unenrollIds: string[] = unenrollStudents.map((student) => student.id);

    try {
      let enrollResponse;
      let unenrollResponse;

      if (studentIds.length > 0) {
        enrollResponse = await axios.post(
          `http://localhost:3000/subject/enroll?subjectId=${subjectId}`,
          studentIds,
          {
            headers: {
              Authorization: jwt,
              "Content-Type": "application/json",
            },
          }
        );
      }

      if (unenrollIds.length > 0) {
        unenrollResponse = await axios.post(
          `http://localhost:3000/subject/unenroll?subjectId=${subjectId}`,
          unenrollIds,
          {
            headers: {
              Authorization: jwt,
              "Content-Type": "application/json",
            },
          }
        );
      }

      const enrollSuccess =
        !enrollResponse ||
        enrollResponse.status === 200 ||
        enrollResponse.status === 201;
      const unenrollSuccess =
        !unenrollResponse ||
        unenrollResponse.status === 200 ||
        unenrollResponse.status === 201;

      if (enrollSuccess || unenrollSuccess) {
        setPopUp(
          <SuccessPopUp message="Matriculación realizada correctamente." />
        );
      } else {
        setPopUp(
          <FailedPopUp message="Error al procesar la matriculación. Por favor, inténtalo de nuevo." />
        );
      }
    } catch (error) {
      console.error(error);
      setPopUp(
        <FailedPopUp message="Error al procesar la matriculación. Por favor, inténtalo de nuevo." />
      );
    }
  };

  useEffect(() => {
    getUsers();
  }, [jwt]);

  return (
    <div className="enroll-students-pop-up pop-up-component-container">
      <CloseButton />
      <h3 className="enroll-students-title">
        Matricular nuevos <span>estudiantes</span>
      </h3>
      <div className="enroll-students-pop-up-users">
        <SearchBar
          searchValue={search}
          setSearchValue={setSearch}
          search={() => {}}
        />
        <div className="enroll-students-pop-up-students-section flex-row-center">
          <div className="enroll-students-pop-up-students enroll-students-section">
            {showStudents.length > 0 ? (
              showStudents.map((student) => (
                <UserCardSelect
                  key={student.id}
                  user={student}
                  isSelect={false}
                  onClick={() => handleAddStudents(student)}
                />
              ))
            ) : (
              <p className="enroll-pop-up-students-error">
                No se encontraron estudiantes
              </p>
            )}
          </div>
          <div className="enroll-students-pop-up-select-students enroll-students-section">
            {selectStudents.length > 0 ? (
              selectStudents.map((selectStudent) => (
                <UserCardSelect
                  key={selectStudent.id}
                  user={selectStudent}
                  isSelect={true}
                  onClick={() => handleRemoveStudents(selectStudent)}
                />
              ))
            ) : (
              <p className="enroll-pop-up-students-error">
                No se seleccionaron estudiantes
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="enroll-students-pop-up-actions flex-row-between">
        <Button label="Matricular" onClick={handleEnrollStudents} />
        <Button
          label="Cancelar"
          styleVariant="secondary"
          onClick={closePopUp}
        />
      </div>
    </div>
  );
};
