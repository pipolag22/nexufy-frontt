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
import { Link, useNavigate } from "react-router-dom";
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
  const resultsRef = useRef(null);

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
    if (debounceTimeOut) clearTimeout(debounceTimeOut);
    const timeout = setTimeout(() => {
      if (event.target.value) handleSearch(event);
      else setSearchResults([]);
    }, 1000);
    setDebounceTimeOut(timeout);
  };

  useEffect(() => {
    return () => debounceTimeOut && clearTimeout(debounceTimeOut);
  }, [debounceTimeOut]);

  const handleLoginRedirect = () => navigate("/login");

  const handleCategory = (category) => {
    setShowCategories(false);
    navigate(`/product/category/${category.id}`, {
      state: { category },
    });
  };

  const handleClickSearch = (producto) => {
    setSearchQuery("");
    setSearchResults([]);
    navigate(`/product/${producto.id}`);
  };

  const isSuperAdmin = user?.roles?.includes("ROLE_SUPERADMIN");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Navbar
      expand="lg"
      className="py-0 mb-4 bg-secundario z-3 w-100"
      style={{ height: "100px", color: "var(--color-text-primary)" }}
    >
      <div className="container d-flex justify-content-between align-items-center">
        <Navbar.Brand>
          <Link to="/" style={{ color: "var(--color-text-primary)" }}>
            <img src={img} alt="Nexufy Logo" style={{ width: "12vw" }} />
          </Link>
        </Navbar.Brand>

        <Form
          onSubmit={handleSearch}
          className="d-flex w-50 flex-grow-1 mx-3 text-bg-light"
        >
          <FormControl
            type="text"
            placeholder="¿Qué materia prima buscas?"
            className={`me-2 ${
              darkMode ? "bg-dark text-light" : "bg-light text-bg-light"
            }`}
            value={searchQuery}
            onChange={handleInputSearch}
          />
          <Button variant="outline-secondary" type="submit">
            <FaSearch />
          </Button>
        </Form>

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
          <Nav className="d-lg-none ">
              {user ? (
                <div className=" bg-light text-center d-flex flex-column">
                  <NavDropdown.Item className="item-menu py-2" href="/admin/datos">Mi perfil</NavDropdown.Item>
                  {isSuperAdmin && <Dropdown.Item className="item-menu py-2" href="/ceo/datos">Perfil CEO</Dropdown.Item>}
                  <NavDropdown.Item className="item-menu py-2" onClick={handleLogout}>
                    Cerrar sesión
                  </NavDropdown.Item>
                  </div>
                ) : (
                <NavDropdown.Item onClick={handleLoginRedirect}>
                  Iniciar Sesión
                </NavDropdown.Item>
              )}
          </Nav>
        </Navbar.Collapse>

        <Nav className="d-none d-lg-flex align-items-center">
          <ThemeToggle />
          <Nav.Link
            className="position-relative"
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            <div className="
            d-flex  align-items-center mx-2"><FaBars className="me-1" /> <span>Categorías</span></div>
            {showCategories && (
              <div className="categories-dropdown">
                {categories.map((category, index) => (
                  <a
                    key={index}
                    onClick={() => handleCategory(category)}
                    className="dropdown-itemCategory"
                  >
                    {category.name} ({category.quantity})
                  </a>
                ))}
              </div>
            )}
          </Nav.Link>

          {user ? (
            <Dropdown>
              <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                <FaUserCircle className="me-1" /> {user.name || user.username}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/admin/datos">Mi perfil</Dropdown.Item>
                {isSuperAdmin && <Dropdown.Item href="/ceo/datos">Perfil CEO</Dropdown.Item>}
                <Dropdown.Item onClick={handleLogout}>Cerrar sesión</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Nav.Link onClick={handleLoginRedirect}>
              <FaUserCircle className="me-1" /> Iniciar Sesión
            </Nav.Link>
          )}
        </Nav>
      </div>
    </Navbar>
  );
}

export default NavbarHome;
