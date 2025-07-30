import { useState, useRef, ChangeEvent, DragEvent, useEffect } from "react";
import "./upload-profile.css";
import { ImageUp } from "lucide-react";

interface Props {
  imageUrl?: string;
  setImageToUpload?: (value: File) => void;
}

export const UploadProfile = ({ imageUrl, setImageToUpload }: Props) => {
  const [image, setImage] = useState<File | string>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  const handleDragOver = (e: DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) setImage(file);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    if (imageUrl) setImage(imageUrl);
  }, [imageUrl]);

  useEffect(() => {
    if (image instanceof File && setImageToUpload) setImageToUpload(image);
  }, [image]);

  return (
    <div className="upload-profile-component">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={inputRef}
        style={{ display: "none" }}
      />
      <button
        className="upload-profile-section flex-column-center"
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {image ? (
          <img
            src={image instanceof File ? URL.createObjectURL(image) : image}
            alt="Imagen de perfil"
            className="upload-profile-image"
          />
        ) : (
          <div className="upload-profile-image-section">
            <ImageUp className="upload-profile-image-section-icon" />
            <p>Haz clic para subir o arrástralo aquí.</p>
          </div>
        )}
      </button>
    </div>
  );
};
