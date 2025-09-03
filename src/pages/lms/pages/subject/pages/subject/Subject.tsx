import { useParams } from "react-router";
import "./subject.css";
import axios from "axios";
import { useAuthContext } from "../../../../../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { Subject as SubjectType } from "../../../../../../models/course/Subject";
import { User } from "../../../../../../models/user/User";
import { Banner } from "./components/banner/Banner";
import { Announcement } from "./components/announcement/Announcement";
import { Announcement as announcementType } from "../../../../../../models/course/Announcement";
import { AnnouncementCard } from "./components/announcement-card/AnnouncementCard";
import { VerifyPermission } from "../../../../../../components/permission/VerifyPermission";
import { Button } from "../../../../../../components";
import { OtherAction } from "./components/other-actions/OtherActions";
import { usePopUpContext } from "../../../../../../contexts";
import { RegisterAttendanceSubjectPopUp } from "../../../../../../components/pop-ups/attendance-pop-up/register-attendance-subject-pop-up/RegisterAttendanceSubjectPopUp";

export function Subject() {
  const API_URL = "http://127.0.0.1:8000/api/";

  const { id } = useParams();
  const { sessionData } = useAuthContext();
  const { setPopUp } = usePopUpContext();

  const [subject, setSubject] = useState<SubjectType>();
  const [teacher, setTeacher] = useState<User>();
  const [announcements, setAnnouncements] = useState<Array<announcementType>>(
    []
  );

  const getSubject = async () => {
    if (!id || !sessionData) return;
    const response = await axios.get(`${API_URL}courses/subjects/by?column=id&value=${id}`, {
      withCredentials: true,
    });

    setSubject(response.data);
  };

  const getTeacherInfo = async () => {
    if (!subject) return;

    const response = await axios.get(
      `${API_URL}users/by?column=id&value=${subject.teacherId}`,
      {
        withCredentials: true,
      }
    );

    setTeacher(response.data.data);
  };

  const getAnnouncements = async () => {
    if (!id || !sessionData) return;
    const response = await axios.get(
      `http://localhost:3000/announcements?subjectId=${id}`,
      {
        withCredentials: true,
      }
    );

    setAnnouncements(response.data);
  };

  useEffect(() => {
    getSubject();
    getAnnouncements();
  }, [id, sessionData]);

  useEffect(() => {
    getTeacherInfo();
  }, [sessionData, subject]);

  return (
    <div className="lms-subject-page">
      <div className="more-actions-section flex-column">
        <OtherAction title="Asistencia">
          <Button
            label="Tomar asistencia"
            onClick={() =>
              setPopUp(<RegisterAttendanceSubjectPopUp id={id ?? ""} />)
            }
          />
        </OtherAction>
        <OtherAction title="Horario">
          <p>8:00 - 9:30</p>
        </OtherAction>
      </div>
      <div className="subject-principal-section">
        <Banner teacher={teacher} subject={subject} />
        <VerifyPermission permission="PUBLISH_ANNOUNCEMENTS">
          <Announcement />
        </VerifyPermission>
        <div className="announcements-section">
          {announcements && announcements.length > 0 ? (
            announcements.map((announcement) => {
              return (
                <AnnouncementCard
                  key={announcement.id}
                  announcement={announcement}
                />
              );
            })
          ) : (
            <p className="announcement-not-found-text">Anuncios vacíos</p>
          )}
        </div>
      </div>
    </div>
  );
}
