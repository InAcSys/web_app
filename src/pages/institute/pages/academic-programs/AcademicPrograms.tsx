import { useEffect, useState } from "react";
import { Button, Dropdown, NumberInput } from "../../../../components";
import { VerifyPermission } from "../../../../components/permission/VerifyPermission";
import { useAuthContext, usePopUpContext } from "../../../../contexts";
import "./academic-programs.css";
import { AcademicProgram } from "../../../../models/course/AcademicProgram";
import axios from "axios";
import { AcademicProgramCard } from "../../../../components/courses/academic-program-card/AcademicProgramCard";
import { CreateAcademicProgramPopUp } from "../../../../components/pop-ups/course-pop-up/create-academic-program-pop-up/CreateAcademicProgramPopUp";

export function AcademicPrograms() {
  const API_URL = "http://127.0.0.1:8000/api/";

  const { sessionData } = useAuthContext();
  const { setPopUp } = usePopUpContext();

  const numberItems = ["10", "20", "50", "100"];
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [selectPageSize, setSelectPageSize] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [programs, setPrograms] = useState<Array<AcademicProgram>>()

  const handleAddProgram = () => setPopUp(<CreateAcademicProgramPopUp />);

  const getPrograms = async () => {
    if (!sessionData) return;
    const response = await axios.get(
      `${API_URL}courses/programs?page=${pageNumber}&size=${pageSize}&filters[tenant_id]=${sessionData.user.tenant_id}`,
      {
        withCredentials: true,
      }
    );

    console.log(response.data.data)
    const data = response.data;
    return {
        items: data.data,
        pageNumber: data.current_page,
        pageSize: data.per_page,
        total: data.total,
      };
  };

  const fetchPrograms = async () => {
    let result = await getPrograms();
    if (result) {
      setPrograms(result.items);
      setPageNumber(result.pageNumber);
      setPageSize(result.pageSize);
      setTotalPages(result.total);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, [sessionData, pageNumber, pageSize]);

  return (
    <div className="academic-programs-page page">
      <div className="academic-programs-tools-section flex-row-center-end">
        <VerifyPermission permission="CREATE_ACADEMIC_PROGRAMS">
          <Button label="Añadir programa" onClick={handleAddProgram} />
        </VerifyPermission>
      </div>
      <div className="academic-levels-container flex-column">
        {programs && programs.length > 0 ? (
          programs.map((program) => (
            <AcademicProgramCard key={program.id} program={program} />
          ))
        ) : (
          <p>No hay programas academicos</p>
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
