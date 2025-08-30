import React from "react";
import { useAuth } from "./AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Unauthenticated from "../errors/Unauthenticated";

const ProtectedRoute = () => {
  const { token } = useAuth();

  if (!token) {
    return <Unauthenticated />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
