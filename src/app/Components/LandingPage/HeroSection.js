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
      <div className="absolute top-20 right-0 w-[300px] h-[300px] md:w-[800px] md:h-[800px] bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-30 mix-blend-multiply animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gradient-to-r from-secondary/20 to-primary/20 rounded-full blur-3xl opacity-30 mix-blend-multiply" />

      {/* Navigation */}
      <nav className="relative flex justify-between items-center py-6 px-8">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl md:text-3xl font-light text-gray">
            Grace Belgravia
          </h1>
        </div>
        <div className="flex gap-4">
          <Link
            href="/auth/login/brand"
            className="px-6 py-2 text-gray hover:text-color transition-colors"
          >
            Login
          </Link>
          <Link
            href="/auth/register/brand"
            className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full hover:bg-black transition-all"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-8 pt-12 relative">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Section */}
          <div className="lg:w-1/2 space-y-8 text-left">
            {/* Stats Badge */}
            <div className="flex items-center gap-2 w-fit">
              <FaStar className="text-[#1A1A1A]" />
              <span className="text-gray font-light">1.8M+ Active Users</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-7xl lg:text-8xl font-light text-[#1A1A1A] leading-tight">
              The Influencer Marketing Platform
            </h1>

            {/* CTA Button */}
            <div className="flex items-center gap-2">
              <Link
                href="/influencer/influencer-landing-page"
                className="inline-block bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full font-light "
              >
                For Infuencers
              </Link>
              <Link
                href="/brand/brand-landing-page"
                className="inline-block border border-primary text-black px-8 py-4 rounded-full font-light "
              >
                For Brands
              </Link>
            </div>

            {/* Stats Section */}
            <div className="flex gap-12 pt-12">
              <div>
                <h3 className="text-4xl font-light text-[#1A1A1A]">10K+</h3>
                <p className="text-gray font-light">Creators</p>
              </div>
              <div>
                <h3 className="text-4xl font-light text-[#1A1A1A]">15K+</h3>
                <p className="text-gray font-light">Active Users</p>
              </div>
              <div>
                <h3 className="text-4xl font-light text-[#1A1A1A]">20K+</h3>
                <p className="text-gray font-light">Campaigns</p>
              </div>
            </div>

            {/* Additional Content */}
            <div className="space-y-6 pt-8">
              <p className="text-xl text-gray font-light max-w-2xl">
                No noise. No drama. Just smart tools, powerful insights, and
                effortless brand-creator collaborations.
              </p>
            </div>
          </div>

          {/* Right Section - Creative Image Grid */}
          <div className="lg:w-1/2 relative">
            <div className="grid grid-cols-2 gap-6">
              {/* Top Row */}
              <div className="rounded-[40px] aspect-[3/4] overflow-hidden relative shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=2787&auto=format&fit=crop"
                  alt="Dance Performer"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
              </div>
              <div className="rounded-[40px] aspect-[3/4] overflow-hidden relative shadow-lg mt-12">
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
            <div className="flex gap-4 mt-8">
              <div className="flex items-center gap-3 bg-white shadow-lg p-3 rounded-full">
                <div className="w-12 h-12 rounded-full overflow-hidden relative">
                  <Image
                    src="https://images.unsplash.com/photo-1604872441539-ef1db9b25f92?q=80&w=2787&auto=format&fit=crop"
                    alt="Featured Creator"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-[#1A1A1A]">Sarah Johnson</h4>
                  <p className="text-sm text-gray">Dance & Performance</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white shadow-lg p-3 rounded-full">
                <div className="w-12 h-12 rounded-full overflow-hidden relative">
                  <Image
                    src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2787&auto=format&fit=crop"
                    alt="Featured Creator"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-[#1A1A1A]">Alex Rivera</h4>
                  <p className="text-sm text-gray">Music & Events</p>
                </div>
              </div>
            </div>

            {/* Additional Featured Creator */}
            <div className="absolute -bottom-4 right-12 flex items-center gap-3 bg-white shadow-lg p-3 rounded-full">
              <div className="w-12 h-12 rounded-full overflow-hidden relative">
                <Image
                  src="https://images.unsplash.com/photo-1524117074681-31bd4de22ad3?q=80&w=2787&auto=format&fit=crop"
                  alt="Featured Creator"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium text-[#1A1A1A]">Maya Chen</h4>
                <p className="text-sm text-gray">Street Dance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Grid Pattern */}
      <style jsx>{`
        .bg-grid-primary\/5 {
          background-size: 20px 20px;
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
