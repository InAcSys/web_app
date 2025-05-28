import { useNavigate } from "react-router";
import { User } from "../../../models/user/User";
import { DefaultProfile } from "../../images/profiles/default/DefaultProfile";
import "./user-card.css";
import { ChartPie, EllipsisVertical, Pencil, Trash2 } from "lucide-react";

interface Props {
  user: User;
}

export const UserCard = ({ user }: Props) => {
  const navigate = useNavigate();

  const handleGoToProfile = () => {
    navigate(`/users/profile/${user.id}`);
  };

  return (
    <div className="user-card-container">
      <div className="user-card-info-section">
        <div className="user-card-image-section">
          {user.imageUrl ? (
            <img
              src={user.imageUrl}
              alt="User card profile"
              className="user-card-profile"
            />
          ) : (
            <DefaultProfile shortName={user.shortName} />
          )}
        </div>
        <button
          className="user-card-fullname-section complete-left"
          onClick={handleGoToProfile}
        >
          <b>
            {`${user.lastNames}`} {`${user.firstNames}`}
          </b>
        </button>
        <p className="user-card-role-text">Rol</p>
      </div>
      <div className="user-card-actions-section flex-row-center-end">
        <button className="user-card-action-button flex-column-center">
          <ChartPie />
        </button>
        <button className="user-card-action-button flex-column-center">
          <Pencil />
        </button>
        <button className="user-card-action-button flex-column-center delete">
          <Trash2 />
        </button>
        <button className="user-card-action-button flex-column-center user-card-sub-menu-button">
          <EllipsisVertical />
        </button>
      </div>
    </div>
  );
};
