import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  // If no token is found, redirect to the login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If the token exists, render the child routes (via Outlet)
  return <Outlet />;
};

export default ProtectedRoute;