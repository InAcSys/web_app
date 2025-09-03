import { User } from "../../../models/user/User";
import { DefaultProfile } from "../../images/profiles/default/DefaultProfile";
import "./user-card.css";
import { ChartPie, EllipsisVertical, Inbox, Trash2 } from "lucide-react";
import { usePopUpContext } from "../../../contexts/PopUpContext";
import { DeleteUserPopUp } from "../../pop-ups/user-pop-ups/delete-user-pop-up/DeleteUserPopUp";
import { EditUserPopUp } from "../../pop-ups/user-pop-ups/edit-user-pop-up/EditUserPopUp";
import { VerifyPermission } from "../../permission/VerifyPermission";

interface Props {
  user: User;
  roles: any;
}

export const UserCard = ({ user, roles }: Props) => {
  const { setPopUp } = usePopUpContext();

  const handleEditUserInfo = () => {
    setPopUp(<EditUserPopUp userId={user.id} />);
  };

  const handleDeleteUser = () => {
    setPopUp(<DeleteUserPopUp userId={user.id} />);
  };

  return (
    <div className="user-card-container">
      <div className="user-card-info-section">
        <div className="user-card-image-section">
          {user.image_url ? (
            <img
              src={user.image_url}
              alt="User card profile"
              className="user-card-profile"
            />
          ) : (
            <DefaultProfile shortName={user.shortname} />
          )}
        </div>
        <button
          className="user-card-fullname-section complete-left"
          onClick={handleEditUserInfo}
        >
          <b>
            {user.name}
          </b>
        </button>
        <p className="user-card-role-text">
          {roles ? roles[user.role_id].name : "Rol"}
        </p>
      </div>
      <div className="user-card-actions-section flex-row-center-end">
        <button className="user-card-action-button flex-column-center">
          <Inbox />
        </button>
        <button className="user-card-action-button flex-column-center">
          <ChartPie />
        </button>
        {/* <button className="user-card-action-button flex-column-center" onClick={handleEditUserInfo}>
          <Pencil />
        </button> */}
        <VerifyPermission permission="DELETE_USERS">
          <button
            className="user-card-action-button flex-column-center delete"
            onClick={handleDeleteUser}
          >
            <Trash2 />
          </button>
        </VerifyPermission>
        <button className="user-card-action-button flex-column-center user-card-sub-menu-button">
          <EllipsisVertical />
        </button>
      </div>
    </div>
  );
};
