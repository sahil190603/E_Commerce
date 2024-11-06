import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/auth/register/", formData);
      alert("Registration Successful");
      navigate('/');
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <h3 className="card-title text-center mb-4">Registration Form</h3>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  className="form-control mb-2"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  className="form-control mb-2"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  className="form-control mb-2"
                  required
                />
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  onChange={handleChange}
                  className="form-control mb-2"
                  required
                />
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  onChange={handleChange}
                  className="form-control mb-2"
                  required
                />
                 <button type="submit" className="btn btn-primary">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
