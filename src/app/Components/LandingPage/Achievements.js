import React from "react";
import { FaUsers } from "react-icons/fa";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { FaArrowsSplitUpAndLeft } from "react-icons/fa6";
import { IoBulbOutline } from "react-icons/io5";

const Achievements = () => {
  return (
    <div className="md:h-[90vh] flex items-center justify-center my-4 md:px-12 px-4 space-y-8">
      <section className="md:w-9/12 mx-auto md:flex items-center justify-center md:h-[50vh] gap-8 md:space-y-0 space-y-12">
        <div className="md:w-1/2 mx-auto md:space-y-3 space-y-4">
          <h1 className="md:text-4xl text-2xl font-bold text-color">
            About Our Platform.
          </h1>
          <p className="text-color font-light text-sm">
            We are your go-to platform for discovering incredible opportunities,
            showcasing your creative work, and building meaningful
            collaborations.
          </p>
          <p className="text-color font-light text-sm">
            Are you a musician, designer, writer, visual artist etc ? We provide
            a space to showcase your work, build a digital portfolio, and
            connect with brands for collaborations.
          </p>
          <p className="text-color font-light text-sm">
            For those looking to hire, find verified and talented professionals
            ready to bring your next big project to life.
          </p>
          <button className="bg-primary shadow-xl hover:scale-105 border transition duration-700 text-white rounded px-6 py-3 text-sm">
            Read More
          </button>
        </div>
        <div className="md:w-1/2 flex items-center justify-center">
          <img className="w-72" src="/images/camera.png" alt="" />
          {/* <section className="flex items-center justify-center gap-4">
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
          </section> */}
        </div>
      </section>
      {/* <section className="flex items-center justify-center md:h-[50vh] gap-8">
        <div className="md:flex items-center gap-4 justify-between md:w-7/12 mx-auto space-y-4">
          <div className="md:w-4/12 flex items-center justify-center">
            <h1 className="md:text-4xl text-2xl font-bold text-color">
              Take a look at what
            </h1>
          </div>
          <div className="md:w-4/12 flex items-center justify-center">
            <p className="bg-primary text-white md:h-32 h-20 md:w-32 w-20 rounded-full flex items-center justify-center font-thin">
              All Work
            </p>
          </div>
          <div className="md:w-4/12 flex items-center justify-center">
            <h1 className="md:text-4xl text-2xl font-bold text-color">
              You Can Do On our Platform
            </h1>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Achievements;
