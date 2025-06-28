import { User } from "../../../models/user/User";
import { Check } from "../../checkboxes";
import { ProfileImage } from "../../images/profiles/profile-image/ProfileImage";
import "./user-card-select.css";

interface Props {
  user: User;
  isSelect: boolean;
  onClick: () => void;
}

export const UserCardSelect = ({ user, isSelect, onClick }: Props) => {
  return (
    <div className={`user-card-select-component ${isSelect ? "checked" : ""}`}>
      <div className="user-card-select-profile">
        <ProfileImage user={user} />
      </div>
      <div className="user-card-full-name">
        {`${user.lastNames} ${user.firstNames}`}
      </div>
      <Check isChecked={isSelect} changeChecked={onClick} />
    </div>
  );
};
