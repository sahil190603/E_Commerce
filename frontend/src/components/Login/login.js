
import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setUser, setToken, setIsAuth, setRole } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/login/",
        formData
      );
      const { access } = response.data;
      const tokenPayload = JSON.parse(atob(access.split(".")[1]));
      setUser(tokenPayload);
      setToken(access);
      setIsAuth(true);
      setRole(tokenPayload.role);
      
      localStorage.setItem("authTokens", access);
      localStorage.setItem("userDetails", JSON.stringify(tokenPayload));
      localStorage.setItem("userId", tokenPayload.user_id);

      if (tokenPayload.role === "Admin") {
        navigate('/list', { replace: true });
      } else {
        navigate('/home', { replace: true });
      }
    } catch (error) {
      setErrorMessage("Wrong username or password. Please try again.");
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit} className="my-4">
                <h3 className="card-title text-center mb-4">Login</h3>
                {errorMessage && (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                )}
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-control mb-2"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control mb-2"
                  required
                />
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


