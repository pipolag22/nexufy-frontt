import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import { registerAdminUser } from "../../../api/adminService";
import { getAllCustomers, searchCustomers } from "../../../api/customerService";
import CreateUserForm from "../../AuthForm/CreateUserForm";
import { ThemeContext } from "../../themes/ThemeContext";
import { LanguageContext } from "../../themes/LanguageContext"; // Importar el contexto de idioma
import CustomTable from "./CustomTable";
import SearchBar from "./SearchBar";
import translations from "../../themes/translations"; // Importar las traducciones

const AbmUsers = () => {
  const { user } = useOutletContext();
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext); // Acceder al idioma actual
  const t = translations[language]; // Obtener las traducciones para el idioma actual

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
        setFilteredUsers(customers); // Inicializa usuarios filtrados
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

  // Efecto para manejar la búsqueda
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
        setFilteredUsers(users); // Restablece a todos los usuarios
      }
    };

    fetchSearchedUsers(); // Ejecuta la búsqueda al cambiar el searchQuery
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

  const handleDelete = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return <p>{t.loading}</p>; // Texto traducido para "Loading..."
  }

  if (error) {
    return <p className="text-danger">{error.message}</p>;
  }

  const userColumns = [
    {
      header: t.username, // Texto traducido para "Nombre de usuario"
      accessor: "username",
      render: (item) => item.username,
    },
    {
      header: t.email, // Texto traducido para "Email"
      accessor: "email",
      render: (item) => item.email,
    },
    {
      header: t.role, // Texto traducido para "Rol"
      accessor: "role",
      render: (item) => item.role[0]?.name.split("_")[1],
    },
  ];

  const handleEdit = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

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
            <p className="fs-4 fw-semibold">{t.registeredUsers}</p>{" "}
            {/* Texto traducido para "Usuarios registrados" */}
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
              <span>{t.addUser}</span> {/* Texto traducido para "Agregar" */}
            </Button>
          </div>
          <CustomTable
            columns={userColumns}
            data={filteredUsers} // Usa los usuarios filtrados aquí
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
};

export default AbmUsers;
