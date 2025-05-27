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
    <div className="relative py-24 overflow-hidden bg-gradient-to-b from-gray/5 via-white to-primary/5">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-grid-primary/5 [mask-image:linear-gradient(0deg,transparent,black,transparent)]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-50 mix-blend-multiply" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl opacity-50 mix-blend-multiply" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl opacity-30 mix-blend-multiply" />

      <div className="max-w-6xl mx-auto px-4 relative">
        {/* Header */}
        <div className="mb-16 relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-1 bg-gradient-to-r from-primary to-secondary"></div>
            <h2 className="text-3xl font-bold">
              What our Clients say about us
            </h2>
          </div>
        </div>

        {/* Timeline Reviews */}
        <div className="max-w-4xl mx-auto relative">
          <div className="relative flex min-h-[400px]">
            {/* Profile Images Column with Curved Path */}
            <div className="relative w-[200px] flex-shrink-0">
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
                      index === activeIndex 
                        ? "scale-110" 
                        : "scale-90 opacity-50 hover:opacity-75 hover:scale-95"
                    }`}
                  >
                    <div className="w-20 h-20 rounded-full overflow-hidden relative">
                      <Image
                        src={testimonial.img}
                        alt={testimonial.name}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Reviews Column */}
            <div className="flex-grow pl-12 relative">
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
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                        <div className="flex items-center gap-2">
                          <Star className="w-5 h-5 text-primary fill-primary" />
                          <span className="text-sm text-gray-500">
                            {testimonial.rating} on {testimonial.date}
                          </span>
                        </div>
                      </div>
                      <div className="relative">
                        {/* Opening Quote */}
                        <div className="absolute -left-8 -top-6 text-8xl text-primary/10 font-serif leading-none select-none">
                          "
                        </div>
                        {/* Closing Quote */}
                        <div className="absolute -right-4 bottom-0 text-8xl text-primary/10 font-serif leading-none select-none">
                          "
                        </div>
                        <div className="relative z-10 bg-white/30 backdrop-blur-sm rounded-2xl p-6 shadow-[0_0_1px_rgba(0,0,0,0.05)]">
                          <p className="text-gray-600 text-base leading-relaxed">
                            {testimonial.review}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Grid Pattern */}
      <style jsx>{`
        .bg-grid-primary\/5 {
          background-size: 30px 30px;
          background-image: linear-gradient(to right, rgba(54,128,161,0.05) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(54,128,161,0.05) 1px, transparent 1px);
        }
      `}</style>
    </div>
  );
};

// Helper function to calculate image positions
const getImagePosition = (index, activeIndex, total) => {
  const positions = {
    top: "top-[25%]",
    middle: "top-[50%]",
    bottom: "top-[75%]"
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
  if (position === 0) return 40; // Middle point - increased offset for larger images
  if (position === 1 || position === -3) return 10; // Bottom point
  return 10; // Top point
};

export default Testimonials;
