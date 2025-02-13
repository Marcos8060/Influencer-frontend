"use client";
import React, { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const ForCreators = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = [
    {
      title: "Showcase your authenticity",
      description: `Your creative journey is as unique as your fingerprint, and at Influencer platform, we celebrate that individuality. Build a personalized profile that reflects your style, personality, and creative ethos. Showcase your best work, share your story, and let your authenticity shine through. Whether you're a visual artist, musician, writer, or any other creative professional, Influencer platform provides a platform for you to express yourself authentically and connect with an audience that appreciates your unique voice.`,
    },
    {
      title: "Grow Your Influence",
      description: `Your creative journey is as unique as your fingerprint, and at Influencer platform, we celebrate that individuality. Build a personalized profile that reflects your style, personality, and creative ethos. Showcase your best work, share your story, and let your authenticity shine through. Whether you're a visual artist, musician, writer, or any other creative professional, Influencer platform provides a platform for you to express yourself authentically and connect with an audience that appreciates your unique voice.`,
    },
    {
      title: "Monetize Your Creativity",
      description: `Your creative journey is as unique as your fingerprint, and at Influencer platform, we celebrate that individuality. Build a personalized profile that reflects your style, personality, and creative ethos. Showcase your best work, share your story, and let your authenticity shine through. Whether you're a visual artist, musician, writer, or any other creative professional, Influencer platform provides a platform for you to express yourself authentically and connect with an audience that appreciates your unique voice.`,
    },
    {
      title: "Expand Your Reach",
      description: `Your creative journey is as unique as your fingerprint, and at Influencer platform, we celebrate that individuality. Build a personalized profile that reflects your style, personality, and creative ethos. Showcase your best work, share your story, and let your authenticity shine through. Whether you're a visual artist, musician, writer, or any other creative professional, Influencer platform provides a platform for you to express yourself authentically and connect with an audience that appreciates your unique voice.`,
    },
  ];

  const nextSlide = () => {
    if (currentIndex < items.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section className="mt-12 md:w-9/12 mx-auto">
      <div className="bg-background my-8 py-4 px-12 rounded-xl relative overflow-hidden">
        <button
          onClick={prevSlide}
          className="absolute left-2 top-60 transform -translate-y-1/2"
        >
          <IoIosArrowBack className="bg-primary text-white rounded-full text-3xl p-1 cursor-pointer" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-60 transform -translate-y-1/2 z-10"
        >
          <IoIosArrowForward className="bg-primary text-white rounded-full text-3xl p-1 cursor-pointer" />
        </button>

        <h3 className="font-normal">For Creators</h3>
        <h2 className="font-bold text-xl">
          Unlock Unlimited Opportunities Through Influencer Platform
        </h2>
        <small className="font-light">
          Use this section to describe your company and the products you offer.
        </small>

        {/* Slider */}
        <div className="overflow-hidden mt-6">
          <div
            className="flex gap-2 transition-transform duration-300"
            style={{
              transform: `translateX(-${currentIndex * 38.33}%)`,
              width: `${items.length * 33.33}%`,
            }}
          >
            {items.map((item, index) => (
              <div
                key={index}
                className="rounded-xl p-4 bg-white min-w-[37.33%]"
              >
                <h6 className="font-semibold">{item.title}</h6>
                <small className="text-xs">
                  {item.description}
                </small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForCreators;
