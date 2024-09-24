import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthForm from "../AuthForm/AuthForm";
import img from "../../assets/img/nexufy-horizontal-png.png";
import loginImage from "../../assets/img/undraw_Login_re_4vu2-removebg-preview.png";
import { loginService } from "../../api/authService";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";
import { Navbar } from "react-bootstrap"; // Asegúrate de importar Navbar

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");

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
      navigate("/");
    } catch (error) {
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
      </Navbar>

      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <AuthForm
        title="Bienvenido de vuelta!"
        fields={loginFields}
        buttonText="Iniciar sesión"
        linkText="Registrarme"
        linkAction={handleRegisterRedirect}
        onSubmit={handleLoginSubmit}
      />
    </div>
  );
};

export default Login;
