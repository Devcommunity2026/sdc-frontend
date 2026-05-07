import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Header from "../components/Header";

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
        { withCredentials: true }
      );

      if (res.data.success) {
        localStorage.setItem("verifyEmail", email);
        navigate("/verify");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="w-full">

      {/* HEADER */}
      <Header
        heading1="Create"
        heading2="Account"
        subtext="Join our developer community and start building"
      />

      {/* CARD */}
      <div className="flex justify-center px-4 pb-16 -mt-10 sm:-mt-12">
        <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-xl
        bg-card dark:bg-dark-card
        border border-border dark:border-dark-border
        backdrop-blur-md">

          <form onSubmit={handleRegister} className="flex flex-col gap-4">

            {/* NAME */}
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className="p-3 rounded-lg border 
              bg-background dark:bg-dark-input
              border-border dark:border-dark-border
              focus:ring-2 focus:ring-primary
              outline-none transition"
            />

            {/* EMAIL */}
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="p-3 rounded-lg border 
              bg-background dark:bg-dark-input
              border-border dark:border-dark-border
              focus:ring-2 focus:ring-primary
              outline-none transition"
            />

            {/* PASSWORD */}
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              className="p-3 rounded-lg border 
              bg-background dark:bg-dark-input
              border-border dark:border-dark-border
              focus:ring-2 focus:ring-primary
              outline-none transition"
            />

            <Button className="w-full mt-2">
              Register
            </Button>

          </form>

          {/* LOGIN REDIRECT */}
          <div className="mt-6 text-center text-sm 
          text-muted-foreground dark:text-dark-muted-foreground">
            Already have an account?
          </div>

          <Button
            variant="outline"
            className="w-full mt-2"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>

        </div>
      </div>
    </div>
  );
};

export default Register;