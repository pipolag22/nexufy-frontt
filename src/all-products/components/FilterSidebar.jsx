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
          name: "Por precio",
          active: true,
        },
        {
          id: 2,
          name: "Por categoría",
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
              <p
                className={`nav-link d-flex align-items-center  text-center fw-bold ${darkMode ? "text-light" : "text-body-secondary"}`} // Ajustar el color del texto según el tema
              >
                {nav.name}
              </p>
            </Row>
          ))}
        </Col>
      </div>
    </>
  );
};

export default FilterSidebar;
