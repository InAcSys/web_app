import { useEffect, useState } from "react";
import { UserCard } from "../../../components/users/user-card/UserCard";
import { User } from "../../../models/user/User";
import axios from "axios";
import { useAuthContext } from "../../../contexts/AuthContext";
import "./user-management.css"

export default function UsersManagement() {
  const { jwt } = useAuthContext();

  const [users, setUsers] = useState<Array<User>>([]);
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const getUsers = async () => {
    if (jwt) {
      const response = await axios.get("http://localhost:3000/users", {
        headers: {
          Authorization: jwt,
        },
      });

      const data = response.data.data;
      setUsers(data.users)
      setPageNumber(data.pageNumber)
      setPageSize(data.pageSize)
      setTotalPages(data.totalPages)
      return data;
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      await getUsers();
    };

    fetchUsers();
  }, [jwt]);

  return (
    <div className="users-management-page flex-column-center">
      <div className="users-tools-section">

      </div>
      <div className="users-container flex-row-between">
        {users.length > 0 ? (
          users.map((user) => <UserCard key={`user-${user.id}`} user={user} />)
        ) : (
          <p className="users-not-found-text">No se encontraron usuarios</p>
        )}
      </div>
      <div className="users-pagination-section">

      </div>
    </div>
  );
}
