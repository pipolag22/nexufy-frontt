import "bootstrap/dist/css/bootstrap.min.css";
import headerImage from "../../assets/img/home-removebg-preview.png";

const Header = () => {
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
          <div className="text-end mt-3">
            <button className="btn btn-outline-primary btn-lg">
              ¡Registrarme!
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
