"use client";
import React, { useState, useContext } from "react";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import InputComponent from "@/app/Components/SharedComponents/InputComponent";
import Link from "next/link";
import { authContext } from "@/assets/context/use-context";

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
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="flex items-center justify-center h-screen md:w-4/12 w-11/12 mx-auto">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-center my-2">
          Login as an Influencer
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
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
            label={loading ? "Logging In..." : "Login as an Influencer"}
            disabled={loading}
          />
        </form>
        <p className="text-xs mt-2">
          Dont have an account?{" "}
          <Link href="/auth/register/brand" className="text-link">
            Sign Up here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default InfluencerLogin;
