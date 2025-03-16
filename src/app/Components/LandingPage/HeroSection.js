import React from 'react'
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";

const HeroSection = () => {
  return (
    <>
      <section className="md:w-1/2 mx-auto text-center flex flex-col items-center justify-center md:h-[90vh] h-[70vh] space-y-8 md:px-12 px-2">
        <h1 className="md:text-5xl text-4xl font-bold text-center">
          Building connections between brands and influencers.
        </h1>
        <p>
          Influencer Platform enables brands and influencers to connect,
          initiate conversations, and manage their relationships seamlessly on a
          single platform. Continue below to explore more as a brand or
          influencer.
        </p>
        <div className="md:flex grid items-center gap-4 w-9/12 mx-auto">
          <Link
            href="/auth/register/brand"
            className="bg-primary hover:scale-105 border transition duration-700 shadow-xl text-white rounded px-4 py-3 text-sm w-full flex gap-2 items-center justify-center"
          >
            For Brands
            <IoIosArrowForward className="text-white" />
          </Link>
          <Link
            href="/auth/register/influencer"
            className="hover:scale-105 border transition duration-700 border-primary rounded px-4 py-3 text-sm w-full flex gap-2 items-center justify-center"
          >
            For Influencers
            <IoIosArrowForward className="text-primary" />
          </Link>
        </div>
      </section>
    </>
  )
}

export default HeroSection
