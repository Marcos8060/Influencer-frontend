"use client";
import React, { useState, useRef } from "react";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import InputComponent from "@/app/Components/SharedComponents/InputComponent";

const OtpPage = () => {
  const otpLength = 6;
  const [otp, setOtp] = useState(new Array(otpLength).fill(""));
  const inputRefs = useRef([]);

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
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <section className="flex items-center justify-center h-screen w-3/12 mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-center my-2">Almost There</h1>
        <p className="text-center text-sm mb-4">
          Please enter the 6-digit code sent to your email for verification.
        </p>
        <form className="space-y-4">
          <div className="flex gap-4">
            {otp.map((char, index) => (
              <InputComponent
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                value={char}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="text-center w-12 h-12 text-lg border rounded-md"
                maxLength={1}
              />
            ))}
          </div>

          <ButtonComponent label="Verify" onClick={() => console.log("OTP:", otp.join(""))} />
        </form>
        <p className="text-xs mt-2 text-center">
          Didn't receive any code? Request a new code in 30s
        </p>
      </div>
    </section>
  );
};

export default OtpPage;
