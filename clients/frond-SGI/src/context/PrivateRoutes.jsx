import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);

  // Verificar si el usuario está autenticado antes de mostrar las rutas privadas
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
