import { Route, Routes } from "react-router";
import { Courses } from "./pages/courses/Courses";
import GeneralLayout from "../../layouts/GeneralLayout";
import { SimpleHeader } from "../../components";
import { SubjectRoutes } from "./pages/subject/SubjectRoutes";

export const LMSRoutes = () => {
  return (
    <GeneralLayout header={<SimpleHeader title="LMS" />}>
      <Routes>
        <Route path="/courses" element={<Courses />} />
        <Route path="/subject/:id/*" element={<SubjectRoutes />} />
      </Routes>
    </GeneralLayout>
  );
};
