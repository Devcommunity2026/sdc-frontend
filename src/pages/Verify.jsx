import React, { useState } from "react";
import axios from "axios";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  // get email from localStorage
  const email = localStorage.getItem("verifyEmail");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/auth/verify",
        {
          email,
          userOtp: otp,
        }
      );

      alert("Verification successful");

      // after verify → login state
      localStorage.setItem("isLoggedIn", "true");

      navigate("/");

    } catch (err) {
      alert(err.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleVerify}>
        <h2>Enter OTP</h2>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="login-input"
        />

        <Button type="submit">Verify</Button>
      </form>
    </div>
  );
};

export default Verify;