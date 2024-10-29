import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthenticationContext } from "../../../services/authenticationContext/authentication.context";

const ProtectedAdmin = () => {
  const { user } = useContext(AuthenticationContext);

  // Verificar si el usuario tiene el rol 'ROLE_SUPERADMIN'
  if (user?.roles?.includes("ROLE_SUPERADMIN")) {
    return <Outlet />;
  }

  // Redirigir al notFound si no tiene el rol adecuado
  return <Navigate to="/notFound" />;
};

export default ProtectedAdmin;
