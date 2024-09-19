import React, { useState } from "react";
import { Col, Nav, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  
  const navs = [
    {
      id: 1,
      name: "Mis datos",
      icon: "bi bi-person-vcard",
      url: "/ceo/datos",
      active: true,
    },
    {
      id: 2,
      name: "ABM de usuarios",
      icon: "bi bi-person-fill-gear",
      url: "/ceo/users",
      active: false,
    },
    {
      id: 3,
      name: "ABM de productos",
      icon: "bi bi-shop",
      url: "/ceo/products",
      active: false,
    },
    {
      id: 4,
      name: "Estadísticas",
      icon: "bi bi-graph-up-arrow",
      url: "/ceo/estadisticas",
      active: false,
    },
    {
      id: 5,
      name: "Notificaciones",
      icon: "bi bi-bell",
      url: "/ceo/notificaciones",
      active: false,
    },
  ];

  const location = useLocation();

  return (
    <>
      <div className="h-100 position-absolute top-0 left-0 bottom-0 bg-secondary-subtle" style={{width:"17rem", paddingTop:"3rem" }}>
        <Col className="mt-2 pt-5 w-100 text-secondary">
          {navs.map((nav) => (
            <Row key={nav.id} className="py-2 ps-5">
              <Nav.Link
                href={nav.url}
                className={`d-flex align-items-center me-3 text-center  ${
                  location.pathname === nav.url ? "fw-bold rounded " : ""
                }`}
              >
                <i className={`${nav.icon} m-2 fs-5`}></i>
                {nav.name}
              </Nav.Link>
            </Row>
          ))}
        </Col>
      </div>
    </>
  );
};

export default Sidebar;
