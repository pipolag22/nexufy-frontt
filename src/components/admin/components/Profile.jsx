import { useEffect, useState } from "react";
import { getCustomerById } from "../../../api/customerService";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Navigate, useOutletContext } from "react-router-dom";
import EditProfileForm from "../../AuthForm/EditProfileForm";
import { updateCustomerProfile } from "../../../api/customerService";

const Profile = () => {
  const { user } = useOutletContext();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      if (user && user.id) {
        try {
          const token = localStorage.getItem("token");
          const data = await getCustomerById(user.id, token);
          setData(data);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchCustomer();
  }, [user]);

  const handleSave = async (updatedData) => {
    const token = localStorage.getItem("token");

    try {
      await updateCustomerProfile(user.id, token, updatedData);

      setData(updatedData);
      setIsEditing(false);
    } catch (error) {
      setError(error);
    }
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">{error.message}</p>;
  }

  return (
    <div className="container w-100 d-flex flex-column align-items-start">
      <p className="fw-semibold">Mi Perfil</p>

      <div className="w-100 p-2 px-4 border rounded border-2 border-secondary border-opacity-25">
        {isEditing ? (
          <EditProfileForm initialData={data} onSave={handleSave} />
        ) : (
          <>
            <Row className="text-dark d-flex justify-content-between">
              <Col xs={12} md={4}>
                <Row>
                  <Form.Label
                    className="text-body-tertiary fw-semibold"
                    style={{ fontSize: ".9rem" }}
                  >
                    Nombre
                  </Form.Label>
                  <span className="fs-6 mb-4">
                    {data.name || "Nombre no disponible"}
                  </span>
                </Row>
                <Row>
                  <Form.Label
                    className="text-body-tertiary fw-semibold"
                    style={{ fontSize: ".9rem" }}
                  >
                    Email
                  </Form.Label>
                  <span className="fs-6 mb-4">
                    {data.email || "Email no disponible"}
                  </span>
                </Row>
                <Row>
                  <Form.Label
                    className="text-body-tertiary fw-semibold"
                    style={{ fontSize: ".9rem" }}
                  >
                    Dirección
                  </Form.Label>
                  <span className="fs-6 mb-4">
                    {data.address || "Dirección no disponible"}
                  </span>
                </Row>
              </Col>

              <Col xs={12} md={4}>
                <Row>
                  <Form.Label
                    className="text-body-tertiary fw-semibold"
                    style={{ fontSize: ".9rem" }}
                  >
                    Apellido
                  </Form.Label>
                  <span className="fs-6 mb-4">
                    {data.lastname || "Apellido no disponible"}
                  </span>
                </Row>
                <Row>
                  <Form.Label
                    className="text-body-tertiary fw-semibold"
                    style={{ fontSize: ".9rem" }}
                  >
                    Nombre de usuario
                  </Form.Label>
                  <span className="fs-6 mb-4">
                    {data.username || "Usuario no disponible"}
                  </span>
                </Row>
                <Row>
                  <Form.Label
                    className="text-body-tertiary fw-semibold"
                    style={{ fontSize: ".9rem" }}
                  >
                    Fecha de nacimiento
                  </Form.Label>
                  <span
                    className={`fs-6 mb-4 ${
                      data.birthdate ? "" : "text-body-tertiary text-opacity-25"
                    }`}
                  >
                    {data.birthdate
                      ? data.birthdate.split("T")[0]
                      : "Fecha no disponible"}
                  </span>
                </Row>
              </Col>

              <Col xs={12} md={4}>
                <Row className="justify-content-end me-4">
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline-secondary"
                    size="sm"
                    className="border border-2 rounded-pill w-25 p-1 d-flex justify-content-center"
                  >
                    <span>
                      Editar <i className="bi bi-pencil"></i>
                    </span>
                  </Button>
                </Row>
              </Col>
            </Row>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
