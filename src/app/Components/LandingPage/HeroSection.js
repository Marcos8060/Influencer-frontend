import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";

const HeroSection = () => {
  return (
    <>
      <section className="md:flex items-center justify-center md:h-[90vh] h-[50vh] w-9/12 mx-auto md:mt-0 mt-24">
        <div className="md:w-1/2 space-y-4">
          <h1 className="md:text-7xl text-4xl font-bold bg-gradient-to-r from-primary via-color to-secondary text-transparent bg-clip-text">
            Showcase. Discover. Connect
          </h1>
          <p className="text-color">
            Unleash Your Creative Potential and Find the Perfect Talent for Your
            Next Project.
          </p>
          <section className="flex items-center gap-2">
            <Link
              href="/auth/register/brand"
              className="bg-primary hover:scale-105 border transition duration-700 shadow-xl text-white rounded px-4 py-3 text-sm flex gap-2 items-center justify-center"
            >
              For Brands
              <IoIosArrowForward className="text-white" />
            </Link>
            <Link
              href="/auth/register/influencer"
              className="hover:scale-105 border transition duration-700 border-primary rounded px-4 py-3 text-sm flex gap-2 items-center justify-center"
            >
              For Influencers
              <IoIosArrowForward className="text-primary" />
            </Link>
          </section>
        </div>
        <div className="md:block hidden md:w-1/2">
          <img src="/images/msanii.png" alt="" />
        </div>
      </section>
    </>
  );
};

export default HeroSection;
