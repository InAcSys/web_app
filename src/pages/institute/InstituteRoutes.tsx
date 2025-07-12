import { Route, Routes } from "react-router";
import { Institute } from "./pages/institute/Institute";
import GeneralLayout from "../../layouts/GeneralLayout";
import { SimpleHeader } from "../../components";
import { AcademicLevels } from "./pages/academic-levels/AcademicLevels";

export function InstituteRoutes() {
  return (
    <GeneralLayout header={<SimpleHeader title="Instituto" />}>
      <Routes>
        <Route path="/" element={<Institute />} />
        <Route path="/academic-levels" element={<AcademicLevels />} />
      </Routes>
    </GeneralLayout>
  );
}
