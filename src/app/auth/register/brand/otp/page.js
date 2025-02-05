"use client";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import InputComponent from "@/app/Components/SharedComponents/InputComponent";
import React, { useState } from "react";

const OtpPage = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  return (
    <section className="flex items-center justify-center h-screen w-3/12 mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-center my-2">Almost There</h1>
        <p className="text-center text-sm mb-4">
          Pleas enter the 6-digit code sent to your email for verification.
        </p>
        <form className="space-y-4">
          <div className="flex gap-4">
            {otp.map((char, index) => (
              <InputComponent key={index} onKeyDown={(e) => handleKeyDown(e, index)} />
            ))}
          </div>

          <ButtonComponent label="Verify" />
        </form>
        <p className="text-xs mt-2 text-center">
          Didn't recieve any code? Request a new code in 30s
        </p>
      </div>
    </section>
  );
};

export default OtpPage;
