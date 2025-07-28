import { useRef } from "react";
import { Paperclip } from "lucide-react";
import "./upload-files.css";
import { Button } from "../../../../../../../../components";
import { FileViewer } from "../file-viewer/FileViewer";

interface Props {
  files: Array<File>;
  setFiles: (files: Array<File>) => void;
  handleUpload: () => void;
}

const MAX_FILES = 10;
const MAX_SIZE_MB = 50;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

export const UploadFiles = ({ files, setFiles, handleUpload }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

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
  };

  const removeFileByName = (fileName: string) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  return (
    <div className="upload-files-task-component">
      <div className="upload-files-viewer-section flex-column-center">
        {files.length > 0 &&
          files.map((file) => (
            <FileViewer
              key={`file-viewer-${file.name}`}
              file={file}
              removeFileByName={removeFileByName}
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
