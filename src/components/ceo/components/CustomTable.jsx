import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Table, Button, Row, Pagination } from "react-bootstrap";
import EditProfileForm from "../../AuthForm/EditProfileFormSuperAdmin";
import { updateCustomerProfile } from "../../../api/customerService";
import Swal from "sweetalert2";
import { deleteCustomer } from "../../../api/adminService";
import { ThemeContext } from "../../themes/ThemeContext";

const CustomTable = ({ columns, data, onEdit, onDelete }) => {
  const { darkMode } = useContext(ThemeContext);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [error, setError] = useState(null);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEditClick = (user) => {
    setUserToEdit(user);
    setIsEditing(true);
  };

  const handleDeleteClick = async (user) => {
    const token = localStorage.getItem("token");
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, ¡bórralo!",
    });

    if (result.isConfirmed) {
      try {
        await deleteCustomer(user.id, token);
        Swal.fire("¡Borrado!", "El usuario ha sido borrado.", "success");
        onDelete(user.id);
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Hubo un problema al borrar el usuario.", "error");
      }
    }
  };

  const handleSave = async (updatedData) => {
    const token = localStorage.getItem("token");
    try {
      await updateCustomerProfile(updatedData.id, token, updatedData);
      onEdit(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (isEditing && userToEdit) {
    return <EditProfileForm initialData={userToEdit} onSave={handleSave} />;
  }

  return (
    <div className="container">
      <Table
        striped
        bordered
        hover
        variant={darkMode ? "dark" : "light"}
        className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}
      >
        <thead>
          <tr className="text-center">
            {columns.map((col) => (
              <th key={col.header}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center" style={{ fontSize: "14px" }}>
          {paginatedData.map((item) => (
            <tr key={item.id}>
              {columns.map((col) => (
                <td key={col.accessor}>{col.render(item)}</td>
              ))}
              <td>
                <Row className="d-flex justify-content-center gap-2">
                  <Button
                    onClick={() => handleEditClick(item)}
                    variant={darkMode ? "outline-light" : "outline-secondary"}
                    size="sm"
                    className="w-25"
                  >
                    <i className="bi bi-pencil"></i> {/* Icono de editar */}
                  </Button>
                  <Button
                    onClick={() => handleDeleteClick(item)}
                    variant="danger"
                    size="sm"
                    className="w-25"
                  >
                    <i className="bi bi-trash"></i> {/* Icono de eliminar */}
                  </Button>
                </Row>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="w-full d-flex justify-content-center">
        <Pagination.First
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index}
            active={currentPage === index + 1}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
};

CustomTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CustomTable;
