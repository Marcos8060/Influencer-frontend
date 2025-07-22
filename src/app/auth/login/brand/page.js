"use client";
import React, { useState, useContext } from "react";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import InputComponent from "@/app/Components/SharedComponents/InputComponent";
import Link from "next/link";
import { authContext } from "@/assets/context/use-context";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { FaBuilding } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { InstagramOutlined } from "@ant-design/icons";
import { instagramLogin, tiktokLogin } from "@/redux/services/auth/socials";
import toast from "react-hot-toast";
import { Modal } from 'antd';
import { forgotPassword } from "@/redux/services/auth";

const BrandLogin = () => {
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState({
    instagram: false,
    tiktok: false,
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotForm, setForgotForm] = useState({ email: '', password: '', confirm: '' });
  const [forgotLoading, setForgotLoading] = useState(false);
  const { loginUser } = useContext(authContext);
  // const auth = useAuth();
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showForgotConfirm, setShowForgotConfirm] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleInstagramConnect = async () => {
    try {
      setSocialLoading((prev) => ({ ...prev, instagram: true }));
      const response = await instagramLogin();
      window.location.href = response.message;
    } catch (error) {
      toast.error("Instagram connection failed");
    } finally {
      setSocialLoading((prev) => ({ ...prev, instagram: false }));
    }
  };

  const handleTiktokConnect = async () => {
    try {
      setSocialLoading((prev) => ({ ...prev, tiktok: true }));
      const response = await tiktokLogin();
      window.location.href = response.message;
    } catch (error) {
      toast.error("TikTok connection failed");
    } finally {
      setSocialLoading((prev) => ({ ...prev, tiktok: false }));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginUser(formData.email, formData.password);
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

  const handleForgotChange = (e) => {
    setForgotForm({ ...forgotForm, [e.target.name]: e.target.value });
  };

  const handleForgotSubmit = async () => {
    setForgotLoading(true);
    // const payload = {
    //   auth,

    // }
    try {
      const response = await forgotPassword({
        email: forgotForm.email,
        password: forgotForm.password,
      });
      console.log("reset_response ", response)
      toast.success('Password reset successful!');
      setForgotModalOpen(false);
    } catch (error) {
      toast.error(error?.response?.data?.errorMessage?.[0] || "Failed to reset password.");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop"
            alt="Brand Strategy Meeting"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/80 to-secondary/90 backdrop-blur-[2px]"></div>
        </div>

        {/* Content */}
        <div className="relative w-full p-12 flex flex-col justify-between text-white z-10">
          <div className="w-12 h-12">
            <FaBuilding className="w-full h-full opacity-80" />
          </div>

          <div className="space-y-8 max-w-lg">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold leading-tight">
                Welcome Back <br />
                to Growth
              </h1>
              <p className="text-xl leading-relaxed opacity-90">
                Continue building impactful creator partnerships and driving brand success.
              </p>
            </div>

            {/* <div className="grid grid-cols-3 gap-4 max-w-sm">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">1M+</div>
                <div className="text-sm opacity-80">Reach</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">85%</div>
                <div className="text-sm opacity-80">ROI</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm opacity-80">Support</div>
              </div>
            </div> */}

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </span>
                <p>Premium creator partnerships</p>
              </div>

              <div className="flex items-center space-x-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </span>
                <p>Performance analytics dashboard</p>
              </div>

              <div className="flex items-center space-x-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </span>
                <p>Dedicated success manager</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex -space-x-2">
              <img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=50&h=50&fit=crop&crop=faces" className="w-8 h-8 rounded-full border-2 border-white" alt="Company" />
              <img src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=50&h=50&fit=crop&crop=faces" className="w-8 h-8 rounded-full border-2 border-white" alt="Company" />
              <img src="https://images.unsplash.com/photo-1622675363311-3e1904dc1885?w=50&h=50&fit=crop&crop=faces" className="w-8 h-8 rounded-full border-2 border-white" alt="Company" />
            </div>
            <p className="text-sm opacity-80">Trusted by leading brands worldwide</p>
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="mt-2 text-gray-600">Access your brand dashboard</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              // onClick={handleInstagramConnect}
              disabled={socialLoading.instagram}
              type="button"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-[#E1306C] to-[#F77737] text-white font-semibold text-sm shadow hover:from-[#C13584] hover:to-[#F56040] transition-all disabled:opacity-60"
            >
              <InstagramOutlined className="text-xl" />
              {socialLoading.instagram
                ? "Connecting..."
                : "Sign in with Instagram"}
            </button>
            <button
              // onClick={handleTiktokConnect}
              disabled={socialLoading.tiktok}
              type="button"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-black to-gray-800 text-white font-semibold text-sm shadow hover:from-gray-900 hover:to-black transition-all disabled:opacity-60"
            >
              <SiTiktok className="text-lg" />
              {socialLoading.tiktok ? "Connecting..." : "Sign in with TikTok"}
            </button>
          </div>

          <div className="flex items-center">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="px-4 text-sm text-gray-500 bg-white">OR</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Business Email
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
                  placeholder="company@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <button
                  type="button"
                  className="text-sm font-medium text-primary hover:text-primary-dark bg-transparent border-none outline-none"
                  onClick={() => setForgotModalOpen(true)}
                >
                  Forgot password?
                </button>
              </div>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <InputComponent
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="pl-10 pr-10 block w-full rounded-lg border-gray-300"
                  placeholder="••••••••"
                />
                <span
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </span>
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
                      Continue to Dashboard <FiArrowRight className="ml-2" />
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
                  href="/auth/register/brand"
                  className="font-medium text-primary hover:text-primary-dark"
                >
                  Create a brand account
                </Link>
              </p>
              <p className="mt-2 text-gray-500">
                Are you a creator?{" "}
                <Link
                  href="/auth/login/influencer"
                  className="text-primary hover:text-primary-dark"
                >
                  Sign in as creator
                </Link>
              </p>
            </div>
          </form>
          <Modal
            open={forgotModalOpen}
            onCancel={() => setForgotModalOpen(false)}
            footer={null}
            centered
            title="Reset Password"
          >
            <div className="space-y-4">
              <InputComponent
                type="email"
                name="email"
                value={forgotForm.email}
                onChange={handleForgotChange}
                placeholder="Enter your email"
                required
              />
              <div className="relative">
                <InputComponent
                  type={showForgotPassword ? 'text' : 'password'}
                  name="password"
                  value={forgotForm.password}
                  onChange={handleForgotChange}
                  placeholder="New password"
                  required
                  className="pr-10"
                />
                <span
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowForgotPassword((v) => !v)}
                >
                  {showForgotPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </span>
              </div>
              <div className="relative">
                <InputComponent
                  type={showForgotConfirm ? 'text' : 'password'}
                  name="confirm"
                  value={forgotForm.confirm}
                  onChange={handleForgotChange}
                  placeholder="Confirm new password"
                  required
                  className="pr-10"
                />
                <span
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowForgotConfirm((v) => !v)}
                >
                  {showForgotConfirm ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </span>
              </div>
              <ButtonComponent
                label={forgotLoading ? 'Resetting...' : 'Reset Password'}
                className="w-full bg-primary text-white"
                onClick={handleForgotSubmit}
                disabled={forgotLoading || !forgotForm.email || !forgotForm.password || forgotForm.password !== forgotForm.confirm}
              />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default BrandLogin;