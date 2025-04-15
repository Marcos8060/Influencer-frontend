"use client";
import React, { useState, useRef, useEffect } from "react";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import { RequestOtp, SendOtp } from "@/redux/services/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const OtpPage = () => {
  const otpLength = 6;
  const [otp, setOtp] = useState(new Array(otpLength).fill(""));
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);
  const router = useRouter();

  // Start the countdown timer when the component mounts
  useEffect(() => {
    if (countdown === 0) return; // Stop the timer when it reaches 0
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
      setCanResend(true);
    }, 1000);

    return () => clearInterval(timer); // Clean up the timer on unmount
  }, [countdown]);

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

  const handlePaste = (e) => {
    const pastedText = e.clipboardData.getData("Text");

    // Only proceed if the pasted text is the right length (6 digits)
    if (pastedText.length === otpLength && /^\d{6}$/.test(pastedText)) {
      const newOtp = pastedText.split("").map((char) => char);
      setOtp(newOtp);
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
      email = localStorage.getItem("influencer_email") || "";
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
      const res = await SendOtp(payload);
      console.log(res);
      if (res.statusCode === 200) {
        toast.success("OTP verified successfully!");
        router.push("/auth/login/influencer");
        setOtp(new Array(otpLength).fill(""));
      } else {
        toast.error("You are not authenticated!");
        setOtp(new Array(otpLength).fill(""));
      }
    } catch (error) {
      console.log("OTP Verification Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (countdown === 0) {
      setCountdown(30); // Reset the countdown
      const influencer_email = localStorage.getItem("influencer_email");
      const payload = {
        email: influencer_email,
        notificationType: "Registration otp",
      };
      const response = await RequestOtp(payload);
      console.log(response);
      if (response.status === 200) {
        toast.success("New OTP sent to your email!");
      } else {
        toast.error(response.errorMessage[0]);
      }
    } else {
      toast.error("Please wait until the timer runs out.");
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
          <div className="flex gap-4" onPaste={handlePaste}>
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

          <ButtonComponent
            label={loading ? "Verifying..." : "Verify"}
            disabled={loading}
          />
        </form>
        <p className="text-xs mt-2 text-center">
          Didn't receive any code?{" "}
          <button
            onClick={handleResendOtp}
            disabled={countdown > 0}
            className={`${
              countdown > 0 ? "cursor-not-allowed opacity-50" : ""
            } text-link`}
          >
            {countdown > 0
              ? `Request new code in ${countdown}s`
              : "Request a new code"}
          </button>
        </p>
      </div>
    </section>
  );
};

export default OtpPage;
