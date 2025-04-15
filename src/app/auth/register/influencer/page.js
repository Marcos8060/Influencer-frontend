"use client";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import InputComponent from "@/app/Components/SharedComponents/InputComponent";
import { RegisterInfluencer } from "@/redux/services/auth";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

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

      // Check if response is a valid Axios response object
      if (response?.status === 200) {
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
        // Handle error messages properly
        const errorMessage =
          response?.errorMessage?.[0] ||
          "Something went wrong. Please try again.";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.log(response);
      // Extract error message properly
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
    <section className="flex items-center justify-center h-screen md:w-4/12 w-11/12 mx-auto">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-center my-2">
          Register as Influencer
        </h1>
        <p className="text-center text-sm mb-3">
          If you are an Brand, you can sign up{" "}
          <Link href="/auth/register/brand" className="text-link">
            here.
          </Link>
        </p>
        <form onSubmit={handleRegister} className="space-y-2">
          <div>
            <label className="text-xs" htmlFor="firstName">
              First Name*
            </label>
            <InputComponent
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="text-xs" htmlFor="lastName">
              Last Name*
            </label>
            <InputComponent
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="text-xs" htmlFor="email">
              Email*
            </label>
            <InputComponent
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="text-xs" htmlFor="password">
              Password*
            </label>
            <div className="relative">
              <InputComponent
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-3 right-3"
              >
                {passwordVisible ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>
          </div>
          <div>
            <label className="text-xs" htmlFor="confirmPassword">
              Confirm Password*
            </label>
            <div className="relative">
              <InputComponent
                type={confirmPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute top-3 right-3"
              >
                {confirmPasswordVisible ? (
                  <IoEyeOffOutline />
                ) : (
                  <IoEyeOutline />
                )}
              </button>
            </div>
          </div>
          <ButtonComponent
            type="submit"
            label={loading ? "Registering..." : "Register as Influencer"}
            disabled={loading}
          />
        </form>
        <p className="text-xs mt-2">
          Already have an account?{" "}
          <Link href="/auth/login/influencer" className="text-link">
            Login here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default InfluencerRegister;
