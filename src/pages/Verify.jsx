import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Header from "../components/Header";

const Verify = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const email = localStorage.getItem("verifyEmail");

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!otp) {
      alert("Enter OTP");
      return;
    }

    try {
      const res = await axios.post(
        "http://127.0.0.1:3000/auth/verify",
        { email, userOtp: otp },
        { withCredentials: true }
      );

      if (res.data.success) {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "/";
      }
    } catch (err) {
      alert(err.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="w-full">

      {/* HEADER */}
      <Header
        heading1="Verify"
        heading2="OTP"
        subtext="Enter the OTP sent to your email"
      />

      {/* CARD */}
      <div className="flex justify-center px-4 pb-16 -mt-10 sm:-mt-12">
        <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-xl
        bg-card dark:bg-dark-card
        border border-border dark:border-dark-border
        backdrop-blur-md">

          <form onSubmit={handleVerify} className="flex flex-col gap-4">

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              autoComplete="one-time-code"
              className="p-3 rounded-lg border text-center 
              bg-background dark:bg-dark-input
              border-border dark:border-dark-border
              focus:ring-2 focus:ring-primary
              outline-none transition tracking-widest"
            />

            <Button className="w-full mt-2">
              Verify
            </Button>

          </form>

        </div>
      </div>
    </div>
  );
};

export default Verify;