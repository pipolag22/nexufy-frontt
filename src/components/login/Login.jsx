import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthForm from "../AuthForm/AuthForm";
import loginImage from "../../assets/img/undraw_Login_re_4vu2-removebg-preview.png";
import { loginService } from "../../api/authService";

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


  const handleLogin = async (formData) => {
    try {
      const result = await loginService(formData);
      localStorage.setItem('token',result.accessToken)
      navigate('/');
    } catch (error) { 
      console.log("Error al iniciar sesión: "+ error.message);
    }
  }

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  useEffect(() => {
    // Verificar si el usuario ya está autenticado y redirigir si es necesario
    const isAuthenticated = false; // Aquí iría la lógica de autenticación

    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <AuthForm
      title="Bienvenido de vuelta!"
      fields={loginFields}
      buttonText="Iniciar sesión"
      linkText="Registrarme"
      linkAction={handleRegisterRedirect}
      onSubmit={handleLogin}
    />
  );
};

export default Login;
