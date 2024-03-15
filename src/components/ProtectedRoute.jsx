import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

function ProtectedRoute() {
  let auth = useAuth();
  let location = useLocation();
  if (!auth.isAuthenticated()) {
    return <Navigate to="/iniciar-sesion" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
