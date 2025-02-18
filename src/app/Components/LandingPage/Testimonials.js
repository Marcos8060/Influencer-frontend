"use client";
import React from "react";
import { FaStar } from "react-icons/fa";
import { testimonialData, testimonials } from "./testimonialdata";
import dynamic from "next/dynamic";

// Dynamically import OwlCarousel (important for Next.js)
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false, // Prevents SSR issues
});

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const Testimonials = () => {
  const testimonials = {
    loop: true,
    margin: 0,
    nav: false,
    center: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 8000,
    responsive: {
      0: {
        items: 1,
        center: true,
        dots: false,
        nav: true,
      },
      480: {
        items: 1,
        center: false,
        dots: false,
      },
      769: {
        items: 3,
      },
    },
  };

  return (
    <div className="md:h-screen py-8 md:space-y-0 space-y-3">
      <div className="md:w-5/12 mx-auto md:px-0 px-4">
        <h1 className="md:text-4xl text-3xl font-bold text-center">
          What are Brands and Influencers saying about us!
        </h1>
      </div>

      <section className="md:w-9/12 mx-auto md:flex items-center justify-center md:h-[90vh] gap-8 md:px-0 px-4 md:space-y-0 space-y-3">
        <OwlCarousel {...testimonials}>
          {testimonialData.map((data, index) => (
            <div key={index} className="bg-background sm:px-12 px-2 space-y-4 py-2 sm:py-4 slider-card h-[30vh] mt-12">
              <img
                style={{ maxWidth: "50px", height: "50px" }}
                className="sm:-mt-8 -mt-4 mx-auto rounded-full object-cover"
                src={data.img}
                alt=""
              />
              <p className={`text-center text-xs`}>{data.name}</p>
              <p className="text-center pb-4" style={{ fontSize: "9px" }}>
                {data.review}
              </p>
            </div>
          ))}
        </OwlCarousel>
      </section>
    </div>
  );
};

export default Testimonials;
