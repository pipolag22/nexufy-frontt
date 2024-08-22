import React from "react";
import { Col, Row } from "react-bootstrap";

const ProductContact = () => {
  return (
    <div>
      <Col>
        <Row>
          <p className="fw-medium fs-5">Contactar al vendedor</p>
        </Row>
        <Row>
          <Col><button className="btn btn-outline-primary shadow rounded-pill w-100"><i className="bi bi-whatsapp text-primary-custom"></i></button></Col>
          <Col><button className="btn btn-outline-primary shadow rounded-pill w-100"><i className="bi bi-envelope text-primary-custom"></i></button></Col>
          <Col><button className="btn btn-outline-primary shadow rounded-pill w-100"><i className="bi bi-telephone-outbound text-primary-custom"></i></button></Col>
          <Col><button className="btn btn-outline-primary shadow rounded-pill w-100"><i className="bi bi-browser-chrome text-primary-custom"></i></button></Col>
        </Row>
        <Row><p className="text-secondary mt-2"><i className="bi bi-geo-alt pe-2 "></i>Se encuentra en La Falda, Córdoba</p></Row>
        <div className="d-flex align-items-center">
          <i className="bi bi-star-fill text-primary-custom"></i>
          <span className="fs-sm text-secondary ms-2">15 visitas</span>
        </div>
      </Col>
    </div>
  );
};

export default ProductContact;
