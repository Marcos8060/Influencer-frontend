import React from "react";

const Highlights = () => {
  return (
    <div className="h-screen bg-background py-8">
      <h1 className="text-4xl font-bold text-center text-color">
        Influencer Platform Highlights
      </h1>
      <section className="flex gap-8 items-center justify-center h-[90vh] w-8/12 mx-auto">
        <div className="space-y-8">
          <div>
            <h3 className=" text-primary font-semibold">
              Verified User Authentication
            </h3>
            <ul className="font-thin my-3 text-color">
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
            <ul className="font-thin my-3 text-color">
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
        <div className="h-96 border-l-2 border-color"></div>
        <div className="space-y-8">
          <div>
            <h3 className="text-primary font-semibold">
              Personalized Profiles
            </h3>
            <ul className="font-thin my-3 text-color">
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
            <ul className="font-thin my-3 text-color">
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
            <ul className="font-thin my-3 text-color">
              <li>Unleashing creativity, one connection at a time</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Highlights;
