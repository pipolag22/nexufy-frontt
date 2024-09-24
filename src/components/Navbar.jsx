import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Dropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import img from "../assets/img/nexufy-horizontal-png.png";
import { FaSearch, FaBars, FaUserCircle } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthenticationContext } from "../services/authenticationContext/authentication.context";
import categories from "../data/category.json";

function NavbarHome() {
  const [showCategories, setShowCategories] = useState(false);

  const navigate = useNavigate();
  const { user, handleLogout } = useContext(AuthenticationContext);

  const handleSearch = (event) => {
    event.preventDefault();
    console.log("Search submitted");
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };
  const handleGoHome = () => {
    navigate("/");
  };
  const handleCategory = (category) => {
    setShowCategories(false);
    navigate(`/product/category/${category.id}`, {
      state: {
        category: {
          id: category.id,
          name: category.name,
          description: category.description,
        },
      },
    });
  };
  return (
    <Navbar
      expand="lg"
      className="py-0 mb-4 bg-secundario z-3"
      style={{ height: "100px" }}
    >
      <div className="container d-flex justify-content-between align-items-center">
        <Navbar.Brand>
          <a href="" onClick={handleGoHome}>
            <img src={img} alt="Nexufy Logo" style={{ height: "120px" }} />
          </a>
        </Navbar.Brand>
        <Form onSubmit={handleSearch} className="d-flex flex-grow-1 mx-3">
          <FormControl
            type="text"
            placeholder="¿Qué materia prima buscas?"
            className="me-2"
            aria-label="Buscar"
            style={{ width: "100%" }}
          />
          <Button variant="outline-secondary" type="submit">
            <FaSearch />
          </Button>
        </Form>
        <Nav className="d-flex align-items-center">
          {/* <Nav.Link href="#" className="d-flex align-items-center me-3">
            <FaBars className="me-1" /> Categorías
          </Nav.Link> */}
          <Nav.Link
            href="#"
            className="d-flex align-items-center me-3 position-relative"
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            <FaBars className="me-1" /> Categorías
            {showCategories && (
              <div className="categories-dropdown">
                {categories.map((category, index) => (
                  <a
                    key={index}
                    onClick={() => handleCategory(category)}
                    className="dropdown-itemCategory text-dark-subtle"
                  >
                    {category.name} ({category.quantity})
                  </a>
                ))}
              </div>
            )}
          </Nav.Link>
          {user ? (
            <Dropdown>
              <Dropdown.Toggle
                className="d-flex align-items-center"
                variant="outline-secondary"
                id="dropdown-basic"
              >
                <FaUserCircle className="me-1" /> {user.name || user.username}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/admin/datos">Mi perfil</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>
                  Cerrar sesión
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Nav.Link
              onClick={handleLoginRedirect}
              className="d-flex align-items-center"
            >
              <FaUserCircle className="me-1" /> Iniciar Sesión
            </Nav.Link>
          )}
        </Nav>
      </div>
    </Navbar>
  );
}

export default NavbarHome;
