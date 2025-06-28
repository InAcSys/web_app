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
}

type UUID = string;

export const EnrollStudentsPopUp = ({ subjectId }: Props) => {
  const { jwt } = useAuthContext();
  const { closePopUp, setPopUp } = usePopUpContext();

  const [selectStudents, setSelectStudents] = useState<User[]>([]);
  const [students, setStudents] = useState<User[]>([]);
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
        const data = response.data;
        setStudents(data);
        setShowStudents(data);
      } catch (error) {
        console.error("Error al obtener estudiantes:", error);
      }
    }
  };

  const handleAddStudents = (student: User) => {
    if (selectStudents.find((s) => s.id === student.id)) return;

    setSelectStudents([...selectStudents, student]);
    setShowStudents(showStudents.filter((s) => s.id !== student.id));
  };

  const handleRemoveStudents = (student: User) => {
    setSelectStudents(selectStudents.filter((s) => s.id !== student.id));
    setShowStudents([...showStudents, student]);
  };

  const handleEnrollStudents = async () => {
    if (!subjectId || !jwt) return;

    if (selectStudents.length === 0) return;

    const studentIds: UUID[] = selectStudents.map((student) => {
      return student.id;
    });
    const response = await axios.post(
      `http://localhost:3000/subject/enroll?subjectId=${subjectId}`,
      studentIds,
      {
        headers: {
          Authorization: jwt,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);
    if (response.data.status === 201 || response.data.status === 200) {
      setPopUp(
        <SuccessPopUp message="Matriculación realizada correctamente." />
      );
    } else {
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
      <div className="enroll-students-pop-up-actions">
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
