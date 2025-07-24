import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useRoleRoute } from "../hooks/useRoleRoute";

interface PublicRouteProps {
  children: React.ReactElement;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const {getRoute}=useRoleRoute()

  if (isAuthenticated) {
    return <Navigate to={getRoute("dashboard")} replace />;
  }

  return children;
};

export default PublicRoute;
