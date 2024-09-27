import PropTypes from "prop-types";
import { Table, Button, Row } from "react-bootstrap";
import { useState } from "react";
import EditProfileForm from "../../AuthForm/EditProfileForm";
import { updateCustomerProfile } from "../../../api/customerService";

const CustomTable = ({ input }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [data, setData] = useState(input);
  const [error, setError] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);

  const handleEditClick = (userId) => {
    const user = data.find((item) => item.id === userId);
    setUserToEdit(user);
    setEditingUserId(userId);
    setIsEditing(true);
  };

  const handleSave = async (updatedData) => {
    const token = localStorage.getItem("token");

    try {
      await updateCustomerProfile(updatedData.id, token, updatedData);

      setData((prevData) =>
        prevData.map((item) =>
          item.id === updatedData.id ? updatedData : item
        )
      );
      setIsEditing(false);
      setEditingUserId(null);
    } catch (error) {
      setError(error);
    }
  };

  if (isEditing && userToEdit) {
    return <EditProfileForm initialData={userToEdit} onSave={handleSave} />;
  }

  return (
    <div className="container">
      <Table striped bordered hover variant="light">
        <thead>
          <tr className="text-center">
            <th>Nombre de usuario</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.roles[0]?.name.split("_")[1]}</td>
              <td>
                <Row className="justify-content-end me-4">
                  <Button
                    onClick={() => handleEditClick(item.id)}
                    variant="outline-secondary"
                    size="sm"
                    className="border border-2 rounded-pill w-auto p-1 d-flex align-items-center"
                  >
                    <span>
                      Editar <i className="bi bi-pencil ms-2"></i>
                    </span>
                  </Button>
                </Row>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {error && <p className="text-danger">{error.message}</p>}
    </div>
  );
};

CustomTable.propTypes = {
  input: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      roles: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
        })
      ),
    })
  ).isRequired,
};

export default CustomTable;
