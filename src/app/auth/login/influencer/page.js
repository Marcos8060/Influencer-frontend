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
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-white to-secondary/5">
      <div className="container mx-auto px-4 py-12 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg"
        >
          {/* Card Container */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Decorative Header */}
            <div className="bg-gradient-to-r from-primary to-secondary h-2"></div>

            {/* Content */}
            <div className="px-8 py-10">
              {/* Logo/Branding Area */}
              <div className="flex justify-center mb-8">
                <div className="bg-gradient-to-r from-primary to-secondary p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-center text-color mb-2">
                Welcome Back
              </h1>
              <p className="text-color text-center mb-8">
                Login to your influencer account
              </p>

              {/* Social Login Options */}
              {/* <div className="flex justify-center space-x-4 mb-6">
                <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                  <FaInstagram className="text-pink-600 text-xl" />
                </button>
                <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                  <FaTiktok className="text-black text-xl" />
                </button>
                <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                  <FaYoutube className="text-red-600 text-xl" />
                </button>
              </div> */}

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-input"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-2 bg-white text-sm text-color">
                    Continue with email
                  </span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-color mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-gray-400 text-lg" />
                    </div>
                    <InputComponent
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="pl-12 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-color">
                      Password
                    </label>
                    <Link
                      href="/auth/forgot-password"
                      className="text-sm text-primary hover:text-primary-dark"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="text-gray-400 text-lg" />
                    </div>
                    <InputComponent
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="pl-12 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
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
                          Login <FiArrowRight className="ml-2" />
                        </span>
                      )
                    }
                    disabled={loading}
                    className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${
                      loading
                        ? "bg-primary/70 cursor-not-allowed"
                        : "bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark shadow-md"
                    }`}
                  />
                </motion.div>
              </form>

              {/* Footer */}
              <div className="mt-6 text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                  href="/auth/register/influencer"
                  className="font-medium text-primary hover:text-primary-dark"
                >
                  Sign up here
                </Link>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center text-xs text-gray-400">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            .
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InfluencerLogin;