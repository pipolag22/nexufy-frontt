import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import img from "../assets/img/nexufy-horizontal-png.png";
import { FaSearch, FaBars, FaUserCircle } from "react-icons/fa";

function NavbarHome() {
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    // Lógica de búsqueda aquí
    console.log("Search submitted");
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };
  const handleGoHome = () =>{
    navigate("/")
  }

  return (
    <Navbar
      expand="lg"
      className="py-0 mb-4 bg-secundario z-3"
      style={{ height: "100px" }}
    >
      <div className="container d-flex justify-content-between align-items-center">
        <Navbar.Brand >
          <a href="" onClick={handleGoHome}>
            <img src={img} alt="Nexufy Logo" style={{ height: "120px" }} />
          </a>
        </Navbar.Brand>
        <Form
          onSubmit={handleSearch}
          className="d-flex flex-grow-1 mx-3"
        >
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
          <Nav.Link href="#" className="d-flex align-items-center me-3">
            <FaBars className="me-1" /> Categorías
          </Nav.Link>
          <Nav.Link
            onClick={handleLoginRedirect}
            className="d-flex align-items-center"
          >
            <FaUserCircle className="me-1" /> Ingresar
          </Nav.Link>
        </Nav>
      </div>
    </Navbar>
  );
}

export default NavbarHome;
