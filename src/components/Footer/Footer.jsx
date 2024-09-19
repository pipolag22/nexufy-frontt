import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-light mt-5">
      <Container>
        <Row className="py-4">
          <Col md={4} className="text-center text-md-left">
            <h5>Nexufy</h5>
            <p>Soluciones innovadoras para la gestión de proyectos y desarrollo web.</p>
          </Col>
          <Col md={4} className="text-center">
            <h5>Enlaces Útiles</h5>
            <ul className="list-unstyled">
              <li><a href="#about" className="text-light">Sobre Nosotros</a></li>
              <li><a href="#services" className="text-light">Servicios</a></li>
              <li><a href="#contact" className="text-light">Contacto</a></li>
              <li><a href="#faq" className="text-light">FAQ</a></li>
            </ul>
          </Col>
          <Col md={4} className="text-center text-md-right">
            <h5>Síguenos</h5>
            <a href="https://www.facebook.com" className="text-light me-3">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.twitter.com" className="text-light me-3">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.linkedin.com" className="text-light me-3">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://www.instagram.com" className="text-light">
              <i className="fab fa-instagram"></i>
            </a>
          </Col>
        </Row>
        <Row className="border-top pt-3">
          <Col className="text-center">
            <p className="mb-0">&copy; 2024 Nexufy. Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
