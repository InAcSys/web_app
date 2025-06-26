import "./task-card.css";
import { Task } from "../../../models/course/Task";
import { useNavigate, useParams } from "react-router";
import { usePopUpContext } from "../../../contexts/PopUpContext";
import { FailedPopUp } from "../../pop-ups/failed-pop-up/FailedPopUp";

interface Props {
  task: Task;
}

export const TaskCard = ({ task }: Props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setPopUp } = usePopUpContext();

  const goToTask = () => {
    if (!id) {
      setPopUp(
        <FailedPopUp message="Hubo un error durante la ejecución, inténtalo más tarde" />
      );
    }

    navigate(`/lms/subject/${id}/task/${task.id}`);
  };

  return (
    <button className="task-card-container flex-row-between" onClick={goToTask}>
      <h3 className="task-card-title">{task.title}</h3>
      <p className="task-card-due-date">
        {(() => {
          const date = new Date(task.dueDate);
          return `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`;
        })()}
      </p>
    </button>
  );
};
