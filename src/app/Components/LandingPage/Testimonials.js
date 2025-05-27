"use client";
import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { testimonialData } from "./testimonialdata";
import Image from "next/image";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto switch testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonialData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-1 bg-primary"></div>
            <h2 className="text-2xl font-bold">
              What our Influencers say about us
            </h2>
          </div>
        </div>

        {/* Timeline Reviews */}
        <div className="max-w-4xl mx-auto">
          <div className="relative flex min-h-[350px]">
            {/* Profile Images Column with Curved Path */}
            <div className="relative w-[140px] flex-shrink-0">
              {/* Profile Images */}
              {testimonialData.map((testimonial, index) => (
                <div
                  key={index}
                  className={`absolute left-0 transition-all duration-700 ease-in-out ${
                    getImagePosition(index, activeIndex, testimonialData.length)
                  }`}
                  style={{
                    transform: `translate(${getCurveOffset(
                      index,
                      activeIndex,
                      testimonialData.length
                    )}px, -50%)`
                  }}
                >
                  <div
                    className={`relative transition-all duration-700 ${
                      index === activeIndex ? "scale-110" : "scale-90 opacity-50"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden relative border-2 border-white/10">
                      <Image
                        src={testimonial.img}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Reviews Column */}
            <div className="flex-grow pl-8 relative">
              {testimonialData.map((testimonial, index) => (
                <div
                  key={index}
                  className={`absolute top-1/2 -translate-y-1/2 w-full transition-all duration-700 ${
                    index === activeIndex
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-8 pointer-events-none"
                  }`}
                >
                  {index === activeIndex && (
                    <div className="relative">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-medium">{testimonial.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-primary fill-primary" />
                          <span className="text-sm text-gray-400">
                            {testimonial.rating} on {testimonial.date}
                          </span>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-6 top-0 text-6xl text-gray-300/10 font-serif leading-none">
                          "
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed pl-4">
                          {testimonial.review}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to calculate image positions
const getImagePosition = (index, activeIndex, total) => {
  const positions = {
    top: "top-[30%]",
    middle: "top-[50%]",
    bottom: "top-[70%]"
  };

  // Calculate relative position
  let position = (index - activeIndex + total) % total;
  
  if (position === 0) return positions.middle;
  if (position === 1 || position === -3) return positions.bottom;
  return positions.top;
};

// Helper function to calculate horizontal offset for curve
const getCurveOffset = (index, activeIndex, total) => {
  let position = (index - activeIndex + total) % total;
  
  // Calculate horizontal offset based on position
  if (position === 0) return 25; // Middle point - further reduced curve
  if (position === 1 || position === -3) return 6; // Bottom point
  return 6; // Top point
};

export default Testimonials;
