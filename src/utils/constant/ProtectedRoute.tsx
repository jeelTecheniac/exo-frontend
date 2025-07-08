import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LoaderProvider } from "../../context/LoaderProvider";

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated, "isauth");

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return <LoaderProvider>{children}</LoaderProvider>;
};

export default ProtectedRoute;
