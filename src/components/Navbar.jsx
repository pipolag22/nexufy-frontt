import { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  Dropdown,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { FaBars, FaSearch, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "../api/productService";
import img from "../assets/img/nexufy-horizontal-png.png";
import { ThemeContext } from "../components/themes/ThemeContext";
import ThemeToggle from "../components/themes/ThemeToggle";
import categories from "../data/category.json";
import { AuthenticationContext } from "../services/authenticationContext/authentication.context";

function NavbarHome() {
  const [showCategories, setShowCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [debounceTimeOut, setDebounceTimeOut] = useState(null);

  const navigate = useNavigate();
  const resultsRef = useRef(null)

  const { user, handleLogout } = useContext(AuthenticationContext);
  const { darkMode } = useContext(ThemeContext);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!searchQuery) return;
    try {
      const results = await searchProducts(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error("Error al realizar la búsqueda", error);
    }
  };

  const handleInputSearch = (event) => {
    setSearchQuery(event.target.value);
    // debounceTimeOut es un temporizador que activa la busqueda en tiempo real, clearTimeout limpia el temporizador
    if (debounceTimeOut) {
      clearTimeout(debounceTimeOut);
    }
    // Aca se va a crear un temporizador en la nueva busqueda
    const timeout = setTimeout(() => {
      if (event.target.value) {
        handleSearch(event);
      } else {
        setSearchResults([]); //limpiar resultados si la busqueda esta vacia
      }
    }, 1000); //tiempo de espera de  1 segundo
    setDebounceTimeOut(timeout);
  };

  useEffect(() => {
    //limpiar el timeout si el componente se desmonta
    return () => {
      if (debounceTimeOut) {
        clearTimeout(debounceTimeOut);
      }
    };
  }, [debounceTimeOut]);

  const handleLoginRedirect = () => {
    navigate("/login");
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

  const handleClickSearch = (producto) => {
    setSearchQuery("")
    setSearchResults([])
    navigate(`/product/${producto.id}`)
  };
  const isSuperAdmin =
    user && user.roles && user.roles.includes("ROLE_SUPERADMIN");

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (resultsRef.current && !resultsRef.current.contains(event.target)) {
          setSearchResults([]); // Oculta los resultados
        }
      };
    
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
    

  return (
    <Navbar
      expand="lg"
      className="py-0 mb-4 bg-secundario z-3 w-100"
      style={{ height: "100px", color: "var(--color-text-primary)" }}
    >
      <div className="container d-flex justify-content-between align-items-center">
        <Navbar.Brand>
          <a href="/" style={{ color: "var(--color-text-primary)" }}>
            <img src={img} alt="Nexufy Logo" style={{ height: "6rem" }} />
          </a>
        </Navbar.Brand>

        <Form
          onSubmit={handleSearch}
          className="d-flex w-50 flex-grow-1 mx-3 text-bg-light"
        >
          <FormControl
            type="text"
            placeholder="¿Qué materia prima buscas?"
            className={`me-2 ${
              darkMode
                ? "bg-dark text-light placeholder-light"
                : "bg-light text-bg-light"
            }`}
            aria-label="Buscar"
            value={searchQuery}
            onChange={handleInputSearch}
          />
          <Button
            variant="outline-secondary"
            style={{ height: "2.5rem", color: "var(--color-text-primary)" }}
            type="submit"
          >
            <FaSearch />
          </Button>
        </Form>
        {/* Renderiza los resultados de búsqueda */}
        {searchResults.length > 0 && (
          <div className="search-results" ref={resultsRef}>
            {searchResults.map((producto) => (
              <div
              onClick={() => handleClickSearch(producto)} 
              key={producto.id}
                className="search-result-item p-2"
              >
                {producto.name}
              </div>
            ))}
          </div>
        )}

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="d-lg-none" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-lg-none">
            <NavDropdown title="Menú" id="basic-nav-dropdown" className="me-3">
              <NavDropdown.Item
                onClick={() => setShowCategories(!showCategories)}
                style={{ color: "var(--color-text-primary)" }}
              >
                <FaBars className="me-1" /> Categorías
              </NavDropdown.Item>
              {showCategories && (
                <div className="categories-dropdown">
                  {categories.map((category, index) => (
                    <NavDropdown.Item
                      key={index}
                      onClick={() => handleCategory(category)}
                      className="dropdown-itemCategory"
                      style={{ color: "var(--color-text-primary)" }}
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

        <Nav className="d-none d-lg-flex align-items-center">
          <ThemeToggle />{" "}
          <Nav.Link
            href="#"
            className="d-flex align-items-center me-3 position-relative"
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
            style={{ color: "var(--color-text-primary)" }}
          >
            <FaBars className="me-1" /> Categorías
            {showCategories && (
              <div className="categories-dropdown">
                {categories.map((category, index) => (
                  <a
                    key={index}
                    onClick={() => handleCategory(category)}
                    className="dropdown-itemCategory text-dark-subtle"
                    style={{ color: "var(--color-text-primary)" }}
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
                style={{ color: "var(--color-text-primary)" }}
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
            <Nav.Link
              onClick={handleLoginRedirect}
              className="d-flex align-items-center"
              style={{ color: "var(--color-text-primary)" }}
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
