import { Col, Nav, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
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

  const location = useLocation();

  return (
    <>
      <div
        className="h-100 position-fixed top-0 left-0 bg-secondary-subtle"
        style={{
          width: "17rem",
          paddingTop: "3rem",
          height: "100vh",
          overflowY: "auto",
        }} 
      >
        <Col className="mt-2 pt-5 w-100 text-secondary">
          {navs.map((nav) => (
            <Row key={nav.id} className="py-2 ps-5">
              <Link
                to={nav.url}
                className={`nav-link d-flex align-items-center me-3 text-center ${
                  location.pathname === nav.url ? "fw-bold rounded" : ""
                }`}
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

export default Sidebar;
