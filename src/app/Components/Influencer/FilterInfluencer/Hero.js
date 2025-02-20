import React from "react";

const FilterInfluencerHeroSection = () => {
  return (
    <section className="md:px-12 md:w-9/12 mx-auto px-4 py-4 flex items-center justify-center md:h-[70vh] h-[60vh] md:mt-24">
      <div className="space-y-6">
        <div>
          <h1 className="md:text-4xl text-2xl font-bold text-center">
            Content by Our Creators
          </h1>
          <p className="text-sm font-light text-center">
            Micro influencers have crafted over 50,000 pieces of content on
            Influencer Platform
          </p>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <section className="md:h-[60vh] h-[35vh] overflow-hidden filterInfluencer rounded">
            <img
              className="md:h-[40vh] h-[10vh] w-full object-cover rounded"
              src="/images/b1.png"
              alt=""
            />
            <img
              className="md:h-[30vh] h-[15vh] w-full object-cover rounded"
              src="/images/b2.png"
              alt=""
            />
            <img
              className="md:h-[40vh] h-[20vh] w-full object-cover rounded"
              src="/images/b3.png"
              alt=""
            />
            <img
              className="md:h-[40vh] h-[10vh] w-full object-cover rounded"
              src="/images/b1.png"
              alt=""
            />
            <img
              className="md:h-[30vh] h-[10vh] w-full object-cover rounded"
              src="/images/b2.png"
              alt=""
            />
            <img
              className="md:h-[40vh] h-[15vh] w-full object-cover rounded"
              src="/images/b3.png"
              alt=""
            />
          </section>
          <section className="md:h-[60vh] h-[35vh] overflow-hidden filterInfluencer rounded">
            <img
              className="md:h-[30vh] h-[15vh] w-full object-cover rounded"
              src="/images/b4.png"
              alt=""
            />
            <img
              className="md:h-[40vh] h-[10vh] w-full object-cover rounded"
              src="/images/b8.png"
              alt=""
            />
            <img
              className="md:h-[30vh] h-[15vh] w-full object-cover rounded"
              src="/images/b11.png"
              alt=""
            />
          </section>
          <section className="md:h-[60vh] h-[35vh] overflow-hidden filterInfluencer rounded">
            <img
              className="md:h-[30vh] h-[10vh] w-full object-cover rounded"
              src="/images/sample2.png"
              alt=""
            />
            <img
              className="md:h-[40vh] h-[15vh] w-full object-cover rounded"
              src="/images/sample3.png"
              alt=""
            />
            <img
              className="md:h-[30vh] h-[10vh] w-ful object-cover rounded"
              src="/images/sample4.png"
              alt=""
            />
          </section>
          <section className="md:h-[60vh] h-[35vh] overflow-hidden filterInfluencer rounded">
            <img
              className="md:h-[40vh] h-[15vh] w-full object-cover rounded"
              src="/images/b18.png"
              alt=""
            />
            <img
              className="md:h-[30vh] h-[10vh] w-full object-cover rounded"
              src="/images/b5.png"
              alt=""
            />
            <img
              className="md:h-[40vh] h-[15vh] w-full object-cover rounded"
              src="/images/sample5.png"
              alt=""
            />
          </section>
        </div>
      </div>
    </section>
  );
};

export default FilterInfluencerHeroSection;
