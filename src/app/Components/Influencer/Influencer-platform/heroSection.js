"use client";
import Navbar from "../../Navbar";
import { IoIosArrowForward } from "react-icons/io";

const InfluencerHeroSection = () => {
  return (
    <>
      <Navbar />
      <section className="md:w-1/2 mx-auto text-center flex flex-col items-center justify-center h-[80vh] space-y-8 md:px-12 px-2 my-8">
        <h1 className="md:text-6xl text-4xl font-bold text-center">
          Work with brands on gifted and paid collaborations
        </h1>
        <div className="w-8/12 mx-auto space-y-4">
          <div className="flex items-center justify-center gap-4">
            <button className="bg-primary shadow-xl text-white px-6 py-4 text-sm flex gap-2 items-center justify-center">
              Create Account
              <IoIosArrowForward className="text-white" />
            </button>
            <button className="border text-primary border-primary shadow-xl px-6 py-4 text-sm flex gap-2 items-center justify-center">
              About Us
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default InfluencerHeroSection;
