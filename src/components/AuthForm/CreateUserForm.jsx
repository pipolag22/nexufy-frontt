import { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import useLanguage from "../themes/useLanguage"; // Importar el hook useLanguage

const CreateUserForm = ({ onSave }) => {
  const [formData, setFormData] = useState({});
  const t = useLanguage(); // Obtener las traducciones correspondientes usando el hook

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
          <Form.Group controlId="formEmail">
            <Form.Label>{t.emailLabel}</Form.Label>
            <Form.Control
              type="email"
              name="email"
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formPassword">
            <Form.Label>{t.passwordLabel}</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formUsername">
            <Form.Label>{t.usernameLabel}</Form.Label>
            <Form.Control
              type="text"
              name="username"
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Button variant="primary" type="submit" className="mt-3">
        {t.saveButton}
      </Button>
    </Form>
  );
};

CreateUserForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default CreateUserForm;
