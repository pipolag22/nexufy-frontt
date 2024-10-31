import { useNavigate } from "react-router-dom";
import img from "../../assets/img/nexufy-horizontal-png.png";
import registerImage from "../../assets/img/undraw_online_ad_re_ol62-removebg-preview.png";
import { registerService } from "../../api/authService";
import { useState, useContext, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import ThemeToggle from "../themes/ThemeToggle";
import { ThemeContext } from "../themes/ThemeContext";
import { LanguageContext } from "../themes/LanguageContext";
import LanguageToggle from "../themes/LanguageToggle";
import translations from "../themes/translations";

const Register = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { darkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    // Limpiar el mensaje de error al escribir en el campo
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "",
    }));
  };

  useEffect(() => {
    // Validación de la longitud de la contraseña
    if (formData.password && formData.password.length < 6) {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        password: t.passwordTooShortError,
      }));
    } else {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        password: "",
      }));
    }

    // Validación de coincidencia de contraseñas
    if (
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: t.passwordMismatchError,
      }));
    } else {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "",
      }));
    }
  }, [formData.password, formData.confirmPassword, t]);

  const handleRegister = async () => {
    let hasErrors = false;
    let newFieldErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    // Validación de campos vacíos y asignación de mensajes específicos
    if (!formData.username) {
      newFieldErrors.username = "Te faltó completar el usuario";
      hasErrors = true;
    }
    if (!formData.email) {
      newFieldErrors.email = "Te faltó completar el email";
      hasErrors = true;
    }
    if (!formData.password) {
      newFieldErrors.password = "Te faltó completar la contraseña";
      hasErrors = true;
    }
    if (!formData.confirmPassword) {
      newFieldErrors.confirmPassword = "Te faltó confirmar la contraseña";
      hasErrors = true;
    }

    setFieldErrors(newFieldErrors);

    if (hasErrors) {
      setIsRegistered(false);
      return;
    }

    // Validación de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage(t.invalidEmailError);
      setIsRegistered(false);
      return;
    }

    try {
      await registerService(formData);
      setIsRegistered(true);
      setSuccessMessage(
        "¡Registro exitoso! Serás redirigido al inicio de sesión."
      ); // Mensaje de éxito
      setErrorMessage("");
      setTimeout(() => {
        navigate("/login");
      }, 3000); // Espera 3 segundos antes de redirigir
    } catch (error) {
      console.log("Error al registrarse: " + error.message);
      setErrorMessage(error.message || t.registrationError);
      setIsRegistered(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}>
      <Navbar className="px-3 py-2 ">
        <Navbar.Brand onClick={handleGoHome} style={{ cursor: "pointer" }}>
          <img src={img} alt="Nexufy Logo" style={{ height: "80px" }} />
        </Navbar.Brand>

        <div className="ms-auto d-flex align-items-center">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </Navbar>

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-5">
            <h2 className="text-center">{t.createAccount}</h2>

            <div className="form-group mb-3">
              <label>{t.usernameLabel}</label>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder={t.usernamePlaceholder}
                value={formData.username}
                onChange={handleInputChange}
              />
              {fieldErrors.username && (
                <small className="text-danger">{fieldErrors.username}</small>
              )}
            </div>

            <div className="form-group mb-3">
              <label>{t.emailLabel}</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder={t.emailPlaceholder}
                value={formData.email}
                onChange={handleInputChange}
              />
              {fieldErrors.email && (
                <small className="text-danger">{fieldErrors.email}</small>
              )}
            </div>

            <div className="form-group mb-3">
              <label>{t.passwordLabel}</label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder={t.passwordPlaceholder}
                value={formData.password}
                onChange={handleInputChange}
              />
              {fieldErrors.password && (
                <small className="text-danger">{fieldErrors.password}</small>
              )}
            </div>

            <div className="form-group mb-3">
              <label>{t.confirmPasswordLabel}</label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control"
                placeholder={t.confirmPasswordPlaceholder}
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              {fieldErrors.confirmPassword && (
                <small className="text-danger">
                  {fieldErrors.confirmPassword}
                </small>
              )}
            </div>

            <button className="btn btn-primary w-100" onClick={handleRegister}>
              {t.registerButton}
            </button>

            <p className="text-center mt-3">
              <a href="/login">{t.loginLink}</a>
            </p>

            {/* Mensaje de error general */}
            {errorMessage && (
              <p className="text-danger text-center">{errorMessage}</p>
            )}

            {/* Mensaje de éxito */}
            {successMessage && (
              <p className="text-success text-center">{successMessage}</p>
            )}
          </div>

          <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
            <img
              src={registerImage}
              alt="Register"
              className="img-fluid"
              style={{ maxHeight: "400px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
