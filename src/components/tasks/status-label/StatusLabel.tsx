import { useEffect, useState } from "react";
import "./status-label.css";
import { useAuthContext } from "../../../contexts";
import axios from "axios";
import { Check, Clock, LucideIcon, X } from "lucide-react";

interface Props {
  taskId: string | undefined;
  setIsDelivered?: (value: boolean) => void;
}

export const StatusLabel = ({ setIsDelivered, taskId }: Props) => {
  const [taskStatus, setTaskStatus] = useState("");
  const { sessionData } = useAuthContext();
  const [Icon, setIcon] = useState<LucideIcon>(Clock);

  const textStatus = new Map<string, { status: string; icon: LucideIcon }>([
    [
      "submitted",
      {
        status: "Entregado",
        icon: Check,
      },
    ],
    [
      "not-submitted",
      {
        status: "Pendiente",
        icon: Clock,
      },
    ],
    [
      "expired",
      {
        status: "Expirado",
        icon: X,
      },
    ],
  ]);

  const handleStatus = async () => {
    if (!taskId || !sessionData) return;

    const response = await axios.get(
      `http://localhost:3000/task/status/${taskId}`,
      {
        withCredentials: true
      }
    );

    const status = response.data.data;
    setTaskStatus(status);
    if (setIsDelivered) setIsDelivered(status === "submitted");
  };

  useEffect(() => {
    handleStatus();
  }, [taskId, sessionData]);

  useEffect(() => {
    if (taskStatus) {
      setIcon(textStatus.get(taskStatus)?.icon ?? Clock);
    }
  }, [taskStatus]);

  return (
    <div
      className={`status-label-task-component flex-row-center ${taskStatus}`}
    >
      <Icon className="status-label-task-icon" />
      {textStatus.get(taskStatus)?.status}
    </div>
  );
};
