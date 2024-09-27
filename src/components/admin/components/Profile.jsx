import  { useEffect, useState } from "react";
import { getCustomerById } from "../../../api/customerService";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Navigate, useOutletContext } from "react-router-dom";

const Profile = () => {
  const { user } = useOutletContext();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  if (!user) {
    return <Navigate to="/login" />; // Redirigir si no hay usuario
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchCustomer = async () => {
      if (user && user.id) { // Verificamos si el usuario tiene un ID
        try {
          const token = localStorage.getItem("token");
          const data = await getCustomerById(user.id, token); // Usamos el ID del usuario autenticado
          setData(data);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchCustomer();
  }, [user]); // El efecto se ejecuta cuando el usuario cambia

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">{error.message}</p>;
  }

  return (
    <div className="container shadow p-4 bg-light-subtle mb-3 mx-2 d-flex flex-column align-items-start" style={{borderRadius:"20px" }}>
      <p className="fs-3 fw-semibold">Mi Perfil</p>

      <div className="w-100 d-flex align-items-center p-2 px-4 border rounded border-2 border-secondary my-2 border-opacity-25">
        <img
          src={
            data.gender === "M"
              ? "https://avatar.iran.liara.run/public/boy"
              : data.gender === "F"
              ? "https://avatar.iran.liara.run/public/girl"
              : `https://avatar.iran.liara.run/username?username=${data.username ? data.username[0] : 'U'}`
          }
          style={{ width: "5rem" }}
          alt="User Avatar"
          className="mx-3"
        />
        <div className="d-flex flex-column">
          <p className="fs-3 fw-semibold text-secondary mt-1">
            {data.name || data.username} {data.lastname || ""}
          </p>
          <span className="fw-medium text-body-tertiary">
            Miembro desde {data.registrationdate ? data.registrationdate.split("T")[0] : "-"}
          </span>
        </div>
      </div>

      <div className="w-100 p-2 px-4 border rounded border-2 border-secondary border-opacity-25 fw-semibold text-secondary">
        <p className="fw-bold text-dark" style={{ fontSize: ".9rem" }}>Información Personal</p>
        <Row className="text-dark d-flex justify-content-between">
          <Col xs={12} md={4}>
            <Row>
              <Form.Label className="text-body-tertiary fw-base" style={{ fontSize: ".8rem" }}>
                Nombre
              </Form.Label>
              <span className="fs-6 mb-4">{data.name || "Nombre no disponible"}</span>
            </Row>
            <Row>
              <Form.Label className="text-body-tertiary fw-base" style={{ fontSize: ".8rem" }}>
                Email
              </Form.Label>
              <span className="fs-6 mb-4">{data.email || "Email no disponible"}</span>
            </Row>
            <Row>
              <Form.Label className="text-body-tertiary fw-base" style={{ fontSize: ".8rem" }}>
                Dirección
              </Form.Label>
              <span className="fs-6 mb-4">{data.address || "Dirección no disponible"}</span>
            </Row>
          </Col>
          <Col xs={12} md={4}>
            <Row>
              <Form.Label className="text-body-tertiary fw-base" style={{ fontSize: ".8rem" }}>
                Apellido
              </Form.Label>
              <span className="fs-6 mb-4">{data.lastname || "Apellido no disponible"}</span>
            </Row>
            <Row>
              <Form.Label className="text-body-tertiary fw-base" style={{ fontSize: ".8rem" }}>
                Nombre de usuario
              </Form.Label>
              <span className="fs-6 mb-4">{data.username || "Usuario no disponible"}</span>
            </Row>
            <Row>
              <Form.Label className="text-body-tertiary fw-base" style={{ fontSize: ".8rem" }}>
                Fecha de nacimiento
              </Form.Label>
              <span className={`fs-6 mb-4 ${data.birthdate ? "" : "text-body-tertiary text-opacity-25"}`}>
                {data.birthdate ? data.birthdate.split("T")[0] : "Fecha no disponible"}
              </span>
            </Row>
          </Col>
          <Col xs={12} md={4}>
            <Row className="justify-content-end me-4">
              <Button
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
      </div>
    </div>
  );
};

export default Profile;

