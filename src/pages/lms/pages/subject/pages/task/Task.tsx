import "./task.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuthContext } from "../../../../../../contexts/AuthContext";
import { type Task } from "../../../../../../models/course/Task";

export function Task() {
  const { id, taskId } = useParams();
  const { jwt } = useAuthContext();
  const [task, setTask] = useState<Task | null>(null);

  const getTaskInfo = async () => {
    const response = await axios.get(
      `http://localhost:3000/task/${taskId}?subjectId=${id}`,
      {
        headers: {
          Authorization: jwt,
        },
      }
    );

    setTask(response.data);
  };

  useEffect(() => {
    console.log(id);
  }, [id]);

  useEffect(() => {
    console.log(taskId);
  }, [taskId]);

  useEffect(() => {
    getTaskInfo();
  }, [jwt, id, taskId]);

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
