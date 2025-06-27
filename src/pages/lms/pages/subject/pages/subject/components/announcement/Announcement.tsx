import { useState } from "react";
import {
  Button,
  FailedPopUp,
  SuccessPopUp,
} from "../../../../../../../../components";
import "./announcement.css";
import { useParams } from "react-router";
import {
  useAuthContext,
  usePopUpContext,
} from "../../../../../../../../contexts";
import axios from "axios";

export const Announcement = () => {
  const { id } = useParams();
  const { jwt } = useAuthContext();
  const { setPopUp } = usePopUpContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateAnnouncement = async () => {
    if (!title || !description) return;

    const announcement = {
      title,
      description,
    };

    const response = await axios.post(
      `http://localhost:3000/announcement?subjectId=${id}`,
      announcement,
      {
        headers: {
          Authorization: jwt,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201 || response.status === 200) {
      setPopUp(
        <SuccessPopUp message="Se publicó el anuncio de manera satisfactoria." />
      );
    } else {
      setPopUp(
        <FailedPopUp message="No se pudo publicar el anuncio, inténtelo nuevamente." />
      );
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
  };

  return (
    <div className="announcement-component">
      <div className="announcement-text-section">
        <input
          type="text"
          name="announcement-title"
          id="announcement-title"
          className="announcement-title"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name="announcement-description"
          id="announcement-description"
          className="announcement-description"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="announcement-actions-section flex-row-between">
        <div className="more-actions-section"></div>
        <div className="announcement-buttons-section flex-row-center">
          <Button label="Publicar" onClick={handleCreateAnnouncement} />
          <Button
            label="Cancelar"
            styleVariant="secondary"
            onClick={handleCancel}
          />
        </div>
      </div>
    </div>
  );
};
