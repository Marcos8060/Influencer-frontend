import React from "react";
import { FaUsers, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { FaArrowsSplitUpAndLeft } from "react-icons/fa6";
import { IoBulbOutline } from "react-icons/io5";
import Image from "next/image";

const StatCard = ({ icon: Icon, count, label, gradient }) => (
  <div className={`p-6 rounded-2xl ${gradient} backdrop-blur-sm`}>
    <div className="flex items-center gap-4">
      <div className="p-3 bg-white/20 rounded-xl">
        <Icon className="text-white text-2xl" />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-white">{count}</h3>
        <p className="text-white/80 text-sm">{label}</p>
      </div>
    </div>
  </div>
);

const Achievements = () => {
  return (
    <div className="py-24 px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white -z-10" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl -z-10 opacity-60 transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-50 rounded-full blur-3xl -z-10 opacity-60 transform -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900">
                Empower Your Creative Journey
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Join a thriving community of creators, brands, and visionaries. Our platform
                is designed to help you showcase your talent, connect with opportunities,
                and grow your influence.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                icon={FaUsers}
                count="3,460+"
                label="Active Creators"
                gradient="bg-gradient-to-r from-blue-500 to-blue-600"
              />
              <StatCard
                icon={HiOutlineSpeakerphone}
                count="8,550+"
                label="Campaigns"
                gradient="bg-gradient-to-r from-purple-500 to-purple-600"
              />
              <StatCard
                icon={FaArrowsSplitUpAndLeft}
                count="180+"
                label="Brand Partners"
                gradient="bg-gradient-to-r from-pink-500 to-pink-600"
              />
              <StatCard
                icon={IoBulbOutline}
                count="85+"
                label="Marketing Experts"
                gradient="bg-gradient-to-r from-orange-500 to-orange-600"
              />
            </div>

            {/* Social Proof */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Popular Platforms</h3>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaInstagram className="text-2xl" />
                  <span>Instagram</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaTiktok className="text-2xl" />
                  <span>TikTok</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaYoutube className="text-2xl" />
                  <span>YouTube</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden relative">
                  <Image
                    src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2787&auto=format&fit=crop"
                    alt="Creator"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                  <Image
                    src="https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?q=80&w=2940&auto=format&fit=crop"
                    alt="Creator"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                  <Image
                    src="https://images.unsplash.com/photo-1601288496920-b6154fe3626a?q=80&w=2787&auto=format&fit=crop"
                    alt="Creator"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="aspect-[4/5] rounded-2xl overflow-hidden relative">
                  <Image
                    src="https://images.unsplash.com/photo-1618151313441-bc79b11e5090?q=80&w=2787&auto=format&fit=crop"
                    alt="Creator"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Floating Achievement Card */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg w-max">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden relative">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop"
                    alt="Featured Creator"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900">Sarah Johnson</h3>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Top Creator</span>
                  </div>
                  <p className="text-gray-600 text-sm">1.2M+ Followers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
