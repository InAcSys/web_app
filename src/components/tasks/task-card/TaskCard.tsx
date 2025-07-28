import "./task-card.css";
import { Task } from "../../../models/course/Task";
import { useNavigate, useParams } from "react-router";
import { usePopUpContext } from "../../../contexts/PopUpContext";
import { FailedPopUp } from "../../pop-ups/failed-pop-up/FailedPopUp";
import { BookText, Check, X } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { VerifyPermission } from "../../permission/VerifyPermission";

interface Props {
  task: Task;
}

export const TaskCard = ({ task }: Props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setPopUp } = usePopUpContext();

  const [taskStatus, setTaskStatus] = useState("");
  const [dueDate, setDueDate] = useState("");

  const status = new Map<string, ReactNode>([
    [
      "expired",
      <>
        <X /> Expirado
      </>,
    ],
    [
      "delivered",
      <>
        <Check /> Entregado
      </>,
    ],
  ]);

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

    setTaskStatus(date < today ? "expired" : "");

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
        <div className={`task-card-icon flex-column-center ${taskStatus}`}>
          <BookText />
        </div>
        <h3 className={`task-card-title complete-left ${taskStatus}`}>
          {task.title}
        </h3>
        <p className="task-card-due-date complete-left">{dueDate}</p>
      </div>
      <VerifyPermission permission="SUBMIT_ASSIGNMENT">
        <div className="task-card-time">
        <p
          className={`task-card-time-description flex-row-center ${taskStatus}`}
        >
          {status.get(taskStatus)}
        </p>
      </div>
      </VerifyPermission>
    </button>
  );
};
