import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import headerImage from "../../assets/img/home-removebg-preview.png";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";
import { useContext } from "react";

const Header = () => {
  const { user } = useContext(AuthenticationContext);

  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <header className="bg-secundario py-4">
      <div className="container d-flex align-items-center">
        <img
          src={headerImage}
          alt="Nexufy Header"
          className="me-3"
          style={{ maxWidth: "150px" }}
        />
        <div className="flex-grow-1">
          <h1 className="h4 text-primary">
            Simplifica tu cadena de suministro con conexiones directas. Únete a
            Nexufy.
          </h1>
          {!user ? (
            <div className="text-end mt-3">
              <button
                className="btn btn-outline-primary btn-lg"
                onClick={handleRegisterClick}
              >
                ¡Registrarme!
              </button>
            </div>
          ) : (
            <span></span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
