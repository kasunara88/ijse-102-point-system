import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data =  {
        "username": username,
        "email": email,
        "password": password,
        "confirmPassword": confirmPassword
    }

    const response = await axios.post('http://localhost:8080/auth/register', data);
    if(response.status === 200) {
        alert("Registration Successful");
        navigate("/login");
    }else{
        console.log("error")
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="login-box">
      <div className="text-center mb-4">
        <h1 className="text-center font-bold">User Registration</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setUsername(e.target.value)}
            id="email"
            placeholder="Username"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            placeholder="Password"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="password"
            placeholder="Password"
          />
        </div>
        <div className="text-end">
        <button type="submit" className="btn btn-primary">
          Register
        </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
