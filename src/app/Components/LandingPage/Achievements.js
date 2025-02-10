import React from "react";
import { FaUsers } from "react-icons/fa";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { FaArrowsSplitUpAndLeft } from "react-icons/fa6";
import { IoBulbOutline } from "react-icons/io5";

const Achievements = () => {
  return (
    <div className="md:h-screen my-4 md:px-12 px-4">
      <section className="md:flex items-center justify-center md:h-[50vh] gap-8 md:space-y-0 space-y-12">
        <div className="md:w-1/2 md:space-y-0 space-y-4 text-center">
          <h1 className="text-4xl font-bold">Some of our achievements.</h1>
          <p>
            Every milestone tells a story—of creativity, connection, and
            community. Here’s a look at the numbers that showcase the impact
            we’ve made together. From the incredible support of our followers to
            the partnerships that fuel our passion, these achievements are a
            reflection of you and the journey we’re building together.
          </p>
          <button className="bg-primary shadow-xl hover:scale-105 border transition duration-700 text-white rounded px-4 py-3 text-sm">
            Read More
          </button>
        </div>
        <div className="md:w-1/2 space-y-4">
          <section className="flex items-center justify-center gap-4">
            <div className="bg-background rounded py-4 px-8 text-center">
              <div className="flex items-center justify-center">
                <FaUsers className="text-color text-3xl text-center" />
              </div>
              <h className="text-2xl font-bold text-color">3,460+</h>
              <p className="font-thin">Influencers</p>
            </div>
            <div className="bg-primary rounded py-4 px-8 text-center text-white">
              <div className="flex items-center justify-center">
                <HiOutlineSpeakerphone className="text-white text-3xl text-center" />
              </div>
              <h className="text-2xl font-bold">8,550+</h>
              <p className="font-thin">Campaigns</p>
            </div>
          </section>
          <section className="flex items-center justify-center gap-4">
            <div className="bg-primary rounded py-4 px-8 text-center text-white">
              <div className="flex items-center justify-center">
                <FaArrowsSplitUpAndLeft className="text-white text-3xl text-center" />
              </div>
              <h className="text-2xl font-bold">180+</h>
              <p className="font-thin">Brands Joined</p>
            </div>
            <div className="bg-background rounded py-4 px-8 text-center">
              <div className="flex items-center justify-center">
                <IoBulbOutline className="text-3xl text-center" />
              </div>
              <h className="text-2xl font-bold text-color">85+</h>
              <p className="font-thin">Marketing Experts</p>
            </div>
          </section>
        </div>
      </section>
      <section className="flex items-center justify-center md:h-[50vh] gap-8">
        <div className="md:flex items-center gap-4 justify-between md:w-7/12 mx-auto">
          <div className="w-4/12">
            <h1 className="text-4xl font-bold">Take a look at what</h1>
          </div>
          <div className="md:w-4/12 flex items-center justify-center">
            <p className="bg-primary text-white h-32 w-32 rounded-full flex items-center justify-center font-thin">
              All Work
            </p>
          </div>
          <div className="w-4/12">
            <h1 className="text-4xl font-bold">You Can Do On our Platform</h1>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Achievements;
