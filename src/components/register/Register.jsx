import AuthForm from "../AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";
import registerImage from "../../assets/img/undraw_online_ad_re_ol62-removebg-preview.png";

const Register = () => {
  const navigate = useNavigate();
  const registerFields = [
    {
      id: "username",
      label: "Nombre de Usuario",
      type: "text",
      placeholder: "Ingresa tu nombre de usuario",
      image: registerImage,
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "Ingresa tu email",
    },
    {
      id: "password",
      label: "Contraseña",
      type: "password",
      placeholder: "Ingresa tu contraseña",
    },
  ];

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <AuthForm
      title="Crea tu cuenta"
      fields={registerFields}
      buttonText="Registrarme"
      linkText="Iniciar sesión"
      linkAction={handleLoginRedirect}
    />
  );
};

export default Register;
