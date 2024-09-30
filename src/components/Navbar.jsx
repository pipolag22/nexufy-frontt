import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Dropdown,
  NavDropdown,
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

  console.log(user);

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

  const isSuperAdmin =
    user && user.roles && user.roles.includes("ROLE_SUPERADMIN");

  return (
    <Navbar expand="lg" className="py-0 mb-4 bg-secundario z-3 w-100" style={{ height: "100px" }}>
      <div className="container d-flex justify-content-between align-items-center">
        <Navbar.Brand >
          <a href="/"  >
            <img src={img} alt="Nexufy Logo" style={{ height: "6rem" }} />
          </a>
        </Navbar.Brand>
        <Form onSubmit={handleSearch} className="d-flex w-50 flex-grow-1 mx-3">
          <FormControl
            type="text"
            placeholder="¿Qué materia prima buscas?"
            className="me-2"
            aria-label="Buscar"
          />
          <Button variant="outline-secondary" style={{height:"2.5rem"}} type="submit">
            <FaSearch />
          </Button>
        </Form>

        {/* Aquí colapsamos la parte de categorías y usuario para pantallas pequeñas */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="d-lg-none" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-lg-none"> {/* Visible solo en pantallas pequeñas */}
            <NavDropdown title="Menú" id="basic-nav-dropdown" className="me-3">
              <NavDropdown.Item onClick={() => setShowCategories(!showCategories)}>
                <FaBars className="me-1" /> Categorías
              </NavDropdown.Item>
              {showCategories && (
                <div className="categories-dropdown">
                  {categories.map((category, index) => (
                    <NavDropdown.Item
                      key={index}
                      onClick={() => handleCategory(category)}
                      className="dropdown-itemCategory"
                    >
                      {category.name} ({category.quantity})
                    </NavDropdown.Item>
                  ))}
                </div>
              )}
              {user ? (
                <>
                  <NavDropdown.Item href="/admin/datos">
                    Mi perfil
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
                    Cerrar sesión
                  </NavDropdown.Item>
                </>
              ) : (
                <NavDropdown.Item onClick={handleLoginRedirect}>
                  Iniciar Sesión
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

        {/* Este bloque es visible solo en pantallas grandes */}
        <Nav className="d-none d-lg-flex align-items-center ">
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
                {isSuperAdmin && (
                  <Dropdown.Item href="/ceo/datos">Perfil CEO</Dropdown.Item>
                )}
                <Dropdown.Item onClick={handleLogout}>
                  Cerrar sesión
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Nav.Link onClick={handleLoginRedirect} className="d-flex align-items-center">
              <FaUserCircle className="me-1" /> Iniciar Sesión
            </Nav.Link>
          )}
        </Nav>
      </div>
    </Navbar>
  );
}

export default NavbarHome;

