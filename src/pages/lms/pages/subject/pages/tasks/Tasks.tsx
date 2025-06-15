import { useEffect, useState } from "react";
import { Button } from "../../../../../../components";
import { Task } from "../../../../../../models/course/Task";
import { TaskCard } from "../../../../../../components/tasks/task-card/TaskCard";
import axios from "axios";
import { useParams } from "react-router";
import { useAuthContext } from "../../../../../../contexts/AuthContext";
import { usePopUpContext } from "../../../../../../contexts/PopUpContext";
import { CreateTaskPopUp } from "../../../../../../components/pop-ups/course-pop-up/create-task-pop-up/CreateTaskPopUp";
import "./task.css"

export function Tasks() {
  const { id } = useParams();
  const { jwt } = useAuthContext();
  const { setPopUp } = usePopUpContext();

  const [tasks, setTasks] = useState<Array<Task>>([]);

  const getTasks = async () => {
    const response = await axios.get(
      `http://localhost:3000/tasks/course/${id}`,
      {
        headers: {
          Authorization: jwt,
        },
      }
    );
    console.log(response.data);

    setTasks(response.data);
  };

  const handleCreateTask = () => {
    setPopUp(<CreateTaskPopUp id={id} />);
  };

  useEffect(() => {
    getTasks();
  }, [id, jwt]);

  return (
    <div className="tasks-page">
      <div className="tasks-header flex-row-between">
        <h2 className="tasks-title">Tareas</h2>
        <Button label="Crear una nueva tarea" onClick={handleCreateTask} />
      </div>
      <div className="tasks-section flex-column">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => {
            return <TaskCard key={task.id} task={task} />;
          })
        ) : (
          <p className="tasks-error">No se encontraron tareas</p>
        )}
      </div>
    </div>
  );
}
