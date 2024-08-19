import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import img from "../assets/img/nexufy-horizontal-png.png";
import { FaSearch, FaBars, FaUserCircle } from 'react-icons/fa';

function Header() {
 

  const handleSearch = (event) => {
    event.preventDefault();
    // Lógica de búsqueda aquí
    console.log('Search submitted');
  };

  return (
    <Navbar bg="light" expand="lg" className="py-2">
      <div className="container d-flex justify-content-between align-items-center">
        <Navbar.Brand href="#">
          <img src={img} alt="Nexufy Logo" style={{ height: "120px" }} />
        </Navbar.Brand>
        <Form inline onSubmit={handleSearch} className="d-flex flex-grow-1 mx-3">
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
          <Nav.Link href="#categories" className="d-flex align-items-center me-3">
            <FaBars className="me-1" /> Categorías
          </Nav.Link>
          <Nav.Link href="#login" className="d-flex align-items-center">
            <FaUserCircle className="me-1" /> Ingresar
          </Nav.Link>
        </Nav>
      </div>
    </Navbar>

  );
}

export default Header;
