import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const NotFound = () => {
  return (
    <div 
      className="d-flex flex-column align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
        color: "#343a40"
      }}
    >
      <h1 className="display-1 fw-bold">404</h1>
      <p className="lead text-muted mb-4">
        Oops! The page you are looking for doesn't exist.
      </p>
      <Link to="/" className="btn btn-outline-dark btn-lg px-5">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
