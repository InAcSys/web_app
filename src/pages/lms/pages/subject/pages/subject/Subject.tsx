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

export function Subject() {
  const { id } = useParams();
  const { jwt } = useAuthContext();

  const [subject, setSubject] = useState<SubjectType>();
  const [teacher, setTeacher] = useState<User>();
  const [announcements, setAnnouncements] = useState<Array<announcementType>>(
    []
  );

  const getSubject = async () => {
    if (!id || !jwt) return;
    const response = await axios.get(`http://localhost:3000/subject/${id}`, {
      headers: {
        Authorization: jwt,
      },
    });

    setSubject(response.data);
  };

  const getTeacherInfo = async () => {
    if (!subject) return;

    const response = await axios.get(
      `http://localhost:3000/user/${subject.teacherId}`,
      {
        headers: {
          Authorization: jwt,
        },
      }
    );

    setTeacher(response.data.data);
  };

  const getAnnouncements = async () => {
    if (!id || !jwt) return;
    const response = await axios.get(
      `http://localhost:3000/announcements?subjectId=${id}`,
      {
        headers: {
          Authorization: jwt,
        },
      }
    );

    setAnnouncements(response.data);
  };

  useEffect(() => {
    getSubject();
    getAnnouncements();
  }, [id, jwt]);

  useEffect(() => {
    getTeacherInfo();
  }, [jwt, subject]);

  return (
    <div className="lms-subject-page">
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
  );
}
