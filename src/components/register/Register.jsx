import { useNavigate } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";
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
    {
      id: "name",
      label: "Nombre",
      type: "text",
      placeholder: "Ingresa tu nombre",
    },
    {
      id: "lastname",
      label: "Apellido",
      type: "text",
      placeholder: "Ingresa tu apellido",
    },
  ];

  const handleRegister = async (formData) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/customer/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData);
      }

      alert("Registro exitoso");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

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
      onSubmit={handleRegister}
    />
  );
};

export default Register;
