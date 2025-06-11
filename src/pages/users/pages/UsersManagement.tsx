import { useEffect, useState } from "react";
import { UserCard } from "../../../components/users/user-card/UserCard";
import { User } from "../../../models/user/User";
import axios from "axios";
import { useAuthContext } from "../../../contexts/AuthContext";
import "./user-management.css";
import { Button, Dropdown } from "../../../components";
import { NumberInput } from "../../../components/number-input/NumberInput";
import { usePopUpContext } from "../../../contexts/PopUpContext";
import { CreateUserPopUp } from "../../../components/pop-ups/user-pop-ups/create-user-pop-up/CreateUserPopUp";
import { SearchBar } from "../../../components/search-bar/SearchBar";

export default function UsersManagement() {
  const { jwt } = useAuthContext();
  const { setPopUp } = usePopUpContext();

  const numberItems = ["12", "24", "60", "120"];

  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState<Array<User>>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [totalPages, setTotalPages] = useState(1);

  const [roles, setRoles] = useState<Map<number, string>>(new Map());

  const [selectPageSize, setSelectPageSize] = useState(0);

  const getUsers = async () => {
    if (jwt) {
      const response = await axios.get(
        `http://localhost:3000/users?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: jwt,
          },
        }
      );

      const data = response.data.data;
      return data;
    }
  };

  const handleCreateNewUser = () => {
    setPopUp(<CreateUserPopUp />);
  };

  const getRoles = async () => {
    if (jwt) {
      try {
        const response = await axios.get("http://localhost:3000/auth/roles", {
          headers: {
            Authorization: jwt,
          },
        });

        if (!response.data) {
          throw new Error("Roles not found");
        }

        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    }
  };

  const handleSearchUsers = async () => {
    if (jwt) {
      try {
        const response = await axios.get(
          `http://localhost:3000/search?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${searchValue}`,
          {
            headers: {
              Authorization: jwt,
            },
          }
        );
        return response.data.data;
      } catch (error) {
        console.error("Error searching users:", error);
      }
    }
  };

  useEffect(() => {
    getRoles();
  }, [jwt]);

  useEffect(() => {
    setPageSize(parseInt(numberItems[selectPageSize]));
    setPageNumber(1);
  }, [selectPageSize]);

  const fetchUsers = async () => {
    let result = searchValue ? await handleSearchUsers() : await getUsers();
    if (result) {
      setUsers(result.users);
      setPageNumber(result.pageNumber);
      setPageSize(result.pageSize);
      setTotalPages(result.totalPages);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [jwt, searchValue, pageNumber, pageSize]);

  return (
    <div className="users-management-page">
      <div className="users-tools-section flex-row-center-end">
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          search={() => {fetchUsers()}}
        />
        <Button label="Crear nuevo usuario" onClick={handleCreateNewUser} />
      </div>
      <div className="users-container flex-column">
        {users.length > 0 ? (
          users.map((user) => (
            <UserCard key={`user-${user.id}`} user={user} roles={roles} />
          ))
        ) : (
          <p className="users-not-found-text">No se encontraron usuarios</p>
        )}
      </div>
      <div className="users-pagination-section flex-row-center-end">
        <div className="users-pagination-page-selector-section flex-row-center">
          <NumberInput
            value={pageNumber}
            setValue={setPageNumber}
            min={1}
            max={totalPages}
          />
          <p className="users-pagination-page-selector-text">
            de <b>{totalPages}</b> páginas de
          </p>
        </div>
        <Dropdown
          optionSelected={selectPageSize}
          changeOptionSelected={setSelectPageSize}
          options={numberItems}
          errorIsVisible={false}
        />
        <p className="users-pagination-page-selector-text">usuarios</p>
      </div>
    </div>
  );
}
