import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

function RequireAuth() {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
