import React, { useState } from "react";
import axios from "axios";
import Button from "../components/ui/Button";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
        const res = await axios.post(
            "http://localhost:3000/auth/register",
            { name, email, password },
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
              }
            }
          );

      localStorage.setItem("verifyEmail", email);
      navigate("/verify");

    } catch (err) {
      console.log("REGISTER ERROR:", err.response);
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleRegister}>
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
          className="login-input"
        />

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />

        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />

        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default Register;