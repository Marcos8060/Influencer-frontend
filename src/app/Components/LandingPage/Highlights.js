import React from "react";
import { LuSettings2 } from "react-icons/lu";

const Highlights = () => {
  return (
    <div className="md:h-[90vh] bg-gradient-to-r from-primary to-secondary py-8 px-4 space-y-4 sm:text-center">
      <h1 className="md:text-4xl text-3xl font-bold text-center text-white">
        Influencer Platform Highlights
      </h1>
      <section className="md:flex gap-8 items-center justify-center md:h-[70vh] md:w-8/12 mx-auto">
        <div className="space-y-8">
          <div>
            <h3 className=" text-primary font-semibold">
              Verified User Authentication
            </h3>
            <ul className="font-thin my-3 text-white text-sm text-left">
              <li>
                Rigorous verification processes ensure the authenticity of user
                identities
              </li>
              <li>
                Users undergo identity checks against government databases for
                added security and trustworthiness
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-primary font-semibold">
              Talent Matching Algorithm
            </h3>
            <ul className="font-thin my-3 text-white text-left text-sm">
              <li>
                Leverage our proprietary talent matching algorithm to find the
                perfect fit for your project
              </li>
              <li>
                Receive personalized recommendations based on your project
                requirements, preferences, and past collaborations.
              </li>
            </ul>
          </div>
        </div>
        <div className="md:block hidden h-[60vh] border-l-2 border-color relative">
          <div className="absolute rounded-lg bg-white p-2 border-red -right-5">
            <LuSettings2 className="text-2xl" />
          </div>
          <div className="absolute rounded-lg bg-white p-2 border-red -right-5 top-40">
            <LuSettings2 className="text-2xl" />
          </div>
          <div className="absolute rounded-lg bg-white p-2 border-red -right-5 -bottom-2">
            <LuSettings2 className="text-2xl" />
          </div>
        </div>
        <div className="space-y-8">
          <div>
            <h3 className="text-primary font-semibold">
              Personalized Profiles
            </h3>
            <ul className="font-thin my-3 text-white text-left text-sm">
              <li>
                Build a personalized profile that showcases your unique talents,
                skills, and expertise
              </li>
              <li>
                Customize your profile with a bio, portfolio, work samples, and
                links to your social media accounts.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-primary font-semibold">
              Advanced Search and Discovery
            </h3>
            <ul className="font-thin my-3 text-left text-sm text-white">
              <li>
                Explore a diverse community of verified creatives spanning
                various industries and discipline
              </li>
              <li>
                Use advanced search filters to find talent based on criteria
                such as skills, location, availability, and more.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-primary font-semibold">No Cost to Join</h3>
            <ul className="font-thin my-3 text-white text-sm">
              <li>Unleashing creativity, one connection at a time</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Highlights;
