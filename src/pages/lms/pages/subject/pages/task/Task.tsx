import "./task.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuthContext } from "../../../../../../contexts/AuthContext";
import { type Task } from "../../../../../../models/course/Task";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { UploadFiles } from "./components/upload-files/UploadFiles";
import { VerifyPermission } from "../../../../../../components/permission/VerifyPermission";
import { Button } from "../../../../../../components";
import { StatusLabel } from "../../../../../../components/tasks/status-label/StatusLabel";

export function Task() {
  const { id, taskId } = useParams();
  const { jwt } = useAuthContext();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [files, setFiles] = useState<Array<File>>([]);
  const [isDelivered, setIsDelivered] = useState(false);

  const handleSubmit = async () => {
    if (!taskId && files.length === 0) return;

    const filesToUpload = await uploadFiles();

    if (!filesToUpload || filesToUpload.length === 0) return;

    const response = await axios.post(
      `http://localhost:3000/task/${taskId}/submit`,
      filesToUpload,
      {
        headers: {
          Authorization: jwt,
          "Content-Type": "application/json",
        },
      }
    );

    setIsDelivered(response.status === 200);
  };

  const uploadFiles = async () => {
    if (!taskId || !id || !jwt) return;

    const uploadedFileIds = await Promise.all(
      files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(
          "http://localhost:3000/files/upload",
          formData,
          {
            headers: {
              Authorization: jwt,
            },
          }
        );

        return response.data.data.id;
      })
    );

    return uploadedFileIds;
  };

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
        console.error(error);
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
            <div className="task-first-section flex-row-between">
              <h1>{task.title}</h1>
              <VerifyPermission permission="SUBMIT_ASSIGNMENT">
                <StatusLabel setIsDelivered={setIsDelivered} taskId={taskId} />
              </VerifyPermission>
            </div>
            <p className="due-date-task-text">
              {(() => {
                const date = new Date(task.dueDate);
                return `${date.getDate()}/${
                  date.getMonth() + 1
                }/${date.getFullYear()}`;
              })()}
            </p>
          </div>
          <div
            className="task-description-text text-break"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(marked.parse(task.description)),
            }}
          />
          <div className="task-actions-section">
            <VerifyPermission permission="SUBMIT_ASSIGNMENT">
              <UploadFiles
                taskId={taskId ?? ""}
                files={files}
                setFiles={setFiles}
                handleUpload={handleSubmit}
                isDelivered={isDelivered}
                setIsDelivered={setIsDelivered}
              />
              <VerifyPermission permission="REVIEW_ASSIGNMENT">
                <Button label="Revisar entregas" />
              </VerifyPermission>
            </VerifyPermission>
          </div>
        </>
      )}
    </div>
  );
}
