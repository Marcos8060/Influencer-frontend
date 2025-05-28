"use client";
import React, { useState, useContext } from "react";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import InputComponent from "@/app/Components/SharedComponents/InputComponent";
import Link from "next/link";
import { authContext } from "@/assets/context/use-context";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

const InfluencerLogin = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { logInfluencer } = useContext(authContext);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await logInfluencer(formData.email, formData.password);
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      // Error handling can be added here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=2670&auto=format&fit=crop"
            alt="Content Creator Setup"
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
                Welcome <br />
                Back Creator
              </h1>
              <p className="text-xl leading-relaxed opacity-90">
                Ready to continue creating magic? Your audience awaits.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-sm">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm opacity-80">Active Creators</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">2M+</div>
                <div className="text-sm opacity-80">Collaborations</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">$5M+</div>
                <div className="text-sm opacity-80">Paid Out</div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex -space-x-2">
              <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=50&h=50&fit=crop&crop=faces" className="w-8 h-8 rounded-full border-2 border-white" alt="Creator" />
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=faces" className="w-8 h-8 rounded-full border-2 border-white" alt="Creator" />
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=faces" className="w-8 h-8 rounded-full border-2 border-white" alt="Creator" />
            </div>
            <p className="text-sm opacity-80">Join successful creators on our platform</p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="mt-2 text-gray-600">Continue your creative journey</p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
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
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm font-medium text-primary hover:text-primary-dark"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <InputComponent
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="pl-10 block w-full rounded-lg border-gray-300"
                  placeholder="••••••••"
                />
              </div>
            </div>

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
                      Authenticating...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Continue Creating <FiArrowRight className="ml-2" />
                    </span>
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

            <div className="text-center text-sm">
              <p className="text-gray-600">
                New to the platform?{" "}
                <Link
                  href="/auth/register/influencer"
                  className="font-medium text-primary hover:text-primary-dark"
                >
                  Start your creator journey
                </Link>
              </p>
            </div>
          </form>

          {/* <div className="text-center text-xs text-gray-500">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default InfluencerLogin;