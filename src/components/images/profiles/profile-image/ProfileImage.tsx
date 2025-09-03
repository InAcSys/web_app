import { User } from "../../../../models/user/User";
import { DefaultProfile } from "../default/DefaultProfile";
import "./profile-image.css";

interface Props {
  user: User;
}

export const ProfileImage = ({ user }: Props) => {
  return (
    <div className="profile-image-component">
      {user && user.image_url ? (
        <img src={user.image_url} alt="Profile user" className="profile-image" />
      ) : (
        <DefaultProfile shortName={user.shortname} />
      )}
    </div>
  );
};
