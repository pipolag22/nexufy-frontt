import { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

const EditProfileForm = ({ initialData, onSave }) => {
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
    <Form onSubmit={handleSubmit}>
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
            />
          </Form.Group>
          <Form.Group controlId="formAddress">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
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
            />
          </Form.Group>
          <Form.Group controlId="formUsername">
            <Form.Label>Nombre de Usuario</Form.Label>
            <Form.Text
              className="form-control"
              style={{
                backgroundColor: "#e9ecef",
                border: "1px solid #ced4da",
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
            />
          </Form.Group>
        </Col>
      </Row>
      <Button variant="primary" type="submit" className="mt-3">
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
