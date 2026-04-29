import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

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
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4
bg-background dark:bg-dark-background transition-colors">

      <div className="w-full max-w-[400px] p-6 sm:p-7 rounded-2xl shadow-xl 
      bg-white dark:bg-dark-background border border-black/5 dark:border-white/10">

        <h2 className="text-xl sm:text-2xl font-semibold text-center 
        text-foreground dark:text-dark-foreground mb-5 sm:mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">

          {/* Email */}
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg border 
            bg-white dark:bg-[#1a1a1a]
            text-black dark:text-white
            outline-none focus:ring-2 focus:ring-primary
            placeholder:text-gray-400"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg border 
            bg-white dark:bg-[#1a1a1a]
            text-black dark:text-white
            outline-none focus:ring-2 focus:ring-primary
            placeholder:text-gray-400"
          />

          {/* Login Button */}
          <Button className="w-full mt-2">
            Login
          </Button>

        </form>

        {/* Register Redirect */}
        <div className="mt-4 sm:mt-5 text-center text-sm text-gray-500 dark:text-gray-400">
          Don’t have an account?
        </div>

        <Button
          variant="outline"
          className="w-full mt-2 border border-primary text-primary hover:bg-primary/10"
          onClick={() => navigate("/register")}
        >
          Create Account
        </Button>

      </div>
    </div>
  );
};

export default Login;