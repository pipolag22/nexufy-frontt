import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthForm from "../AuthForm/AuthForm";
import img from "../../assets/img/nexufy-horizontal-png.png";
import loginImage from "../../assets/img/undraw_Login_re_4vu2-removebg-preview.png";
import { loginService } from "../../api/authService";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";
import { Navbar } from "react-bootstrap";
import ThemeToggle from "../themes/ThemeToggle"; // Importar el ThemeToggle para el botón de sol/luna
import { ThemeContext } from "../themes/ThemeContext"; // Importar el ThemeContext para manejar el tema

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { darkMode } = useContext(ThemeContext); // Acceder al estado del tema

  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthenticationContext);

  const loginFields = [
    {
      id: "username",
      label: "Nombre de Usuario",
      type: "text",
      placeholder: "Ingresa tu nombre de usuario",
      image: loginImage,
    },
    {
      id: "password",
      label: "Contraseña",
      type: "password",
      placeholder: "Ingresa tu contraseña",
    },
  ];

  const handleLoginSubmit = async (formData) => {
    try {
      const result = await loginService(formData);
      handleLogin(result);
      console.log(result);
      navigate("/");
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Error al iniciar sesión. Por favor, verifica tus credenciales."
      );
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div>
      <Navbar className="px-3 py-2">
        <Navbar.Brand onClick={handleGoHome} style={{ cursor: "pointer" }}>
          <img src={img} alt="Nexufy Logo" style={{ height: "120px" }} />
        </Navbar.Brand>

        <div className="ms-auto">
          <ThemeToggle />{" "}
          {/* Botón de sol/luna agregado en la barra de navegación */}
        </div>
      </Navbar>

      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <AuthForm
        title="Bienvenido de vuelta!"
        fields={loginFields}
        buttonText="Iniciar sesión"
        linkText="Registrarme"
        linkAction={handleRegisterRedirect}
        onSubmit={handleLoginSubmit}
        placeholderClass={darkMode ? "placeholder-dark" : "placeholder-light"} // Pasar clases dinámicas de placeholder
      />
    </div>
  );
};

export default Login;
