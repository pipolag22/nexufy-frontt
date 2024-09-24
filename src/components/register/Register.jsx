import { useNavigate } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";
import img from "../../assets/img/nexufy-horizontal-png.png";
import registerImage from "../../assets/img/undraw_online_ad_re_ol62-removebg-preview.png";
import { registerService } from "../../api/authService";
import { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar"; // Asegúrate de que Bootstrap esté importado

const Register = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); // Estado para manejar errores

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

  const handleRegister = async (formData) => {
    try {
      await registerService(formData); // Llama al servicio de registro
      navigate("/login"); // Redirige al login después de registrar exitosamente
    } catch (error) {
      console.log("Error al registrarse: " + error.message);
      setErrorMessage(
        "Error al registrarse. Por favor, verifica tus datos e intenta nuevamente."
      );
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

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
      {errorMessage && <p className="text-danger">{errorMessage}</p>}{" "}
      {/* Mostrar error */}
      <AuthForm
        title="Crea tu cuenta"
        fields={registerFields}
        buttonText="Registrarme"
        linkText="Iniciar sesión"
        linkAction={handleLoginRedirect}
        onSubmit={handleRegister}
      />
    </div>
  );
};

export default Register;
