import React, { useEffect, useState } from "react";
import CustomTable from "./CustomTable";
import { useOutletContext, Navigate, useNavigate } from "react-router-dom";
import { getAllCustomers } from "../../../api/customerService";
import { Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { registerByAdminService } from "../../../api/adminService";

const AbmUsers = () => {
  const { user } = useOutletContext();
  const navigate = useNavigate();
  
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  if (!user) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const fetchAllCustomers = async () => {
      if (user && user.id) {
        try {
          const token = localStorage.getItem("token");
          const customers = await getAllCustomers(token);
          setUsers(customers);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchAllCustomers();
  }, [user]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">{error.message}</p>;
  }

  const userColumns = [
    {
      header: "Nombre de usuario",
      accessor: "username",
      render: (item) => item.username,
    },
    {
      header: "Email",
      accessor: "email",
      render: (item) => item.email,
    },
    {
      header: "Rol",
      accessor: "roles",
      render: (item) => item.roles[0]?.name.split("_")[1],
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (item) => (
        <Button style={{ height: "22px", fontSize: "12px", textAlign: "center" }} className="py-1" variant="outline-primary">
          Editar
        </Button>
      ),
    },
  ];

  const handleRegister = async (formData) => {
    try {
      await registerByAdminService(formData);
      // Vuelve a obtener la lista de usuarios
      const token = localStorage.getItem("token");
      const customers = await getAllCustomers(token);
      setUsers(customers);
      navigate("/login");
    } catch (error) {
      console.log("Error al registrarse: " + error.message);
      setErrorMessage("Error al registrarse. Por favor, verifica tus datos e intenta nuevamente.");
    }
  };

  const handleAddUser = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Agregar Usuario',
      html:
        `<input id="username" class="swal2-input" placeholder="Nombre de usuario">` +
        `<input id="email" class="swal2-input" placeholder="Email">` +
        `<input id="password" type="password" class="swal2-input" placeholder="Contraseña">`,
      focusConfirm: false,
      preConfirm: () => {
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        if (!username || !email || !password) {
          Swal.showValidationMessage(`Por favor ingrese nombre de usuario, email y contraseña`);
        }
        return { username, email, password };
      },
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar',
    });

    if (formValues) {
      const { username, email, password } = formValues;
      await handleRegister({ username, email, password });
    }
  };

  return (
    <div className="container shadow p-4 bg-light-subtle mb-3 mx-2" style={{ borderRadius: "20px" }}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <p className="fs-4 fw-semibold">Usuarios registrados</p>
        <div className="w-50 d-flex justify-content-around">
          <Form className="d-flex w-75">
            <Form.Control type="text" placeholder="Buscar Usuario" />
            <Button className="mx-2" type="submit">
              <i className="bi bi-search"></i>
            </Button>
          </Form>
        </div>
        <Button className="mx-2" onClick={handleAddUser}>
          <i className="bi bi-plus"> Agregar</i>
        </Button>
      </div>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <CustomTable columns={userColumns} data={users} />
    </div>
  );
};

export default AbmUsers;
