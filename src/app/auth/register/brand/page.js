"use client";
import ButtonComponent from "@/Components/SharedComponents/ButtonComponent";
import InputComponent from "@/Components/SharedComponents/InputComponent";
import Link from "next/link";
import React from "react";

const BrandRegister = () => {
  return (
    <section className="flex items-center justify-center h-screen w-4/12 mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-center my-2">Register as a Brand</h1>
        <p className="text-center text-sm mb-3">
          Start on Influencer Platform as a Brand, if you are an influencer, you
          can sign up <Link href="/auth/register/influencer" className="text-link">here.</Link>
        </p>
        <form className="space-y-4">
          <div>
            <label className="text-xs" htmlFor="firstname">
              First Name*
            </label>
            <InputComponent />
          </div>
          <div>
            <label className="text-xs" htmlFor="firstname">
              Last Name*
            </label>
            <InputComponent />
          </div>
          <div>
            <label className="text-xs" htmlFor="firstname">
              Email*
            </label>
            <InputComponent />
          </div>
          <div>
            <label className="text-xs" htmlFor="firstname">
              Password*
            </label>
            <InputComponent />
          </div>
          <ButtonComponent label="Register as a Brand" />
        </form>
        <p className="text-xs mt-2">Already have an account? <Link href="/auth/login/brand" className="text-link">Login here</Link></p>
      </div>
    </section>
  );
};

export default BrandRegister;
