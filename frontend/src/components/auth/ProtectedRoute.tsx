import React, { useEffect } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { Box } from "@mui/material";

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const { user } = useAuth();

  useEffect(() => {}, [user]);

  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;

  return <>{children}</>;
};

export default ProtectedRoute;
