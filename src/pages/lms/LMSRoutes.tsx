import { Route, Routes } from "react-router";
import { Courses } from "./pages/Courses";
import GeneralLayout from "../../layouts/GeneralLayout";
import { SimpleHeader } from "../../components";

export const LMSRoutes = () => {
  return (
    <GeneralLayout header={<SimpleHeader title="LMS" />}>
      <Routes>
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </GeneralLayout>
  );
};
