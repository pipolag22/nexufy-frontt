import { useNavigate } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";
import registerImage from "../../assets/img/undraw_online_ad_re_ol62-removebg-preview.png";
import { registerService } from "../../api/authService";

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
    //DEJO LOS OTROS CAMPOS COMENTADOS YA QUE NO LOS REQUIERE EL REGISTER
    // {
    //   id: "name",
    //   label: "Nombre",
    //   type: "text",
    //   placeholder: "Ingresa tu nombre",
    // },
    // {
    //   id: "lastname",
    //   label: "Apellido",
    //   type: "text",
    //   placeholder: "Ingresa tu apellido",
    // },
  ];
  const handleRegister = async (formData) => {
    try {
      await registerService(formData);
      navigate('/login');
    } catch (error) { 
      console.log("Error al registrarse: "+ error.message);
      alert("Error al registrarse. Por favor, verifica tus datos e intenta nuevamente.");
    }
  }

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
