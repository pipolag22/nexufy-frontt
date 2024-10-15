import { useContext, useEffect, useState } from "react";
import img from "../../../assets/img/undraw_factory_dy0a-removebg-preview.png"; // Imagen del vendedor
import { AuthenticationContext } from "../../../services/authenticationContext/authentication.context";
import { ThemeContext } from "../../themes/ThemeContext";
import { getCustomerById } from "../../../api/customerService";

const ProductSeller = ({ customerId }) => {
  const { user } = useContext(AuthenticationContext);
  const { darkMode } = useContext(ThemeContext);

  const [seller, setSeller] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchSeller = async () => {
      try {
        const response = await getCustomerById(customerId, token);
        setSeller(response);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSeller();
  }, [customerId]);

  return (
    <div
      className={`container rounded border border-dark-subtle border-2 mb-4 p-4 ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
      style={{ height: "auto", position: "relative", overflow: "hidden" }}
    >
      {/* Estilo de fondo para pantallas pequeñas */}
      <div
        className={`position-absolute w-100 h-100 top-0 left-0 ${
          darkMode ? "bg-dark" : "bg-light"
        }`}
        style={{
          backgroundImage: `url(${img})`, // Usa la misma imagen como fondo
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3, // Opacidad de la imagen
          zIndex: -1, // Asegura que la imagen esté detrás del contenido
        }}
      />

      <div className="d-flex">
        <div className="d-flex w-100 flex-column justify-content-between">
          <p className={`fw-semibold ${darkMode ? "text-light" : "text-dark"}`}>
            Información del vendedor
          </p>
          {user ? (
            <div className="d-flex flex-column flex-lg-row justify-content-between">
              <div>
                <p
                  className={`fs-3 fw-medium ${
                    darkMode ? "text-light" : "text-dark"
                  }`}
                >
                  {seller?.name} {seller?.lastname} 
                  <i className="bi bi-star-fill text-primary-custom me-1"></i>
                  <i className="bi bi-star-fill text-primary-custom me-1"></i>
                  <i className="bi bi-star-fill text-primary-custom"></i>
                </p>

                {/* Actualización de los textos de contacto, ventas y envíos */}
                <p
                  className={`fw-semibold ${
                    darkMode ? "text-light" : "text-dark"
                  }`}
                >
                  Lo han contactado 25 veces
                </p>
                <p
                  className={`fw-semibold ${
                    darkMode ? "text-light" : "text-dark"
                  }`}
                >
                  +20 ventas realizadas
                </p>
                <p
                  className={`fw-semibold ${
                    darkMode ? "text-light" : "text-dark"
                  }`}
                >
                  Realiza envíos a todo el país
                </p>

                <a
                  href=""
                  className={`fw-semibold ${
                    darkMode ? "text-light" : "text-dark"
                  }`}
                >
                  Ver más productos de este vendedor →
                </a>
              </div>
              <img
                src={img}
                style={{ height: "auto" }}
                className="mx-auto d-none d-lg-block" // Esconde la imagen en pantallas pequeñas
                alt="Imagen del vendedor"
              />
            </div>
          ) : (
            <div className="d-flex h-100 flex-column justify-content-center">
              <p className={darkMode ? "text-light" : "text-dark"}>
                Debes iniciar sesión para ver información del vendedor
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSeller;
