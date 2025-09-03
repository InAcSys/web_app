import { Route, Routes } from "react-router";
import { Institute } from "./pages/institute/Institute";
import GeneralLayout from "../../layouts/GeneralLayout";
import { SimpleHeader } from "../../components";
import { AcademicLevels } from "./pages/academic-levels/AcademicLevels";
import { AcademicPrograms } from "./pages/academic-programs/AcademicPrograms";

export function InstituteRoutes() {
  return (
    <GeneralLayout header={<SimpleHeader title="Instituto" />}>
      <Routes>
        <Route path="/" element={<Institute />} />
        <Route path="/academic-levels" element={<AcademicLevels />} />
        <Route path="/academic-programs" element={<AcademicPrograms />} />
      </Routes>
    </GeneralLayout>
  );
}
