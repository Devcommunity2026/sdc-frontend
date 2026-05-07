import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Header from "../components/Header";
import Layout from "../components/Layout";

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
    <Layout>

      <div className="w-full min-h-screen bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground">
        <Header
          heading1="Welcome"
          heading2="Back"
          subtext="Login to continue your journey with the community"
        />

        <div className="flex justify-center px-4 pb-16 -mt-10 sm:-mt-12">

          {/* Card */}
          <div className="
          w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-xl
          bg-card dark:bg-dark-card
          border border-border dark:border-dark-border
        ">

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              {/* Email */}
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                className="
                p-3 rounded-lg border outline-none transition
                bg-background dark:bg-dark-input
                text-foreground dark:text-dark-foreground
                border-border dark:border-dark-border
                focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary
              "
              />

              {/* Password */}
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
                className="
                p-3 rounded-lg border outline-none transition
                bg-background dark:bg-dark-input
                text-foreground dark:text-dark-foreground
                border-border dark:border-dark-border
                focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary
              "
              />

              {/* Button */}
              <Button className="w-full mt-2 bg-primary text-primary-foreground hover:bg-primary/90">
                Login
              </Button>

            </form>

            <div className="
            mt-6 text-center text-sm
            text-muted-foreground dark:text-dark-muted-foreground
          ">
              Don’t have an account?
            </div>

            <Button
              variant="outline"
              className="w-full mt-2 border-border dark:border-dark-border"
              onClick={() => navigate("/register")}
            >
              Create Account
            </Button>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;