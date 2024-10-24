// NavbarHome.js
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
import { LanguageContext } from "../components/themes/LanguageContext"; // Importar LanguageContext
import LanguageToggle from "../components/themes/LanguageToggle"; // Importar LanguageToggle
import translations from "../components/themes/translations"; // Importar las traducciones
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
  const { language } = useContext(LanguageContext); // Acceder al idioma actual
  const t = translations[language]; // Obtener las traducciones para el idioma actual

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
            <img src={img} alt="Nexufy Logo" style={{ width: "7rem" }} />
          </Link>
        </Navbar.Brand>

        <Form
          onSubmit={handleSearch}
          className="d-flex w-50 flex-grow-1 mx-3 text-bg-light"
        >
          <FormControl
            type="text"
            placeholder={t.searchPlaceholder}
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
          <Nav className="d-lg-none">
            {user ? (
              <div
                className={`${
                  darkMode ? "bg-dark text-light" : "bg-light text-dark"
                } text-center d-flex flex-column`}
              >
                <NavDropdown.Item
                  className="item-menu py-2"
                  href="/admin/datos"
                >
                  {t.myProfile}
                </NavDropdown.Item>
                {isSuperAdmin && (
                  <Dropdown.Item className="item-menu py-2" href="/ceo/datos">
                    {t.ceoProfile}
                  </Dropdown.Item>
                )}
                <NavDropdown.Item
                  className="item-menu py-2"
                  onClick={handleLogout}
                >
                  {t.logout}
                </NavDropdown.Item>
              </div>
            ) : (
              <NavDropdown.Item
                className={`${darkMode ? "text-light" : "text-dark"}`}
                onClick={handleLoginRedirect}
              >
                {t.login}
              </NavDropdown.Item>
            )}
          </Nav>
        </Navbar.Collapse>

        <Nav className="d-none d-lg-flex align-items-center">
          <LanguageToggle />
          <ThemeToggle />

          <Nav.Link
            className={`position-relative ${
              darkMode ? "text-light" : "text-dark"
            }`}
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            <div className="d-flex align-items-center mx-2">
              <FaBars className="me-1" /> <span>{t.categories}</span>
            </div>
            {showCategories && (
              <div
                className={`categories-dropdown ${
                  darkMode ? "bg-dark text-light" : "bg-light text-dark"
                }`}
              >
                {categories.map((category, index) => (
                  <a
                    key={index}
                    onClick={() => handleCategory(category)}
                    className={`dropdown-itemCategory ${
                      darkMode ? "bg-dark text-light" : "bg-light text-dark"
                    }`}
                  >
                    {category.name} ({category.quantity})
                  </a>
                ))}
              </div>
            )}
          </Nav.Link>

          {/* Botón de Iniciar Sesión con soporte para modo oscuro */}
          {user ? (
            <Dropdown>
              <Dropdown.Toggle
                variant="outline-secondary"
                id="dropdown-basic"
                className={`mx-2 ${
                  darkMode
                    ? "bg-dark text-light border-light"
                    : "bg-light text-dark border-dark"
                }`}
              >
                <FaUserCircle className="me-1" /> {user.name || user.username}
              </Dropdown.Toggle>
              <Dropdown.Menu
                className={`${
                  darkMode ? "bg-dark text-light" : "bg-light text-dark"
                }`}
              >
                <Dropdown.Item
                  href="/admin/datos"
                  className={`${darkMode ? "text-light" : "text-dark"}`}
                >
                  {t.myProfile}
                </Dropdown.Item>
                {isSuperAdmin && (
                  <Dropdown.Item
                    href="/ceo/datos"
                    className={`${darkMode ? "text-light" : "text-dark"}`}
                  >
                    {t.ceoProfile}
                  </Dropdown.Item>
                )}
                <Dropdown.Item
                  onClick={handleLogout}
                  className={`${darkMode ? "text-light" : "text-dark"}`}
                >
                  {t.logout}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Nav.Link
              onClick={handleLoginRedirect}
              className={`mx-2 d-flex align-items-center ${
                darkMode ? "text-light" : "text-dark"
              }`}
              style={{ paddingLeft: 0, whiteSpace: "nowrap" }} // Añadir whiteSpace para evitar saltos de línea
            >
              <FaUserCircle className="me-1" /> {t.login}
            </Nav.Link>
          )}
        </Nav>
      </div>
    </Navbar>
  );
}

export default NavbarHome;
