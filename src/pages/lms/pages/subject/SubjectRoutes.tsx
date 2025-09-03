import { Route, Routes, useNavigate, useParams } from "react-router";
import { Subject } from "./pages/subject/Subject";
import { Tab } from "../../../../models/tabs/Tab";
import { Tabs } from "../../../../components/tabs/Tabs";
import { Tasks } from "./pages/tasks/Tasks";
import { Task } from "./pages/task/Task";
import { Users } from "./pages/users/Users";
import { useAuthContext } from "../../../../contexts";
import axios from "axios";
import { useEffect } from "react";
import { ErrorPage } from "../../../errors/ErrorPage";

export const SubjectRoutes = () => {
  const API_URL = "http://127.0.0.1:8000/api/"

  const { id } = useParams();
  const { sessionData } = useAuthContext();
  const navigate = useNavigate();

  const tabs: Array<Tab> = [
    { label: "General", path: `/lms/subject/${id}` },
    { label: "Tareas", path: `/lms/subject/${id}/tasks` },
    { label: "Estudiantes", path: `/lms/subject/${id}/users` },
  ];

  const getSubject = async () => {
    if (!id || !sessionData) return;

    try {
      await axios.get(`${API_URL}subjects/by?column=id&value=${id}`, {
        withCredentials: true
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        navigate("/error", { state: { code: 404 } });
      } else {
        console.error("Error al obtener la materia:", error);
      }
    }
  };

  useEffect(() => {
    getSubject();
  }, [id, sessionData]);

  return (
    <>
      <Tabs tabs={tabs} />
      <Routes>
        <Route path="/" element={<Subject />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/users" element={<Users />} />
        <Route path="/task/:taskId" element={<Task />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};
