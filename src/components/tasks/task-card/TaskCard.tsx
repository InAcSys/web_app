import "./task-card.css"
import { Task } from "../../../models/course/Task";

interface Props {
  task: Task;
}

export const TaskCard = ({ task }: Props) => {
  return (
    <div className="task-card-container flex-row-between">
      <h3 className="task-card-title">{task.title}</h3>
      <p className="task-card-due-date">
        {(() => {
          const date = new Date(task.dueDate);
          return `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`;
        })()}
      </p>
    </div>
  );
};
