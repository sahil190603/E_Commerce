import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ProductList from "../pages/Admin/Productlist";
import ProductForm from "../pages/Admin/Productform";
import Login from "../components/Login/login";
import Register from "../components/Login/register";
import HomePage from "../pages/User/Home"
import PrivateRoute from "./PrivateRoute";
import { AuthContext } from "../Context/AuthProvider";
import { useNavigate } from "react-router-dom";
import CartPage from "../pages/User/Cart";
import OrderHistoryPage from "../pages/User/Order_history";

const MainRoute = () => {
  const { isAuth, role } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth && location.pathname === "/") {
      if (role === "Admin") {
        navigate('/list', { replace: true });
      } else if (role === "User") {
        navigate('/home', { replace: true });
      }
    }
  }, [isAuth, role, location.pathname]);

  return (
    <div className="App">
      <Routes>
        {/* general route */}
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />

        {/* User route */}
        <Route path="/home" element={<PrivateRoute allowedRoles={['User']}><HomePage /></PrivateRoute>} />
        <Route path="/cart" element={<PrivateRoute allowedRoles={['User']}><CartPage /></PrivateRoute>} />
        <Route path="/Order_history" element={<PrivateRoute allowedRoles={['User']}><OrderHistoryPage/></PrivateRoute>} />

       {/* admin route */}
        <Route path="/list" element={<PrivateRoute allowedRoles={['Admin']}><ProductList /></PrivateRoute>} />
        <Route path="/add" element={<PrivateRoute allowedRoles={['Admin']}><ProductForm /></PrivateRoute>} />
        <Route path="/edit/:id" element={<PrivateRoute allowedRoles={['Admin']}><ProductForm /></PrivateRoute>} />
   
      </Routes>
    </div>
  );
};

export default MainRoute;
