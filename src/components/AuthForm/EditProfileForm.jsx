import { useState, useContext } from "react"; // Importar useContext
import { Form, Button, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { ThemeContext } from "../themes/ThemeContext"; // Importar el ThemeContext

const EditProfileForm = ({ initialData, onSave }) => {
  const { darkMode } = useContext(ThemeContext); // Obtener el estado del tema
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className={`p-4 ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`} // Cambiar los colores según el tema
    >
      <Row>
        <Col md={6}>
          <Form.Group controlId="formName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              required
              className={darkMode ? "bg-secondary text-light" : ""} // Aplicar estilo al input
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              required
              className={darkMode ? "bg-secondary text-light" : ""} // Aplicar estilo al input
            />
          </Form.Group>
          <Form.Group controlId="formAddress">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              className={darkMode ? "bg-secondary text-light" : ""} // Aplicar estilo al input
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formLastname">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              name="lastname"
              value={formData.lastname || ""}
              onChange={handleChange}
              className={darkMode ? "bg-secondary text-light" : ""} // Aplicar estilo al input
            />
          </Form.Group>
          <Form.Group controlId="formUsername">
            <Form.Label>Nombre de Usuario</Form.Label>
            <Form.Text
              className="form-control"
              style={{
                backgroundColor: darkMode ? "#495057" : "#e9ecef", // Cambiar el color según el tema
                border: darkMode ? "1px solid #6c757d" : "1px solid #ced4da",
                padding: "0.375rem 0.75rem",
                borderRadius: "0.25rem",
              }}
            >
              {formData.username || ""}
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBirthdate">
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control
              type="date"
              name="birthdate"
              value={formData.birthdate || ""}
              onChange={handleChange}
              className={darkMode ? "bg-secondary text-light" : ""} // Aplicar estilo al input
            />
          </Form.Group>
        </Col>
      </Row>
      <Button
        variant={darkMode ? "outline-light" : "primary"} // Cambiar el botón según el tema
        type="submit"
        className="mt-3"
      >
        Guardar Cambios
      </Button>
    </Form>
  );
};

EditProfileForm.propTypes = {
  initialData: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    lastname: PropTypes.string,
    username: PropTypes.string,
    birthdate: PropTypes.string,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditProfileForm;
