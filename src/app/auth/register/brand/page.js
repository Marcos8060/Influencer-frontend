"use client";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import InputComponent from "@/app/Components/SharedComponents/InputComponent";
import { RegisterBrand } from "@/redux/services/auth";
import Link from "next/link";
import React, { useState } from "react";

const BrandRegister = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await RegisterBrand(formData);
      console.log("REGISTER_RESPONSE ", response);
    } catch (error) {
      console.log("ERROR_REGISTERING", error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="flex items-center justify-center h-screen md:w-4/12 w-11/12 mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-center my-2">
          Register as a Brand
        </h1>
        <p className="text-center text-sm mb-3">
          Start on Influencer Platform as a Brand, if you are an influencer, you
          can sign up{" "}
          <Link href="/auth/register/influencer" className="text-link">
            here.
          </Link>
        </p>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-xs" htmlFor="firstname">
              First Name*
            </label>
            <InputComponent name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div>
            <label className="text-xs" htmlFor="firstname">
              Last Name*
            </label>
            <InputComponent name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
          <div>
            <label className="text-xs" htmlFor="firstname">
              Email*
            </label>
            <InputComponent name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label className="text-xs" htmlFor="firstname">
              Password*
            </label>
            <InputComponent name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <ButtonComponent type="submit" label={loading ? "Registering..." : "Register as a Brand"} disabled={loading} />
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

export default BrandRegister;
