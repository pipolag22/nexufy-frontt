import { useContext, useState } from "react";
import { ThemeContext } from "../../components/themes/ThemeContext";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const FilterSidebar = () => {

    const[filters, setFilters]= useState('');
    const {darkMode}= useContext(ThemeContext);

    const navs = [
        {
          id: 1,
          name: "Mis datos",
          icon: "bi bi-person-vcard",
          url: "/admin/datos",
          active: true,
        },
        {
          id: 2,
          name: "Publicaciones",
          icon: "bi bi-shop",
          url: "/admin/publicaciones",
          active: false,
        },
        {
          id: 3,
          name: "Estadísticas",
          icon: "bi bi-graph-up-arrow",
          url: "/admin/estadisticas",
          active: false,
        },
      ];
  return (
    <>
      <div
        className={`h-100 position-fixed top-0 left-0  ${
          darkMode ? "bg-dark" : "bg-secondary-subtle"
        }`}
        style={{
          width: "17rem",
          paddingTop: "3rem",
          height: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
        }} // Agrega `height` y `overflowY`
      >
        <Col className="mt-2 pt-5 w-100">
          {navs.map((nav) => (
            <Row key={nav.id} className="py-2 px-5">
              <Link
                to={nav.url}
                className={`nav-link d-flex align-items-center  text-center fw-bold ${darkMode ? "text-light" : "text-body-secondary"}`} // Ajustar el color del texto según el tema
              >
                <i className={`${nav.icon} m-2 fs-5`}></i>
                {nav.name}
              </Link>
            </Row>
          ))}
        </Col>
      </div>
    </>
  );
};

export default FilterSidebar;
