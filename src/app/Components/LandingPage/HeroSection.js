import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FaStar, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-white to-[#F0FFFF]">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-grid-primary/5 [mask-image:linear-gradient(0deg,transparent,black,transparent)]" />

      {/* Gradient Orbs */}
      <div className="absolute top-20 right-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[500px] md:h-[500px] lg:w-[800px] lg:h-[800px] bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-30 mix-blend-multiply animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[600px] lg:h-[600px] bg-gradient-to-r from-secondary/20 to-primary/20 rounded-full blur-3xl opacity-30 mix-blend-multiply" />

      {/* Navigation */}
      <nav className="relative flex justify-between items-center py-2 px-4 sm:px-6 md:px-8">
        <div className="flex items-center space-x-2">
          <Image src="/images/logo.png" alt="Logo" width={80} height={60} className="sm:w-[100px] sm:h-[70px] md:w-[120px] md:h-[80px]" />
        </div>
        <div className="flex gap-2 sm:gap-3 md:gap-4">
          <Link
            href="/auth/login/brand"
            className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 text-sm sm:text-base text-gray border border-input flex items-center justify-center rounded-3xl hover:text-color transition-colors"
          >
            Brand Login
          </Link>
          <Link
            href="/auth/login/influencer"
            className="px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 text-sm sm:text-base bg-gradient-to-r from-primary to-secondary text-white rounded-full hover:bg-black transition-all"
          >
            Influencer Login
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 pt-8 sm:pt-10 md:pt-12 relative">
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 md:gap-16 items-center">
          {/* Left Section */}
          <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Stats Badge */}
            <div className="flex items-center justify-center lg:justify-start gap-2 w-fit mx-auto lg:mx-0">
              <FaStar className="text-[#1A1A1A] text-sm sm:text-base" />
              <span className="text-gray font-light text-sm sm:text-base">1.8M+ Active Users</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-[#1A1A1A] leading-tight">
              The Influencer Marketing Platform
            </h1>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link
                href="/influencer/influencer-landing-page"
                className="w-full sm:w-auto inline-block bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-light text-sm sm:text-base"
              >
                For Infuencers
              </Link>
              <Link
                href="/brand/brand-landing-page"
                className="w-full sm:w-auto inline-block border border-primary text-black px-6 py-3 sm:px-8 sm:py-4 rounded-full font-light text-sm sm:text-base"
              >
                For Brands
              </Link>
            </div>

            {/* Stats Section */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 md:gap-12 pt-8 sm:pt-10 md:pt-12">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#1A1A1A]">10K+</h3>
                <p className="text-gray font-light text-sm sm:text-base">Creators</p>
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#1A1A1A]">15K+</h3>
                <p className="text-gray font-light text-sm sm:text-base">Active Users</p>
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#1A1A1A]">20K+</h3>
                <p className="text-gray font-light text-sm sm:text-base">Campaigns</p>
              </div>
            </div>

            {/* Additional Content */}
            <div className="space-y-4 sm:space-y-6 pt-6 sm:pt-8">
              <p className="text-base sm:text-lg md:text-xl text-gray font-light max-w-2xl mx-auto lg:mx-0">
                No noise. No drama. Just smart tools, powerful insights, and
                effortless brand-creator collaborations.
              </p>
            </div>
          </div>

          {/* Right Section - Creative Image Grid */}
          <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              {/* Top Row */}
              <div className="rounded-[20px] sm:rounded-[30px] md:rounded-[40px] aspect-[3/4] overflow-hidden relative shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=2787&auto=format&fit=crop"
                  alt="Dance Performer"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
              </div>
              <div className="rounded-[20px] sm:rounded-[30px] md:rounded-[40px] aspect-[3/4] overflow-hidden relative shadow-lg mt-6 sm:mt-8 md:mt-12">
                <Image
                  src="https://images.unsplash.com/photo-1516873240891-4bf014598ab4?q=80&w=2787&auto=format&fit=crop"
                  alt="Professional DJ"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
              </div>
            </div>

            {/* Featured Creators Row */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
              <div className="flex items-center gap-2 sm:gap-3 bg-white shadow-lg p-2 sm:p-3 rounded-full">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full overflow-hidden relative">
                  <Image
                    src="https://images.unsplash.com/photo-1604872441539-ef1db9b25f92?q=80&w=2787&auto=format&fit=crop"
                    alt="Featured Creator"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium text-[#1A1A1A] text-xs sm:text-sm md:text-base truncate">Sarah Johnson</h4>
                  <p className="text-xs sm:text-sm text-gray truncate">Dance & Performance</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 bg-white shadow-lg p-2 sm:p-3 rounded-full">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full overflow-hidden relative">
                  <Image
                    src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2787&auto=format&fit=crop"
                    alt="Featured Creator"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium text-[#1A1A1A] text-xs sm:text-sm md:text-base truncate">Alex Rivera</h4>
                  <p className="text-xs sm:text-sm text-gray truncate">Music & Events</p>
                </div>
              </div>
            </div>

            {/* Additional Featured Creator */}
            <div className="absolute -bottom-2 sm:-bottom-4 right-4 sm:right-8 md:right-12 flex items-center gap-2 sm:gap-3 bg-white shadow-lg p-2 sm:p-3 rounded-full">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full overflow-hidden relative">
                <Image
                  src="https://images.unsplash.com/photo-1524117074681-31bd4de22ad3?q=80&w=2787&auto=format&fit=crop"
                  alt="Featured Creator"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-[#1A1A1A] text-xs sm:text-sm md:text-base truncate">Maya Chen</h4>
                <p className="text-xs sm:text-sm text-gray truncate">Street Dance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Grid Pattern */}
      <style jsx>{`
        .bg-grid-primary\/5 {
          background-size: 15px 15px;
          @media (min-width: 640px) {
            background-size: 20px 20px;
          }
          @media (min-width: 768px) {
            background-size: 30px 30px;
          }
          background-image: linear-gradient(
              to right,
              rgba(54, 128, 161, 0.05) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(54, 128, 161, 0.05) 1px,
              transparent 1px
            );
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
