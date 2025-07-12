import "./task.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuthContext } from "../../../../../../contexts/AuthContext";
import { type Task } from "../../../../../../models/course/Task";

export function Task() {
  const { id, taskId } = useParams();
  const { jwt } = useAuthContext();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);

  const getTask = async () => {
    if (!taskId || !id || !jwt) return;

    try {
      const response = await axios.get(
        `http://localhost:3000/task/${taskId}?subjectId=${id}`,
        {
          headers: {
            Authorization: jwt,
          },
        }
      );
      setTask(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        navigate("/error", { state: { code: 404 } });
      } else {
        console.error("Error al obtener la tarea:", error);
      }
    }
  };

  useEffect(() => {
    getTask();
  }, [taskId, id, jwt]);

  return (
    <div className="task-page">
      {task && (
        <>
          <div className="task-header-information">
            <h1>{task.title}</h1>
            <p className="due-date-task-text">
              {(() => {
                const date = new Date(task.dueDate);
                return `${date.getDate()}/${
                  date.getMonth() + 1
                }/${date.getFullYear()}`;
              })()}
            </p>
          </div>
          <p className="task-description-text">{task.description}</p>
        </>
      )}
    </div>
  );
}
