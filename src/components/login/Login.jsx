import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthForm from "../AuthForm/AuthForm";
import loginImage from "../../assets/img/undraw_Login_re_4vu2-removebg-preview.png";
import { loginService } from "../../api/authService";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";

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
      const result = await loginService(formData); // Guardamos la autenticación
      handleLogin(result);
      navigate("/admin"); // Redirigimos al panel admin
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
      navigate("/"); // Redirige al home si ya está autenticado
    }
  }, [navigate]);

  return (
    <div>
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
