"use client";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import InputComponent from "@/app/Components/SharedComponents/InputComponent";
import { RegisterInfluencer } from "@/redux/services/auth";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const InfluencerRegister = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await RegisterInfluencer(formData);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      console.log("REGISTER_RESPONSE ", response);
      if (response?.email && typeof response.email === "string") {
        if (typeof window !== "undefined") {
          localStorage.setItem("registration_email", response.email);
        }
      }      
      toast.success("Please check your email for the OTP!");
      // router.push("/auth/register/otp");
    } catch (error) {
      console.log("ERROR ", error);
      // toast.error(error.me);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="flex items-center justify-center h-screen md:w-4/12 w-11/12 mx-auto">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-center my-2">
          Register as Influencer
        </h1>
        <p className="text-center text-sm mb-3">
          If you are an Brand, you
          can sign up{" "}
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
            <InputComponent
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <ButtonComponent
            type="submit"
            label={loading ? "Registering..." : "Register as Influencer"}
            disabled={loading}
          />
        </form>
        <p className="text-xs mt-2">
          Already have an account?{" "}
          <Link href="/auth/login/brand" className="text-link">
            Login here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default InfluencerRegister;

