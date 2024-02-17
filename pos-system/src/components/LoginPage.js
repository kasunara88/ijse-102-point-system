import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data =  {
            "username": username,
            "password": password
        }
        const response = await axios.post('http://localhost:8080/auth/login', data);
        if(response.status === 200) {
            localStorage.setItem("token", response.data);
            alert("Login Successful");
            navigate("/");

        }else{
            alert("Login Failed");
        }

      
    }

    return (
        <div className="login-box">
        <div className="text-center mb-4">
          <h1 className="text-center font-bold text-3xl">User Login</h1>
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Password"
            />
          </div>
          <div className="text-end">
          <button type="submit" className="btn btn-warning">
            Login
          </button>
          <button className="btn btn-warning ms-2"><Link to="/register">Register</Link></button>
          </div>
        </form>
      </div>
    );
}
export default LoginPage;