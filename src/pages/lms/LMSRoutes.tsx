import { Route, Routes } from "react-router";
import GeneralLayout from "../../layouts/GeneralLayout";
import { SimpleHeader } from "../../components";
import { SubjectRoutes } from "./pages/subject/SubjectRoutes";
import { Subjects } from "./pages/subjects/Subjects";
import { VerifyAuthorization } from "../../components/permission/VerifyAuthorization";
import { ErrorPage } from "../errors/ErrorPage";

export const LMSRoutes = () => {
  return (
    <GeneralLayout header={<SimpleHeader title="LMS" />}>
      <Routes>
        <Route path="/subjects" element={<VerifyAuthorization authorization="SUBJECTS_PAGE"><Subjects /></VerifyAuthorization>} />
        <Route path="/subject/:id/*" element={<SubjectRoutes />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </GeneralLayout>
  );
};
