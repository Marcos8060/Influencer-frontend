import Footer from "@/app/Components/Footer";
import FashionSamples from "@/app/Components/Influencer/Search-Influencer/fashion-samples";
import InfluencerSamples from "@/app/Components/Influencer/Search-Influencer/fashion-samples";
import Navbar from "@/app/Components/Navbar";
import React from "react";

const SearchInfluencer = () => {
  return (
    <>
      <Navbar />
      <div className="md:px-12 px-4">
        <section className="md:flex justify-between md:gap-12 md:w-9/12 w-full mx-auto my-8">
          <div className="md:w-9/12 w-full space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">
                Best Fashion Influencers To Work With in 2024
              </h1>
              <p className="font-light text-sm">
                Say goodbye to endless Google searches or scrolling through
                Instagram and TikTok hashtags—we have already found the top
                fashion influencers you need! 🔎 With over 35k active
                influencers on Social Cat, you are guaranteed to find the
                perfect fit for your brand.
              </p>
              <p className="font-light text-sm">
                Whether you're after sustainable fashion advocates, male fashion
                tastemakers, black fashion influencers, or niche creators, we
                have got you covered. Plus, you can run campaigns regardless of
                your budget—choose from gifted, paid, or affiliate
                collaborations.
              </p>
              <p className="font-light text-sm">
                Each influencer profile includes authentic reviews, ratings,
                portfolios, and past collaboration insights, giving you a clear
                picture of their potential before you connect. We also integrate
                directly with Meta and TikTok, providing valuable audience
                insights and engagement metrics. Explore the categories below to
                find nano and micro-influencers (up to 500K followers) who will
                create authentic buzz and engagement for your fashion brand!
              </p>
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">
                Instagram fashion Influencers
              </h1>
              <p className="font-light text-sm">
                Many businesses struggle to market themselves on Instagram, but
                fashion brands usually do not. One key reason? Fashion
                influencers who know how to maximize Instagram's highly visual
                platform. However, partnering with fashion influencers is not
                always smooth sailing. Smaller or lesser-known brands often face
                challenges like unanswered messages or being ghosted altogether.
                The solution? Social Cat connects you with top Instagram fashion
                influencers known for their creativity, professionalism, strong
                engagement, and prompt communication. They will craft stunning
                content that elevates your brand and captivates your audience.
              </p>
            </div>
          </div>
          <div className="md:block hidden md:w-3/12">
            <div className="border border-[#FF0000] rounded p-4 space-y-2">
              <h1 className="font-bold">Table Of Contents</h1>
              <p className="text-xs font-light">
                Instagram Fashion Influencers
              </p>
              <p className="text-xs font-light">Tiktok Fashion Influencers</p>
              <p className="text-xs font-light">Male Fashion Influencers</p>
              <p className="text-xs font-light">Female Fashion Influencers</p>
              <p className="text-xs font-light">Black Fashion Influencers</p>
              <p className="text-xs font-light">Hispanic Fashion Influencers</p>
              <p className="text-xs font-light">Asian Fashion Influencers</p>
            </div>
          </div>
        </section>
        <FashionSamples />
      </div>
      <Footer />
    </>
  );
};

export default SearchInfluencer;
