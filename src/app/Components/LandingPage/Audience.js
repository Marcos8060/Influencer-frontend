import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Audience = () => {
  const stats = [
    {
      value: "1.8M+",
      label: "Active Users",
      description: "Growing community of brands and creators"
    },
    {
      value: "85%",
      label: "Campaign Success",
      description: "Campaigns that meet or exceed goals"
    },
    {
      value: "$50M+",
      label: "Creator Earnings",
      description: "Paid out to creators in 2023"
    },
    {
      value: "20K+",
      label: "Brand Campaigns",
      description: "Successfully completed campaigns"
    }
  ];

  const categories = [
    {
      name: "Entertainment",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
      count: "2,500+"
    },
    {
      name: "Lifestyle",
      image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b",
      count: "3,200+"
    },
    {
      name: "Fashion",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
      count: "2,800+"
    },
    {
      name: "Tech",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      count: "1,500+"
    }
  ];

  return (
    <div className="relative py-24 overflow-hidden bg-gradient-to-br from-white via-white to-[#F0FFFF]">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-grid-primary/5 [mask-image:linear-gradient(0deg,transparent,black,transparent)]" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-20 right-0 w-[300px] h-[300px] md:w-[800px] md:h-[800px] bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-30 mix-blend-multiply animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gradient-to-r from-secondary/20 to-primary/20 rounded-full blur-3xl opacity-30 mix-blend-multiply" />
      
      <div className="max-w-7xl mx-auto px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-7xl lg:text-8xl font-light text-[#1A1A1A] mb-6">
            A Global Community of Creators
          </h2>
          <p className="text-xl text-gray font-light max-w-3xl mx-auto">
            Join thousands of creators and brands making waves in the digital space.
            From micro-influencers to global stars, everyone's welcome.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-[30px] bg-white border border-primary/5 hover:border-primary/10 transition-all hover:shadow-lg"
            >
              <div className="text-4xl font-light text-[#1A1A1A] mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-light text-[#1A1A1A] mb-2">
                {stat.label}
              </div>
              <p className="text-gray font-light">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-[40px] aspect-[3/4] shadow-lg"
            >
              {/* Category Image */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-medium mb-2">{category.name}</h3>
                <p className="text-white/90 font-light">{category.count} Creators</p>
              </div>

              {/* Hover State */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-primary/40 opacity-0 group-hover:opacity-100 transition-all">
                <div className="absolute bottom-6 left-6">
                  <Link
                    href={`/creators/${category.name.toLowerCase()}`}
                    className="inline-flex items-center gap-2 text-white group/link"
                  >
                    <span className="font-light">View Creators</span>
                    <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Creators Row */}
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <div className="flex items-center gap-3 bg-white shadow-lg p-3 rounded-full">
            <div className="w-12 h-12 rounded-full overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1604872441539-ef1db9b25f92"
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
                src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819"
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

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Link
            href="/influencer/dynamic-pages"
            className="inline-block bg-primary text-white px-8 py-4 rounded-full font-light hover:bg-secondary transition-all"
          >
            Explore All Categories
          </Link>
        </div>
      </div>

      {/* Custom Grid Pattern */}
      <style jsx>{`
        .bg-grid-primary\/5 {
          background-size: 20px 20px;
          @media (min-width: 768px) {
            background-size: 30px 30px;
          }
          background-image: linear-gradient(to right, rgba(54,128,161,0.05) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(54,128,161,0.05) 1px, transparent 1px);
        }
      `}</style>
    </div>
  );
};

export default Audience; 