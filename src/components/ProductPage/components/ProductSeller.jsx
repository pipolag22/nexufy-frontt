import  { useContext } from "react";
import img from "../../../assets/img/undraw_factory_dy0a-removebg-preview.png";
import { AuthenticationContext } from "../../../services/authenticationContext/authentication.context";

const ProductSeller = () => {
  const { user } = useContext(AuthenticationContext);
  return (
    <div
      className="container bg-light rounded border border-dark-subtle border-2 mb-4 p-4"
      style={{ height: "auto" }}
    >
      <div className="d-flex ">
        <div className="d-flex w-50 flex-column justify-content-between">
          <p className="fw-semibold text-body-tertiary">
            Información del vendedor
          </p>
          {user? (
          <div className="d-flex flex-column justify-content-between h-100">
          <p className="fs-3 fw-medium">
            Carlos López <i className="bi bi-star-fill text-primary-custom me-1"></i><i className="bi bi-star-fill text-primary-custom me-1"></i>
            <i className="bi bi-star-fill text-primary-custom"></i>
          </p>
          <p className="fw-semibold text-body-tertiary">
            Lo han contactado 25 veces
          </p>
          <p className="fw-semibold text-body-tertiary">
            +20 ventas realizadas
          </p>
          <p className="fw-semibold text-body-tertiary">
            Realiza envíos a todo el pais
          </p>
          <a href="">Ver más productos de este vendedor→</a>
          </div>

          ): (
            <div className="d-flex h-100 flex-column justify-content-center"> <p>Debes iniciar sesión para ver información del vendedor</p></div>
          )}          
        </div>
        <div className="d-flex flex-column align-center justify-content-center">
          <img
            src={img}
            style={{ height: "auto" }}
            className="mx-auto"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default ProductSeller;
