import React from "react";

const FilterInfluencerHeroSection = () => {
  return (
    <section className="md:px-12 px-4 text-center py-4 flex items-center justify-center h-[80vh] mb-32">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Content by Our Creators</h1>
          <p className="text-sm font-light">
            Micro influencers have crafted over 50,000 pieces of content on
            Influencer Platform
          </p>
        </div>

        <section className="flex gap-2 md:w-9/12 mx-auto">
          <div className="space-y-2 h-[40vh]">
            <img className="w-full rounded" src="/images/b1.png" alt="" />
            <img className="w-full rounded" src="/images/b2.png" alt="" />
            <img
              className="w-full rounded"
              src="/images/inf10.png"
              alt=""
            />
          </div>
          <div className="space-y-2 h-[40vh]">
            <img className="w-full rounded" src="/images/b3.png" alt="" />
            <img className="w-full rounded" src="/images/b4.png" alt="" />
            <img className="w-full rounded" src="/images/b8.png" alt="" />
            <img className="w-full rounded" src="/images/b4.png" alt="" />
          </div>
          <div className="space-y-2 h-[40vh]">
            <img className="rounded" src="/images/b11.png" alt="" />
            <img src="/images/b18.png" alt="" />
            <img className="w-full rounded" src="/images/b3.png" alt="" />
          </div>
          <div className="space-y-3 h-[40vh]">
            <img
              className="w-full rounded"
              src="/images/inf10.png"
              alt=""
            />
            <img className="w-full rounded" src="/images/b2.png" alt="" />
            <img className="rounded" src="/images/b1.png" alt="" />
          </div>
        </section>
      </div>
    </section>
  );
};

export default FilterInfluencerHeroSection;
