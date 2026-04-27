import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

const Register = () => {
  const navigate = useNavigate();

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
        "http://127.0.0.1:3000/auth/register",
        { name, email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
        }
      );

      if (res.data.success) {
        localStorage.setItem("verifyEmail", email);
        navigate("/verify");
      }

    } catch (err) {
      console.log("REGISTER ERROR:", err);
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 
    bg-background dark:bg-dark-background transition-colors">

      <div className="w-[360px] p-7 rounded-2xl shadow-xl 
      bg-white dark:bg-dark-background border border-black/5 dark:border-white/10">

        <h2 className="text-2xl font-semibold text-center 
        text-foreground dark:text-dark-foreground mb-6">
          Create Account 
        </h2>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">

          {/* Name */}
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 rounded-lg border 
            bg-background dark:bg-dark-background 
            text-foreground dark:text-dark-foreground
            outline-none focus:ring-2 focus:ring-primary"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg border 
            bg-background dark:bg-dark-background 
            text-foreground dark:text-dark-foreground
            outline-none focus:ring-2 focus:ring-primary"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg border 
            bg-background dark:bg-dark-background 
            text-foreground dark:text-dark-foreground
            outline-none focus:ring-2 focus:ring-primary"
          />

          {/* Register Button */}
          <Button className="w-full mt-2">
            Register
          </Button>

        </form>

        {/* Redirect to Login */}
        <div className="mt-5 text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?
        </div>

        <Button
          variant="outline"
          className="w-full mt-2 border border-primary text-primary hover:bg-primary/10"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>

      </div>
    </div>
  );
};

export default Register;