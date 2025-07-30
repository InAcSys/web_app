import "./profile.css";
import { useEffect, useState } from "react";
import { SimpleHeader } from "../../components/pages/headers/simple-header/SimpleHeader";
import { useAuthContext } from "../../contexts";
import GeneralLayout from "../../layouts/GeneralLayout";
import { UploadProfile } from "../../components/images/profiles/upload-profile/UploadProfile";
import { Button, CalendarInput, Input } from "../../components";
import dayjs from "dayjs";

export default function Profile() {
  const { sessionData } = useAuthContext();

  const [image, setImage] = useState("");
  const [imageToUpload, setImageToUpluad] = useState<File>();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [shortname, setShortname] = useState("");
  const [isEdited, setIsEdited] = useState(false);
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState<Date>();

  const currentDate = new Date();
  const [minimumYear] = useState(currentDate.getFullYear() - 100);
  const [maximumYear] = useState(currentDate.getFullYear() - 3);

  useEffect(() => {
    if (!sessionData) return;

    const user = sessionData.user;

    setImage(user.imageUrl ?? "");
    setFirstname(user.firstNames ?? "");
    setLastname(user.lastNames ?? "");
    setShortname(user.shortName ?? "");
    setEmail(user.email ?? "");

    setBirthDate(dayjs(user.birthDate).toDate());
  }, [sessionData]);

  useEffect(() => {
    if (!sessionData) return;
    const data = sessionData.user;
    if (!data || !birthDate) return;

    const sameShortName = data.shortName === shortname;

    const sameBirthDate = dayjs(data.birthDate)
      .startOf("day")
      .isSame(dayjs(birthDate).startOf("day"));

    setIsEdited(!(sameShortName && sameBirthDate));
  }, [shortname, birthDate, sessionData]);

  return (
    <GeneralLayout header={<SimpleHeader title="Perfil" />}>
      <div className="profile-section">
        <div className="profile-image-section flex-row-center">
          <UploadProfile imageUrl={image} setImageToUpload={setImageToUpluad} />
        </div>
        <div className="profile-info-section">
          <Input
            label="Nombres"
            value={firstname}
            onChange={setFirstname}
            disabled
          />
          <Input
            label="Apellidos"
            value={lastname}
            onChange={setLastname}
            disabled
          />
          <Input
            label="Nombre corto"
            value={shortname}
            onChange={setShortname}
          />
          <Input
            label="Correo electronico"
            value={email}
            onChange={setEmail}
            disabled
          />
          <CalendarInput
            label="Fecha de nacimiento"
            date={birthDate}
            setDate={setBirthDate}
            minimunYear={minimumYear}
            maximunYear={maximumYear}
          />
        </div>
        <div className="action-buttons-section flex-row-between">
          <div className={`profile-buttons-section`}>
            <div
              className={`profile-edited-buttons-section ${
                isEdited ? "edited" : ""
              }`}
            >
              <Button label="Guardar cambios" />
              <Button label="Cancelar" styleVariant="secondary" />
            </div>
          </div>
          <Button label="Cambiar contraseña" styleVariant="action" />
        </div>
      </div>
    </GeneralLayout>
  );
}
