import React, { useEffect, useState } from "react";
import { getCustomerById } from "../../../api/customerService";
import { Button, Col, Form, Row } from "react-bootstrap";

const Profile = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const clientId = "66bbd7ee094da25c9d6e7ef8";
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const data = await getCustomerById(clientId);
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCustomer();
  }, [clientId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }
  return (
    <div className="container w-100 d-flex flex-column align-items-start">
      <p className="fw-semibold">Mi Perfil</p>

      <div className="w-100 d-flex align-items-center p-2 px-4 border rounded  border-2 border-secondary my-2 border-opacity-25 ">
        <img
          src={
            data.gender === "male"
              ? "https://avatar.iran.liara.run/public/boy"
              : data.gender === "female"
              ? "https://avatar.iran.liara.run/public/girl"
              : `https://avatar.iran.liara.run/username?username=${data.name[0]}${data.lastname[0]}`
          }
          style={{ width: "5rem" }}
          alt=""
          className="mx-3"
        />
        <div className="d-flex flex-column">
          <p className=" fs-3 fw-semibold text-secondary mt-1">
            {data.name} {data.lastname}
          </p>
          <span className="fw-medium   text-body-tertiary">
            Miembro desde {data.registrationdate.split("T")[0]}
          </span>
        </div>
      </div>
      <div className="w-100 p-2 px-4 border rounded border-2 border-secondary border-opacity-25 fw-semibold text-secondary">
        <p className="fw-semibold text-dark">Información Personal</p>
        <Row className="text-dark d-flex justify-content-between">
          <Col xs={12} md={4}>
            <Row>
              <Form.Label className="text-body-tertiary fw-base" style={{fontSize:".8rem"}}>
                Nombre
              </Form.Label>
              <span className="fs-6 mb-4">{data.name}</span>
            </Row>
            <Row>
              <Form.Label className="text-body-tertiary fw-base" style={{fontSize:".8rem"}}>
                Email
              </Form.Label>
              <span className="fs-6 mb-4">{data.email}</span>
            </Row>
            <Row>
              <Form.Label className="text-body-tertiary fw-base" style={{fontSize:".8rem"}}>
                Dirección
              </Form.Label>
              <span className="fs-6 mb-4">{data.address}</span>
            </Row>
          </Col>
          <Col xs={12} md={4}>
            <Row>
              <Form.Label className="text-body-tertiary fw-base" style={{fontSize:".8rem"}}>
                Apellido
              </Form.Label>
              <span className="fs-6 mb-4">{data.lastname}</span>
            </Row>
            <Row>
              <Form.Label className="text-body-tertiary fw-base" style={{fontSize:".8rem"}}>
                Nombre de usuario
              </Form.Label>
              <span className="fs-6 mb-4">{data.username}</span>
            </Row>
            <Row>
              <Form.Label className="text-body-tertiary fw-base" style={{fontSize:".8rem"}}>
                Fecha de nacimiento
              </Form.Label>
              <span
                mb-4 className={`fs-6 ${
                  data.birthdate ? "" : "text-body-tertiary text-opacity-25"
                }`}
              >
                {data.birthdate ? data.birthdate.split("T")[0] : "Sin cargar"}
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
                  Editar <i class="bi bi-pencil"></i>
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
