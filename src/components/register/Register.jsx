import { useNavigate } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";
import img from "../../assets/img/nexufy-horizontal-png.png";
import registerImage from "../../assets/img/undraw_online_ad_re_ol62-removebg-preview.png";
import { registerService } from "../../api/authService";
import { useState, useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import ThemeToggle from "../themes/ThemeToggle";
import { ThemeContext } from "../themes/ThemeContext";

// **Importar el contexto de idioma y las traducciones**
import { LanguageContext } from "../themes/LanguageContext"; // Importar el contexto del idioma
import LanguageToggle from "../themes/LanguageToggle"; // Importar el botón de cambio de idioma
import translations from "../themes/translations"; // Importar las traducciones

const Register = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const { darkMode } = useContext(ThemeContext); // Obtener el modo actual desde el contexto

  // **Obtener el idioma actual y las traducciones**
  const { language } = useContext(LanguageContext); // Obtener el idioma actual desde el contexto
  const t = translations[language]; // Obtener las traducciones correspondientes

  // **Utilizar las traducciones en los campos del formulario**
  const registerFields = [
    {
      id: "username",
      label: t.usernameLabel,
      type: "text",
      placeholder: t.usernamePlaceholder,
      image: registerImage,
    },
    {
      id: "email",
      label: t.emailLabel,
      type: "email",
      placeholder: t.emailPlaceholder,
    },
    {
      id: "password",
      label: t.passwordLabel,
      type: "password",
      placeholder: t.passwordPlaceholder,
    },
  ];

  const handleRegister = async (formData) => {
    try {
      await registerService(formData);
      setIsRegistered(true);
      setErrorMessage("");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log("Error al registrarse: " + error.message);
      setErrorMessage(t.registrationError); // Utilizar la traducción del mensaje de error
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
      <Navbar className="px-3 py-2">
        <Navbar.Brand onClick={handleGoHome} style={{ cursor: "pointer" }}>
          <img src={img} alt="Nexufy Logo" style={{ height: "120px" }} />
        </Navbar.Brand>

        {/* Botones de cambio de idioma y tema */}
        <div className="ms-auto d-flex align-items-center">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </Navbar>
      {/* Mensaje de error */}
      {errorMessage && (
        <p className="text-danger text-center">{errorMessage}</p>
      )}
      {/* Mensaje de éxito */}
      {isRegistered && (
        <div className="alert alert-success text-center" role="alert">
          <h4 className="alert-heading">{t.wellDone}</h4>
          <p>{t.registrationSuccess}</p>
        </div>
      )}
      <AuthForm
        title={t.createAccount}
        fields={registerFields}
        buttonText={t.registerButton}
        linkText={t.loginLink}
        linkAction={handleLoginRedirect}
        onSubmit={handleRegister}
      />
    </div>
  );
};

export default Register;
