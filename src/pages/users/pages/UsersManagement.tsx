import { useEffect, useState } from "react";
import { UserCard } from "../../../components/users/user-card/UserCard";
import { User } from "../../../models/user/User";
import axios from "axios";
import { useAuthContext } from "../../../contexts/AuthContext";
import "./user-management.css";
import { Button, Dropdown } from "../../../components";

export default function UsersManagement() {
  const { jwt } = useAuthContext();
  const numberItems = ["12", "24", "60", "120"];

  const [users, setUsers] = useState<Array<User>>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [totalPages, setTotalPages] = useState(0);

  const [selectPageNumber, setSelectPageNumber] = useState(0);

  const getUsers = async () => {
    if (jwt) {
      const response = await axios.get(`http://localhost:3000/users?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
        headers: {
          Authorization: jwt,
        },
      });

      const data = response.data.data;
      console.log(data)
      setUsers(data.users);
      setPageNumber(data.pageNumber);
      setPageSize(data.pageSize);
      setTotalPages(data.totalPages);
      return data;
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      await getUsers();
    };

    fetchUsers();
  }, [jwt, pageSize, pageNumber]);

  useEffect(() => {
    setPageSize(parseInt(numberItems[selectPageNumber]))
  }, [selectPageNumber])

  return (
    <div className="users-management-page flex-column-center">
      <div className="users-tools-section">
        <Button label="Crear nuevo usuario" />
      </div>
      <div className="users-container flex-row-between">
        {users.length > 0 ? (
          users.map((user) => <UserCard key={`user-${user.id}`} user={user} />)
        ) : (
          <p className="users-not-found-text">No se encontraron usuarios</p>
        )}
      </div>
      <div className="users-pagination-section">
        <Dropdown
          optionSelected={selectPageNumber}
          changeOptionSelected={setSelectPageNumber}
          options={numberItems}
        />
      </div>
    </div>
  );
}
