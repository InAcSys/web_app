import { useEffect, useState } from "react";
import { Button, Dropdown, NumberInput } from "../../../../components";
import { VerifyPermission } from "../../../../components/permission/VerifyPermission";
import { useAuthContext, usePopUpContext } from "../../../../contexts";
import "./academic-levels.css";
import axios from "axios";
import { AcademicLevel } from "../../../../models/course/AcademicLevel";
import { AcademicLevelCard } from "../../../../components/courses/academic-level-card/AcademicLevelCard";
import { CreateAcademicLevelPopUp } from "../../../../components/pop-ups/course-pop-up/create-academic-level-pop-up/CreateAcademicLevelPopUp";

export function AcademicLevels() {
  const { jwt } = useAuthContext();
  const { setPopUp } = usePopUpContext();

  const numberItems = ["12", "24", "60", "120"];
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [selectPageSize, setSelectPageSize] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [levels, setLevels] = useState<Array<AcademicLevel>>([]);

  const handleAddLevel = () => setPopUp(<CreateAcademicLevelPopUp />);

  const getLevels = async () => {
    if (!jwt) return;
    const response = await axios.get(
      `http://localhost:3000/academic-levels?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: jwt,
        },
      }
    );
    const data = response.data.data;
    return data;
  };

  const fetchLevels = async () => {
    let result = await getLevels();
    if (result) {
      setLevels(result.items);
      setPageNumber(result.pageNumber);
      setPageSize(result.pageSize);
      setTotalPages(result.totalPages);
    }
  };

  useEffect(() => {
    fetchLevels();
  }, [jwt, pageNumber, pageSize]);

  return (
    <div className="academic-levels-page page">
      <div className="academic-leves-tools-section flex-row-center-end">
        <VerifyPermission permission="CREATE_ACADEMIC_LEVELS">
          <Button label="Añadir nivel" onClick={handleAddLevel} />
        </VerifyPermission>
      </div>
      <div className="academic-levels-container flex-column">
        {levels && levels.length > 0 ? (
          levels.map((level) => (
            <AcademicLevelCard key={level.id} level={level} />
          ))
        ) : (
          <p>No hay niveles academicos</p>
        )}
      </div>
      <div className="academic-levels-pagination-section flex-row-center-end">
        <div className="academic-levels-pagination-page-selector-section flex-row-center">
          <NumberInput
            value={pageNumber}
            setValue={setPageNumber}
            min={1}
            max={totalPages}
          />
          <p className="academic-levels-pagination-page-selector-text">
            de <b>{totalPages}</b> páginas de
          </p>
        </div>
        <Dropdown
          optionSelected={selectPageSize}
          changeOptionSelected={setSelectPageSize}
          options={numberItems}
          errorIsVisible={false}
        />
        <p className="academic-levels-pagination-page-selector-text">
          usuarios
        </p>
      </div>
    </div>
  );
}
