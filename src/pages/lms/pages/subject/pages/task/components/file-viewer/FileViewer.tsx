import { useEffect, useState } from "react";
import "./file-viewer.css";
import { FileIcon } from "react-file-icon";
import { Trash } from "lucide-react";

interface Props {
  file: File;
  removeFileByName: (fileName: string) => void;
  isDelivered: boolean;
}

export const FileViewer = ({ file, removeFileByName, isDelivered }: Props) => {
  const [icon, setIcon] = useState("");

  useEffect(() => {
    const extension = file.name.split(".").pop()?.toLocaleLowerCase();
    if (!extension) return;
    setIcon(extension);
  }, [file]);

  return (
    <div className="file-viewer-component flex-row-between">
      <div className="file-viewer-info-section flex-row-center">
        <div className="file-viewer-icon">
          <FileIcon extension={icon} />
        </div>
        <p className="file-viewer-name">{file.name}</p>
      </div>
      <div className="file-viewer-actions-section">
        {!isDelivered && (
          <button
            className="file-viewer-delete-file flex-row-center"
            onClick={() => removeFileByName(file.name)}
          >
            <Trash />
          </button>
        )}
      </div>
    </div>
  );
};
