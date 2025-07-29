import "./task-card.css";
import { Task } from "../../../models/course/Task";
import { useNavigate, useParams } from "react-router";
import { usePopUpContext } from "../../../contexts/PopUpContext";
import { FailedPopUp } from "../../pop-ups/failed-pop-up/FailedPopUp";
import { BookText } from "lucide-react";
import { useEffect, useState } from "react";
import { VerifyPermission } from "../../permission/VerifyPermission";
import { StatusLabel } from "../status-label/StatusLabel";

interface Props {
  task: Task;
}

export const TaskCard = ({ task }: Props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setPopUp } = usePopUpContext();

  const [dueDate, setDueDate] = useState("");

  const goToTask = () => {
    if (!id) {
      setPopUp(
        <FailedPopUp message="Hubo un error durante la ejecución, inténtalo más tarde" />
      );
    }

    navigate(`/lms/subject/${id}/task/${task.id}`);
  };

  const handleDueDate = () => {
    if (!task) return;

    const date = new Date(task.dueDate);
    const today = new Date();

    date.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    setDueDate(
      `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    );
  };

  useEffect(() => {
    handleDueDate();
  }, [task]);

  return (
    <button className="task-card-container flex-row-between" onClick={goToTask}>
      <div className="task-card-info">
        <div className="task-card-icon flex-column-center">
          <BookText />
        </div>
        <h3 className="task-card-title complete-left">{task.title}</h3>
        <p className="task-card-due-date complete-left">{dueDate}</p>
      </div>
      <VerifyPermission permission="SUBMIT_ASSIGNMENT">
        <StatusLabel taskId={task.id} />
      </VerifyPermission>
    </button>
  );
};
