"use client";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import InputComponent from "@/app/Components/SharedComponents/InputComponent";
import { RegisterInfluencer } from "@/redux/services/auth";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import Image from "next/image";

const InfluencerRegister = () => {
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setLoading(true);
    const { confirmPassword, ...registrationData } = formData;
    try {
      const response = await RegisterInfluencer(registrationData);

      if (response?.status === 200) {
        localStorage.removeItem("brand_token");
        localStorage.removeItem("influencer_token");
        
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        if (response?.data?.email && typeof response.data.email === "string") {
          if (typeof window !== "undefined") {
            localStorage.setItem("influencer_email", response.data.email);
          }
        }

        toast.success("Please check your email for the OTP!");
        router.push("/auth/register/influencer/otp");
      } else {
        const errorMessage =
          response?.errorMessage?.[0] ||
          "Something went wrong. Please try again.";
        toast.error(errorMessage);
      }
    } catch (error) {
      let errorMessage = "Something went wrong. Please try again.";
      if (error.response && error.response.data) {
        errorMessage = error.response.data.errorMessage?.[0] || errorMessage;
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1536924430914-91f9e2041b83?q=80&w=2666&auto=format&fit=crop"
            alt="Influencer Creating Content"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/80 to-secondary/90 backdrop-blur-[2px]"></div>
        </div>

        {/* Content */}
        <div className="relative w-full p-12 flex flex-col justify-between text-white z-10">
          <div className="w-12 h-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="opacity-80"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>

          <div className="space-y-8 max-w-lg">
            <div className="space-y-6">
              <h1 className="text-6xl font-bold leading-tight">
                Amplify Your <br />
                Influence
              </h1>
              <p className="text-xl leading-relaxed opacity-90">
                You've built your following through creativity and authenticity. 
                Now take your influence to the next level.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-sm">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                  </svg>
                </span>
                <p>Premium brand collaborations & sponsorships</p>
              </div>

              <div className="flex items-center space-x-3 text-sm">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </span>
                <p>Track your engagement & growth metrics</p>
              </div>

              <div className="flex items-center space-x-3 text-sm">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                  </svg>
                </span>
                <p>Exclusive access to brand campaigns</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=50&h=50&fit=crop&crop=faces" className="w-8 h-8 rounded-full border-2 border-white" alt="Creator" />
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=faces" className="w-8 h-8 rounded-full border-2 border-white" alt="Creator" />
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=faces" className="w-8 h-8 rounded-full border-2 border-white" alt="Creator" />
              </div>
              <div className="text-sm">
                <p className="font-medium">Join 2,000+ successful creators</p>
                <p className="opacity-80">Earning $5K+ monthly through partnerships</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <div className="mt-3">
              <select className="ml-2 text-sm font-medium text-gray-700 focus:outline-none cursor-pointer">
                <option value="en-UK">English (UK)</option>
                <option value="en-US">English (US)</option>
              </select>
            </div>
          </div>

          <form onSubmit={handleRegister} className="mt-8 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <InputComponent
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="pl-10 block w-full rounded-lg border-gray-300"
                    placeholder="First Name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <InputComponent
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="pl-10 block w-full rounded-lg border-gray-300"
                    placeholder="Last Name"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <InputComponent
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="pl-10 block w-full rounded-lg border-gray-300"
                  placeholder="Email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <InputComponent
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="pl-10 pr-10 block w-full rounded-lg border-gray-300"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {passwordVisible ? (
                    <IoEyeOffOutline className="text-gray-400" />
                  ) : (
                    <IoEyeOutline className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <InputComponent
                  type={confirmPasswordVisible ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="pl-10 pr-10 block w-full rounded-lg border-gray-300"
                  placeholder="Confirm Password"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {confirmPasswordVisible ? (
                    <IoEyeOffOutline className="text-gray-400" />
                  ) : (
                    <IoEyeOutline className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                required
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                I have read and agreed to the Terms of Service and Privacy Policy
              </label>
            </div>

            <div>
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <ButtonComponent
                  type="submit"
                  label={
                    loading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Creating account...
                      </span>
                    ) : (
                      "Create Account"
                    )
                  }
                  disabled={loading}
                  className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${
                    loading
                      ? "bg-primary/70 cursor-not-allowed"
                      : "bg-primary hover:bg-primary-dark"
                  }`}
                />
              </motion.div>
            </div>

            {/* <div className="text-center">
              <p className="text-sm text-gray-600">Or</p>
              <div className="mt-4 space-x-4">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <img
                    className="h-5 w-5 mr-2"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                  />
                  Signup with Google
                </button>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <img
                    className="h-5 w-5 mr-2"
                    src="https://www.svgrepo.com/show/448234/facebook.svg"
                    alt="Facebook"
                  />
                  Signup with Facebook
                </button>
              </div>
            </div> */}

            <div className="text-center text-sm">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/auth/login/influencer"
                  className="font-medium text-primary hover:text-primary-dark"
                >
                  Log In
                </Link>
              </p>
              <p className="mt-2 text-gray-500">
                Are you a brand?{" "}
                <Link
                  href="/auth/register/brand"
                  className="text-primary hover:text-primary-dark"
                >
                  Register as brand instead
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InfluencerRegister;