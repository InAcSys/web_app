import { useEffect, useState } from "react";
import { Announcement } from "../../../../../../../../models/course/Announcement";
import "./announcement-card.css";
import { User } from "../../../../../../../../models/user/User";
import axios from "axios";
import { useAuthContext } from "../../../../../../../../contexts";
import { ProfileImage } from "../../../../../../../../components/images/profiles/profile-image/ProfileImage";

interface Props {
  announcement: Announcement;
}

export const AnnouncementCard = ({ announcement }: Props) => {
  const { jwt } = useAuthContext();
  const [author, setAuthor] = useState<User>();

  const getAuthorInfo = async () => {
    if (!jwt) return;
    const user = await axios.get(
      `http://localhost:3000/user/${announcement.authorId}`,
      {
        headers: {
          Authorization: jwt,
        },
      }
    );
    setAuthor(user.data.data);
  };

  useEffect(() => {
    getAuthorInfo();
  }, [jwt]);

  return (
    <div className="announcement-card-component">
      <div className="announcement-author-info-section">
        <div className="announcement-author-profile">
          {author && <ProfileImage user={author} />}
        </div>
        <h4 className="announcement-author-name">
          {author?.shortName ?? "Anonimo"}
        </h4>
        <p className="announcement-publish-date">
          {(() => {
            const rawDate = announcement.updated || announcement.created;
            const date = new Date(rawDate);
            return `${date.getDate()}/${
              date.getMonth() + 1
            }/${date.getFullYear()}`;
          })()}
        </p>
      </div>
      <div className="announcement-publish-info-section flex-column-center">
        <h3 className="announcement-title-text complete-left">{announcement.title}</h3>
        <p className="announcement-description-text complete-left">
          {announcement.description}
        </p>
      </div>
    </div>
  );
};
