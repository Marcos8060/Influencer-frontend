import React from "react";
import { FaUsers, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { FaArrowsSplitUpAndLeft } from "react-icons/fa6";
import { IoBulbOutline } from "react-icons/io5";
import Image from "next/image";

const StatCard = ({ icon: Icon, count, label, gradient }) => (
  <div className={`p-6 rounded-2xl ${gradient} backdrop-blur-sm transform hover:scale-105 transition-all duration-300 cursor-pointer`}>
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
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 -z-10" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl -z-10 opacity-60 transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl -z-10 opacity-60 transform -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-primary font-semibold">WHY CHOOSE US</span>
              <h2 className="text-4xl font-bold text-color">
                Transform Your Digital Presence
              </h2>
              <p className="text-gray text-lg leading-relaxed">
                Grace Belgravia connects passionate creators with innovative brands. 
                Our platform provides the tools, insights, and opportunities you need 
                to elevate your influence and create meaningful partnerships.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                icon={FaUsers}
                count="10K+"
                label="Active Creators"
                gradient="bg-gradient-to-r from-primary to-primary/80"
              />
              <StatCard
                icon={HiOutlineSpeakerphone}
                count="15K+"
                label="Campaigns"
                gradient="bg-gradient-to-r from-secondary to-secondary/80"
              />
              <StatCard
                icon={FaArrowsSplitUpAndLeft}
                count="2.5K+"
                label="Brand Partners"
                gradient="bg-gradient-to-r from-primary/90 to-secondary"
              />
              <StatCard
                icon={IoBulbOutline}
                count="95%"
                label="Success Rate"
                gradient="bg-gradient-to-r from-secondary/90 to-primary"
              />
            </div>

            {/* Social Proof */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-color">Integrated Platforms</h3>
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3 text-gray hover:text-primary transition-colors group cursor-pointer">
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <FaInstagram className="text-2xl" />
                  </div>
                  <span className="font-medium">Instagram</span>
                </div>
                <div className="flex items-center gap-3 text-gray hover:text-primary transition-colors group cursor-pointer">
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <FaTiktok className="text-2xl" />
                  </div>
                  <span className="font-medium">TikTok</span>
                </div>
                <div className="flex items-center gap-3 text-gray hover:text-primary transition-colors group cursor-pointer">
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <FaYoutube className="text-2xl" />
                  </div>
                  <span className="font-medium">YouTube</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden relative shadow-xl group">
                  <Image
                    src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2787&auto=format&fit=crop"
                    alt="Creator"
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                </div>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden relative shadow-xl group">
                  <Image
                    src="https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?q=80&w=2940&auto=format&fit=crop"
                    alt="Creator"
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden relative shadow-xl group">
                  <Image
                    src="https://images.unsplash.com/photo-1601288496920-b6154fe3626a?q=80&w=2787&auto=format&fit=crop"
                    alt="Creator"
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                </div>
                <div className="aspect-[4/5] rounded-2xl overflow-hidden relative shadow-xl group">
                  <Image
                    src="https://images.unsplash.com/photo-1618151313441-bc79b11e5090?q=80&w=2787&auto=format&fit=crop"
                    alt="Creator"
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                </div>
              </div>
            </div>

            {/* Floating Achievement Card */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl w-max hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden relative border-2 border-primary">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop"
                    alt="Featured Creator"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-color">Sarah Johnson</h3>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">Featured Creator</span>
                  </div>
                  <p className="text-gray">1.2M+ Followers</p>
                  <div className="flex items-center gap-1 mt-1">
                    <FaInstagram className="text-primary" />
                    <span className="text-xs text-gray">@sarahjcreates</span>
                  </div>
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
