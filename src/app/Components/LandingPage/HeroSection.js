import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-[#E0FFFF] to-white min-h-screen">
      {/* Navigation */}
      <nav className="flex justify-between items-center py-6 px-8">
        <h1 className="text-2xl font-bold">Creators</h1>
        <div className="flex gap-4">
          <Link
            href="/auth/login"
            className="px-6 py-2 hover:text-primary transition-colors"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-8 pt-12">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Section */}
          <div className="lg:w-1/2 space-y-8 pt-8">
            {/* Stats Badge */}
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm w-fit px-4 py-2 rounded-full shadow-sm">
              <FaStar className="text-black" />
              <span className="font-semibold">1.8M+ Users</span>
              <Link href="#" className="text-sm underline">
                Read Our Success Story
              </Link>
            </div>

            {/* Main Heading */}
            <h1 className="text-7xl font-bold">Creators</h1>

            {/* CTA Button */}
            <button className="bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-transform hover:scale-105">
              Get Started
            </button>

            {/* Stats */}
            <div className="flex gap-12 pt-8">
              <div className="space-y-1">
                <h3 className="text-3xl font-bold">7K+</h3>
                <p className="text-gray-600">Creator</p>
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl font-bold">68K+</h3>
                <p className="text-gray-600">Active Users</p>
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl font-bold">41K+</h3>
                <p className="text-gray-600">Art Worker</p>
              </div>
            </div>

            {/* New Collection Section */}
            <div className="pt-12">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                NEW COLLECTION
                <div className="h-[2px] w-12 bg-black"></div>
              </h2>
              <p className="text-gray-600 mt-2 max-w-md">
                Discover trending creators and collaborate on exciting new projects
              </p>
            </div>
          </div>

          {/* Right Section - Creator Showcase */}
          <div className="lg:w-1/2 relative">
            <div className="grid grid-cols-2 gap-6">
              {/* Top Creator */}
              <div className="rounded-[2rem] overflow-hidden aspect-[3/4] relative">
                <Image
                  src="https://images.unsplash.com/photo-1618151313441-bc79b11e5090?q=80&w=2787&auto=format&fit=crop"
                  alt="Creator 1"
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Right Creator */}
              <div className="rounded-[2rem] overflow-hidden aspect-[3/4] relative mt-12">
                <Image
                  src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=2787&auto=format&fit=crop"
                  alt="Creator 2"
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Bottom Creator */}
              <div className="rounded-[2rem] overflow-hidden aspect-[3/4] relative -mt-12">
                <Image
                  src="https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=2823&auto=format&fit=crop"
                  alt="Creator 3"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Featured Creator Card */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg flex items-center gap-4 w-max">
              <div className="w-12 h-12 rounded-full overflow-hidden relative">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop"
                  alt="Featured Creator"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold">DONGY ART</h3>
                <p className="text-sm text-gray-600">AB Word, US</p>
              </div>
            </div>

            {/* Small Creator Avatars */}
            <div className="flex gap-4 absolute -bottom-8 right-4">
              {[
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2788&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=2787&auto=format&fit=crop",
              ].map((src, index) => (
                <div
                  key={index}
                  className="w-12 h-12 rounded-full overflow-hidden relative border-2 border-white"
                >
                  <Image
                    src={src}
                    alt={`Creator ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
