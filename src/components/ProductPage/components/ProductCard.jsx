import React from "react";
import Card from "react-bootstrap/Card";
import img from "../../../assets/img/construccion.jpg";
import { Col, Row } from "react-bootstrap";
import ProductContact from "./ProductContact";

const ProductCard = () => {
  return (
    <>
      <div className="container-fluid container-md">
        <Row className="flex-lg-row flex-column">
          <Col lg={7} className="mb-3 mb-lg-0">
            <img className="rounded w-100" src={img} />
          </Col>
          <Col lg={5} >
            <Card.Body className="h-100 w-75 ">
              <div className="h-50 d-flex flex-column justify-content-between">
                <Card.Title className="fs-3">Ladrillos semi-vistos</Card.Title>
                <Card.Title className="fs-2 pt-4 fw-semibold d-flex align-items-baseline">
                  <span>$21000</span>{" "}
                  <p className="fs-6 fw-normal ps-2 text-secondary">
                    Por 1000 u.
                  </p>
                </Card.Title>
                <Card.Subtitle className="fs-6 fw-normal text-secondary">
                  5000 unidades disponibles
                </Card.Subtitle>
                <hr />
              </div>
              <Card.Text className="h-50">
                <ProductContact/>
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProductCard;
