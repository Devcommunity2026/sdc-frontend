import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Header from "../components/Header";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://127.0.0.1:3000/auth/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.data.success) {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "/";
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="w-full">

      <Header
        heading1="Welcome"
        heading2="Back"
        subtext="Login to continue your journey with the community"
      />

        <div className="flex justify-center px-4 pb-16 -mt-10 sm:-mt-12">
        <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-xl
        bg-card dark:bg-dark-card
        border border-border dark:border-dark-border
        backdrop-blur-md">

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" autoComplete="off">

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              className="p-3 rounded-lg border 
              bg-background dark:bg-dark-input
              border-border dark:border-dark-border
              focus:ring-2 focus:ring-primary
              outline-none transition"
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              className="p-3 rounded-lg border 
              bg-background dark:bg-dark-input
              border-border dark:border-dark-border
              focus:ring-2 focus:ring-primary
              outline-none transition"
            />

            <Button className="w-full mt-2">
              Login
            </Button>

          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground dark:text-dark-muted-foreground">
            Don’t have an account?
          </div>

          <Button
            variant="outline"
            className="w-full mt-2"
            onClick={() => navigate("/register")}
          >
            Create Account
          </Button>

        </div>
      </div>
    </div>
  );
};

export default Login;