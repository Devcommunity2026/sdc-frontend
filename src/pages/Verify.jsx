import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

const Verify = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const email = localStorage.getItem("verifyEmail");
  console.log("VERIFY EMAIL:", email);

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
    <div className="min-h-screen flex items-center justify-center pt-24 
    bg-background dark:bg-dark-background transition-colors">

      <div className="w-[360px] p-7 rounded-2xl shadow-xl 
      bg-white dark:bg-dark-background border border-black/5 dark:border-white/10">

        <h2 className="text-2xl font-semibold text-center 
        text-foreground dark:text-dark-foreground mb-6">
          Verify OTP 🔐
        </h2>

        <form onSubmit={handleVerify} className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="p-3 rounded-lg border 
            bg-background dark:bg-dark-background 
            text-foreground dark:text-dark-foreground
            outline-none focus:ring-2 focus:ring-primary text-center"
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