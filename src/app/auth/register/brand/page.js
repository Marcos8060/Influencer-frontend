"use client";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import InputComponent from "@/app/Components/SharedComponents/InputComponent";
import { RegisterBrand } from "@/redux/services/auth";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiPhone } from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";
import { countryPhoneData } from "@/app/Components/Onboarding/Brand/brand-details/countryPhoneData";
import { Select } from "antd";

const CountryCodeDropdown = ({ value, onChange }) => (
  <Select
    showSearch
    value={value}
    onChange={onChange}
    style={{ width: 100 }}
    optionFilterProp="label"
    filterOption={(input, option) =>
      option.label.toLowerCase().includes(input.toLowerCase())
    }
    dropdownStyle={{ zIndex: 2000 }}
  >
    {countryPhoneData.map((country) => (
      <Select.Option
        key={country.dial_code}
        value={country.dial_code}
        label={`${country.name} ${country.dial_code}`}
      >
        <span role="img" aria-label={country.code} style={{ marginRight: 8 }}>
          <img
            src={`https://flagcdn.com/24x18/${country.code.toLowerCase()}.png`}
            alt={country.code}
            style={{ width: 20, height: 14, borderRadius: 2, objectFit: "cover", display: "inline-block", marginRight: 6 }}
          />
        </span>
        {country.name} {country.dial_code}
      </Select.Option>
    ))}
  </Select>
);

const BrandRegister = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");
  const router = useRouter();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\+?(\d{1,3})?[-. ]?\(?\d{1,3}\)?[-. ]?\d{1,4}[-. ]?\d{1,4}[-. ]?\d{1,9}$/;
    return phoneRegex.test(phone);
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    const fullPhone = `${countryCode}${formData.phoneNumber.replace(/^0+/, "")}`;
    if (!validatePhoneNumber(fullPhone)) {
      toast.error("Please enter a valid phone number");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    const { confirmPassword, ...registrationData } = formData;
    registrationData.phoneNumber = fullPhone;
    try {
      const response = await RegisterBrand(registrationData);

      if (response?.status === 200) {
        localStorage.removeItem("brand_token");
        localStorage.removeItem("influencer_token");
        
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          phoneNumber: "",
        });

        if (response?.data?.email && typeof response.data.email === "string") {
          if (typeof window !== "undefined") {
            localStorage.setItem("registration_email", response.data.email);
          }
        }

        toast.success("Please check your email for the OTP!");
        router.push("/auth/register/brand/otp");
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
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop"
            alt="Brand Marketing Team"
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
              <h1 className="text-6xl font-bold leading-tight">
                Connect with <br />
                Top Creators
              </h1>
              <p className="text-xl leading-relaxed opacity-90">
                Join leading brands leveraging authentic creator partnerships to drive growth and engagement.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-sm">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">20K+</div>
                <div className="text-sm opacity-80">Creators</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm opacity-80">Brands</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm opacity-80">Success Rate</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </span>
                <p>Access to verified, high-quality creators</p>
              </div>

              <div className="flex items-center space-x-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </span>
                <p>Real-time campaign analytics & ROI tracking</p>
              </div>

              <div className="flex items-center space-x-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </span>
                <p>Smart creator matching technology</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex -space-x-2">
              <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=50&h=50&fit=crop&crop=faces" className="w-8 h-8 rounded-full border-2 border-white" alt="Brand" />
              <img src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=50&h=50&fit=crop&crop=faces" className="w-8 h-8 rounded-full border-2 border-white" alt="Brand" />
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=50&h=50&fit=crop&crop=faces" className="w-8 h-8 rounded-full border-2 border-white" alt="Brand" />
            </div>
            <p className="text-sm opacity-80">Join leading brands already on our platform</p>
          </div>
        </div>
      </div>

      {/* Right Section - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Register Your Brand</h2>
            <p className="mt-2 text-gray-600">Connect with creators who align with your brand</p>
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
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
                  </label>
              <div className="mt-1 relative flex items-center">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone className="text-gray-400" />
                    </div>
                    <InputComponent
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      className="pl-28 block w-full rounded-lg border-gray-300"
                      placeholder="(555) 123-4567"
                      prefix={
                        <CountryCodeDropdown value={countryCode} onChange={setCountryCode} />
                      }
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
                      placeholder="••••••••"
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
                      placeholder="••••••••"
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
                    "Start Collaborating"
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
                Already have an account?{" "}
                <Link
                  href="/auth/login/brand"
                  className="font-medium text-primary hover:text-primary-dark"
                >
                  Sign in
                </Link>
              </p>
              <p className="mt-2 text-gray-500">
                Are you a creator?{" "}
                <Link
                  href="/auth/register/influencer"
                  className="text-primary hover:text-primary-dark"
                >
                  Register as creator instead
                </Link>
              </p>
            </div>
          </form>
          </div>
      </div>
    </div>
  );
};

export default BrandRegister;