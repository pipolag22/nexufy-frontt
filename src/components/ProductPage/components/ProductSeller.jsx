import React from "react";
import img from "../../../assets/img/undraw_factory_dy0a-removebg-preview.png";
import { Col } from "react-bootstrap";

const ProductSeller = () => {
  return (
    <div className="container bg-light border-dark-subtle border-3" style={{ height: "300px" }}>
      <div className="d-flex border-dark-subtle border-3">
        <Col lg={5} className="d-flex flex-column justify-content-between">
          <p className="fw-semibold text-body-tertiary">Información del vendedor</p>
          <p className="fs-3 fw-medium">Carlos López</p>
          <p className="fw-semibold text-body-tertiary">Lo han contactado 25 veces</p>
          <p className="fw-semibold text-body-tertiary">+20 ventas realizadas</p>
          <p className="fw-semibold text-body-tertiary">Realiza envíos a todo el pais</p>
          <a href="">Ver más productos de este vendedor→</a>
        </Col>
        <Col lg={7}>
          <img src={img} alt="" />
        </Col>
      </div>
    </div>
  );
};

export default ProductSeller;
