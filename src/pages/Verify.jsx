import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

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
        { email, otp },
        { withCredentials: true }
      );

      if (res.data.success) {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/");
      }

    } catch (err) {
      alert(err.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4
    bg-background dark:bg-dark-background transition-colors">
      <div className="w-full max-w-[400px] p-6 sm:p-7 rounded-2xl shadow-xl 
      bg-white dark:bg-dark-background border border-black/5 dark:border-white/10">

        <h2 className="text-xl sm:text-2xl font-semibold text-center 
        text-foreground dark:text-dark-foreground mb-5 sm:mb-6">
          Verify OTP 🔐
        </h2>

        <form onSubmit={handleVerify} className="flex flex-col gap-3 sm:gap-4">

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="p-3 rounded-lg border 
            bg-white dark:bg-[#1a1a1a]
            text-black dark:text-white
            outline-none focus:ring-2 focus:ring-primary
            placeholder:text-gray-400 text-center"
          />

          <Button className="w-full mt-2">
            Verify
          </Button>

        </form>

      </div>
    </div>
  );
};

export default Verify;