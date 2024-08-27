import { useNavigate } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";
import loginImage from "../../assets/img/undraw_Login_re_4vu2-removebg-preview.png";

const Login = () => {
  const navigate = useNavigate();
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

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <AuthForm
      title="Bienvenido de vuelta!"
      fields={loginFields}
      buttonText="Iniciar sesión"
      linkText="Registrarme"
      linkAction={handleRegisterRedirect}
    />
  );
};

export default Login;
