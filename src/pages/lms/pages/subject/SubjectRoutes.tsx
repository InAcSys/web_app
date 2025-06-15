import { Route, Routes, useParams } from "react-router";
import { Subject } from "./pages/subject/Subject";
import { Tab } from "../../../../models/tabs/Tab";
import { Tabs } from "../../../../components/tabs/Tabs";
import { Tasks } from "./pages/tasks/Tasks";

export const SubjectRoutes = () => {
  const {id} = useParams()

  const tabs: Array<Tab> = [
    { label: "General", path: `/lms/subject/${id}` },
    { label: "Tareas", path: `/lms/subject/${id}/tasks` },
    { label: "Usuarios", path: `/lms/subject/${id}/users` },
  ];

  return (
    <>
      <Tabs tabs={tabs} />
      <Routes>
        <Route path="/" element={<Subject />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/users" element={<p>Usuarios</p>} />
      </Routes>
    </>
  );
};
