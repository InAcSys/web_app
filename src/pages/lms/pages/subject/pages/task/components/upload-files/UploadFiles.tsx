import { useEffect, useRef } from "react";
import { Paperclip } from "lucide-react";
import "./upload-files.css";
import { Button } from "../../../../../../../../components";
import { FileViewer } from "../file-viewer/FileViewer";
import axios from "axios";
import { useAuthContext } from "../../../../../../../../contexts";

interface Props {
  taskId: string;
  files: Array<File>;
  setFiles: (files: Array<File>) => void;
  handleUpload: () => void;
  isDelivered: boolean;
  setIsDelivered: (value: boolean) => void;
}

const MAX_FILES = 10;
const MAX_SIZE_MB = 50;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

export const UploadFiles = ({
  taskId,
  files,
  setFiles,
  handleUpload,
  isDelivered,
  setIsDelivered,
}: Props) => {
  const { jwt } = useAuthContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const getContent = async () => {
    if (!isDelivered || !taskId || !jwt) return;

    try {
      const response = await axios.get(
        `http://localhost:3000/task/submitted/${taskId}`,
        {
          headers: {
            Authorization: jwt,
          },
        }
      );

      const contents = response.data.data.contents;

      if (contents && contents.length > 0) {
        const deliveredFiles = await Promise.all(
          contents.map(async (content: string) => {
            const infoRes = await axios.get(
              `http://localhost:3000/files/view/${content}`,
              {
                headers: {
                  Authorization: jwt,
                },
              }
            );

            const fileName = infoRes.data.data.fileName ?? "unknown file.sp360";

            const res = await axios.get(
              `http://localhost:3000/files/download/${content}`,
              {
                headers: {
                  Authorization: jwt,
                },
                responseType: "blob",
              }
            );

            const blob = res.data;
            return new File([blob], fileName, { type: blob.type });
          })
        );

        setFiles(deliveredFiles);
      }
    } catch (error) {
      console.error("Error al obtener archivos:", error);
    }
  };

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleUploadFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);

    const newFiles: File[] = [];
    for (const file of selectedFiles) {
      if (files.some((f) => f.name === file.name)) continue;
      if (file.size > MAX_SIZE_BYTES) {
        alert(`El archivo "${file.name}" supera los ${MAX_SIZE_MB} MB.`);
        continue;
      }
      newFiles.push(file);
    }

    const totalFiles = files.length + newFiles.length;
    if (totalFiles > MAX_FILES) {
      alert(
        `Solo se permiten máximo ${MAX_FILES} archivos. Ya seleccionaste ${files.length}.`
      );
      return;
    }

    setFiles([...files, ...newFiles]);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setIsDelivered(false);
  };

  const removeFileByName = (fileName: string) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  useEffect(() => {
    getContent();
  }, [taskId, isDelivered, jwt]);

  return (
    <div className="upload-files-task-component">
      <div className="upload-files-viewer-section flex-column-center">
        {files.length > 0 &&
          files.map((file) => (
            <FileViewer
              key={`file-viewer-${file.name}`}
              file={file}
              removeFileByName={removeFileByName}
              isDelivered={isDelivered}
            />
          ))}
      </div>
      <div className="upload-files-actions-section flex-row-center-start">
        <input
          type="file"
          multiple
          ref={inputRef}
          style={{ display: "none" }}
          onChange={handleUploadFiles}
        />
        <button
          className="upload-files-attach-files flex-row-center"
          onClick={handleUploadClick}
        >
          <Paperclip /> Adjuntar
        </button>
        <Button label="Entregar" onClick={handleUpload} />
      </div>
    </div>
  );
};
