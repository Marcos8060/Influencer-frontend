import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-primary/10 to-secondary/5 min-h-screen">
      {/* Navigation */}
      <nav className="flex justify-between items-center py-6 px-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white text-lg font-bold">B</span>
          </div>
          <h1 className="text-2xl font-bold text-color">Grace Belgravia</h1>
        </div>
        <div className="flex gap-4">
          <Link
            href="/auth/login/brand"
            className="px-6 py-2 text-color hover:text-primary transition-colors"
          >
            Login
          </Link>
          <Link
            href="/auth/register/brand"
            className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
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
              <FaStar className="text-yellow" />
              <span className="font-semibold text-color">1.8M+ Users</span>
              <Link href="#" className="text-sm text-link hover:text-primary transition-colors">
                Read Our Success Story
              </Link>
            </div>

            {/* Main Heading */}
            <h1 className="text-7xl font-bold text-color">
              Where Brands &
              <br />
              <span className="text-primary">Creators Unite</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl text-gray max-w-md">
              Join our platform to connect, collaborate, and create impactful campaigns together
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/influencer"
                className="bg-primary text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-primary/90 transition-transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 group"
              >
                For Creators
                <IoIosArrowForward className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/brand"
                className="bg-secondary text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-secondary/90 transition-transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 group"
              >
                For Brands
                <IoIosArrowForward className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-12 pt-8">
              <div className="space-y-1">
                <h3 className="text-3xl font-bold text-color">7K+</h3>
                <p className="text-gray">Active Creators</p>
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl font-bold text-color">2.5K+</h3>
                <p className="text-gray">Brand Partners</p>
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl font-bold text-color">15K+</h3>
                <p className="text-gray">Campaigns</p>
              </div>
            </div>

            {/* Success Stories Section */}
            <div className="pt-12">
              <h2 className="text-xl font-semibold flex items-center gap-2 text-color">
                SUCCESS STORIES
                <div className="h-[2px] w-12 bg-primary"></div>
              </h2>
              <p className="text-gray mt-2 max-w-md">
                Join thousands of successful creators and brands making an impact together
              </p>
            </div>
          </div>

          {/* Right Section - Creator Showcase */}
          <div className="lg:w-1/2 relative">
            <div className="grid grid-cols-2 gap-6">
              {/* Top Creator */}
              <div className="rounded-[2rem] overflow-hidden aspect-[3/4] relative shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1618151313441-bc79b11e5090?q=80&w=2787&auto=format&fit=crop"
                  alt="Creator 1"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
              
              {/* Right Creator */}
              <div className="rounded-[2rem] overflow-hidden aspect-[3/4] relative mt-12 shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=2787&auto=format&fit=crop"
                  alt="Creator 2"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
              
              {/* Bottom Creator */}
              <div className="rounded-[2rem] overflow-hidden aspect-[3/4] relative -mt-12 shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=2823&auto=format&fit=crop"
                  alt="Creator 3"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
            </div>

            {/* Featured Creator Card */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg flex items-center gap-4 w-max">
              <div className="w-12 h-12 rounded-full overflow-hidden relative border-2 border-primary">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop"
                  alt="Featured Creator"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-color">FEATURED CREATOR</h3>
                <p className="text-sm text-gray">Top Influencer, UK</p>
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
                  className="w-12 h-12 rounded-full overflow-hidden relative border-2 border-white shadow-lg hover:scale-110 transition-transform"
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
