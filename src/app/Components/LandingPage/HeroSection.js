import React from 'react'
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";

const HeroSection = () => {
  return (
    <>
      <section className="w-1/2 mx-auto text-center flex flex-col items-center justify-center h-[90vh] space-y-8 px-12">
        <h1 className="text-5xl font-bold text-center">
          Building connections between brands and influencers.
        </h1>
        <p>
          Influencer Platform enables brands and influencers to connect,
          initiate conversations, and manage their relationships seamlessly on a
          single platform. Continue below to explore more as a brand or
          influencer.
        </p>
        <div className="flex items-center gap-4 w-9/12 mx-auto">
          <Link
            href="/onboarding/brand"
            className="bg-primary hover:scale-105 border transition duration-700 shadow-xl text-white rounded px-4 py-3 text-sm w-full flex gap-2 items-center justify-center"
          >
            For Brands
            <IoIosArrowForward className="text-white" />
          </Link>
          <Link
            href=""
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
