import { Link } from "react-router-dom";
import img from "../../../assets/img/nexufy-horizontal-png.png";

const NotFound = () => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
        color: "#343a40",
      }}
    >
      <img
        src={img}
        style={{ height: "8rem" }}
        alt="enlace para volver a home"
      />
      <h1 className="display-1 fw-bold text-primary">404</h1>
      <p className="lead text-muted mb-4">
        La página que intentas acceder no existe o no tienes los permisos.
      </p>
      <Link to="/" className="btn btn-outline-primary">
        Volver a home
      </Link>
    </div>
  );
};

export default NotFound;
