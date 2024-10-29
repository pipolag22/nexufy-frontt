import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteCustomer, registerAdminUser } from "../../../api/adminService";
import { getAllCustomers, searchCustomers } from "../../../api/customerService";
import CreateUserForm from "../../AuthForm/CreateUserForm";
import { ThemeContext } from "../../themes/ThemeContext";
import { LanguageContext } from "../../themes/LanguageContext";
import CustomTable from "./CustomTable";
import SearchBar from "./SearchBar";
import translations from "../../themes/translations";
import { FaEdit, FaTrash } from "react-icons/fa";

const AbmUsers = () => {
  const { user } = useOutletContext();
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openNewUser, setOpenNewUser] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreateClick = () => {
    setOpenNewUser(true);
  };

  const fetchAllCustomers = async () => {
    if (user && user.id) {
      try {
        const token = localStorage.getItem("token");
        const customers = await getAllCustomers(token);
        setUsers(customers);
        setFilteredUsers(customers);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchAllCustomers();
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchSearchedUsers = async () => {
      if (searchQuery) {
        try {
          const results = await searchCustomers(searchQuery, token);
          setFilteredUsers(results);
        } catch (err) {
          setError(err);
        }
      } else {
        setFilteredUsers(users);
      }
    };

    fetchSearchedUsers();
  }, [searchQuery, users]);

  const handleSave = async (newUser) => {
    const token = localStorage.getItem("token");
    try {
      await registerAdminUser(newUser, token);
      setOpenNewUser(false);
      await fetchAllCustomers();
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const handleEdit = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setFilteredUsers((prevFiltered) =>
      prevFiltered.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
  };

  const confirmDeleteCustomer = (id) => {
    Swal.fire({
      title: t.confirmDeleteTitle,
      text: t.confirmDeleteMessage,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: t.delete,
      cancelButtonText: t.cancel,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleConfirmDelete(id);
      }
    });
  };

  const handleConfirmDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await deleteCustomer(id, token);
      setFilteredUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== id)
      );
      Swal.fire(t.deleted, t.successMessage, "success");
    } catch (error) {
      setError(error);
      Swal.fire(t.error, error.message, "error");
    }
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return <p>{t.loading}</p>;
  }

  if (error) {
    return <p className="text-danger">{error.message}</p>;
  }

  const userColumns = [
    {
      header: t.username,
      accessor: "username",
      render: (item) => item.username,
    },
    {
      header: t.email,
      accessor: "email",
      render: (item) => item.email,
    },
    {
      header: t.role,
      accessor: "roles",
      render: (item) =>
        item.roles && Array.isArray(item.roles) && item.roles.length > 0
          ? item.roles.map((role) => role.replace("ROLE_", "")).join(", ")
          : t.noRole,
    },
    {
      header: t.actions,
      accessor: "actions",
      render: (item) => (
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button
            style={{ height: "22px", width: "22px", padding: "0" }}
            variant="link"
            onClick={() => handleEdit(item)}
          >
            <FaEdit />
          </Button>
          <Button
            style={{ height: "22px", width: "22px", padding: "0" }}
            variant="link"
            onClick={() => confirmDeleteCustomer(item.id)}
          >
            <FaTrash style={{ color: "red" }} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div
      className={`container shadow p-4 mb-3 mx-2 ${
        darkMode ? "bg-dark text-light" : "bg-light-subtle"
      }`}
      style={{ borderRadius: "20px" }}
    >
      {openNewUser ? (
        <CreateUserForm onSave={handleSave} />
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <p className="fs-4 fw-semibold">{t.registeredUsers}</p>
            <div className="w-50 d-flex justify-content-around">
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                darkMode={darkMode}
              />
            </div>
            <Button
              className="mx-2"
              onClick={handleCreateClick}
              variant={darkMode ? "outline-light" : "outline-secondary"}
            >
              <i className="bi bi-plus" />
              <span>{t.addUser}</span>
            </Button>
          </div>
          <CustomTable
            columns={userColumns}
            data={filteredUsers}
            onEdit={handleEdit}
            onDelete={confirmDeleteCustomer}
          />
        </>
      )}
    </div>
  );
};

export default AbmUsers;
  