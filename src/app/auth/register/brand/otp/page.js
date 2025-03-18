"use client";
import React, { useState, useRef } from "react";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import { SendOtp } from "@/redux/services/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const OtpPage = () => {
  const otpLength = 6;
  const [otp, setOtp] = useState(new Array(otpLength).fill(""));
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const router = useRouter();

  const handleChange = (e, index) => {
    let value = e.target.value;

    if (!/^\d?$/.test(value)) return; // Allow only one digit

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next input if not last and value is entered
    if (index < otpLength - 1 && value) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    
    if (otpCode.length !== otpLength) {
      return;
    }

    setLoading(true);
  
    // Ensure localStorage is available and email exists
    let email = null;
    if (typeof window !== "undefined") {
      email = localStorage.getItem("registration_email") || "";
    }
    if (!email) {
      console.error("No email found in localStorage");
      setLoading(false);
      return;
    }
    const payload = {
      email,
      otpCode,
      notificationType: "Registration otp",
    };
    try {
      const response = await SendOtp(payload);
      console.log("RESPONSE:", response);
      toast.success("OTP verified successfully!");
      router.push('/auth/login/brand')
      setOtp(new Array(otpLength).fill(""));
    } catch (error) {
      console.log("OTP Verification Error:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <section className="flex items-center justify-center h-screen w-3/12 mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-center my-2">Almost There</h1>
        <p className="text-center text-sm mb-4">
          Please enter the 6-digit code sent to your email for verification.
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex gap-4">
            {otp.map((char, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                value={char}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="text-center w-12 h-12 text-lg border border-primary rounded-md"
                maxLength={1}
              />
            ))}
          </div>


          <ButtonComponent label={loading ? "Verifying..." : "Verify"} disabled={loading} />
        </form>
        <p className="text-xs mt-2 text-center">
          Didn't receive any code? Request a new code in 30s
        </p>
      </div>
    </section>
  );
};

export default OtpPage;
