import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { isAuth, role } = useContext(AuthContext);

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
