import { User } from "../../../../models/user/User";
import { DefaultProfile } from "../default/DefaultProfile";
import "./profile-image.css";

interface Props {
  user: User;
}

export const ProfileImage = ({ user }: Props) => {
  return (
    <div className="profile-image-component">
      {user && user.imageUrl ? (
        <img src={user.imageUrl} alt="Profile user" className="profile-image" />
      ) : (
        <DefaultProfile shortName={user.shortName} />
      )}
    </div>
  );
};
