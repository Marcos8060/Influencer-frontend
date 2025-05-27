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
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Customer Reviews
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto" />
        </div>

        {/* Timeline Reviews */}
        <div className="max-w-4xl mx-auto">
          <div className="relative flex">
            {/* Profile Images Column */}
            <div className="relative w-[180px] flex-shrink-0">
              {/* Perfect Convex Curve */}
              <svg
                className="absolute left-0 top-0 h-full"
                width="180"
                viewBox="0 0 180 600"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M160 0 
                     C160 150, 160 200, 160 250
                     C160 300, 40 300, 40 300
                     C40 300, 160 300, 160 350
                     C160 400, 160 450, 160 600"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  fill="none"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="var(--primary)" />
                    <stop offset="50%" stopColor="var(--secondary)" />
                    <stop offset="100%" stopColor="var(--primary)" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Profile Images */}
              {testimonialData.map((testimonial, index) => (
                <div
                  key={index}
                  className={`absolute transition-all duration-700 ease-in-out ${
                    getImagePosition(index, activeIndex, testimonialData.length)
                  }`}
                >
                  <div
                    className={`relative transition-all duration-700 ${
                      index === activeIndex ? "scale-125" : "scale-75 opacity-50"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden relative">
                      <Image
                        src={testimonial.img}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {index === activeIndex && (
                      <div className="absolute -right-1 -top-1 w-3 h-3 rounded-full bg-gradient-to-r from-primary to-secondary" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Reviews Column */}
            <div className="flex-grow">
              {testimonialData.map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 ${
                    index === activeIndex
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-8 absolute"
                  }`}
                >
                  {index === activeIndex && (
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 relative">
                      <div className="mb-4">
                        <h3 className="text-lg font-medium">{testimonial.name}</h3>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          </div>
                          <span className="text-gray-400 text-sm">
                            {testimonial.rating} on {testimonial.date}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {testimonial.review}
                      </p>
                      <div className="absolute top-6 right-6 text-4xl text-primary/20 font-serif">
                        "
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-12">
          {testimonialData.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-gradient-to-r from-primary to-secondary w-8"
                  : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper function to calculate image positions
const getImagePosition = (index, activeIndex, total) => {
  const positions = {
    top: "left-[160px] top-[20%] -translate-y-1/2",
    middle: "left-[40px] top-[50%] -translate-y-1/2",
    bottom: "left-[160px] top-[80%] -translate-y-1/2"
  };

  // Calculate relative position
  let position = (index - activeIndex + total) % total;
  
  if (position === 0) return positions.middle;
  if (position === 1 || position === -3) return positions.bottom;
  return positions.top;
};

export default Testimonials;
