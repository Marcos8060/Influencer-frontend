import React from "react";
import FilterInfuencer from "./FilterInfuencer";

const InfluencerArchives = () => {
  return (
    <div className="mt-16 md:px-12 px-4 mb-12">
      <h1 className="font-bold md:text-3xl text-2xl text-center">
        Influencers By Archives: Find Influencers
      </h1>
      <p className="text-center text-sm font-light">
        Make your data invisible by generating unlimited identities. The
        next-level in privacy protection for online and travel.
      </p>
      <FilterInfuencer />

      <section className="w-9/12 mx-auto flex gap-4 items-center justify-between">
        <div className="space-y-3 text-sm">
          <p className="bg-background rounded p-4 cursor-pointer">Beauty TikTok Influencers in Colorado Springs</p>
          <p>Beauty TikTok Influencers in Colorado Springs</p>
        </div>
        <div className="space-y-3 text-sm">
          <p>Beauty TikTok Influencers in Colorado Springs</p>
          <p>Beauty TikTok Influencers in Colorado Springs</p>
        </div>
        <div className="space-y-3 text-sm">
          <p>Beauty TikTok Influencers in Colorado Springs</p>
          <p>Beauty TikTok Influencers in Colorado Springs</p>
        </div>
        <div className="space-y-3 text-sm">
          <p>Beauty TikTok Influencers in Colorado Springs</p>
          <p>Beauty TikTok Influencers in Colorado Springs</p>
        </div>
      </section>
    </div>
  );
};

export default InfluencerArchives;
