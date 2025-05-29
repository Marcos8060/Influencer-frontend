import React from "react";
import Image from "next/image";
import { ArrowRight, BarChart3, Users, Zap, MessageSquare } from "lucide-react";
import Link from "next/link";

const BrandFeatures = () => {
  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Find Perfect Creators",
      description: "Access our curated network of verified influencers across all niches and platforms."
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Seamless Communication",
      description: "Manage briefs, negotiations, and approvals in one streamlined dashboard."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Track Performance",
      description: "Monitor campaign metrics, engagement rates, and ROI in real-time."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Quick Launch",
      description: "Get your campaigns live in minutes, not weeks. No more endless email chains."
    }
  ];

  return (
    <div className="relative py-24 bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-[#F0FFFF] rounded-full blur-3xl -z-10 opacity-30" />
      
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-12">
            <div>
              <h2 className="text-5xl font-light text-[#1A1A1A] mb-6">
                For Brands Who Want Results
              </h2>
              <p className="text-xl text-gray">
                Launch high-performing influencer campaigns without the complexity.
                Our platform streamlines everything from creator discovery to payment.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-[30px] bg-white border border-gray/10 hover:border-gray/20 transition-all hover:shadow-lg"
                >
                  <div className="w-12 h-12 rounded-full bg-[#F0FFFF] flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium text-[#1A1A1A] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/auth/register/brand"
              className="inline-flex items-center gap-2 text-[#1A1A1A] group"
            >
              <span className="text-lg">Start Your Campaign</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Content - Campaign Dashboard Preview */}
          <div className="relative">
            <div className="relative rounded-[40px] overflow-hidden shadow-2xl border border-gray/10">
              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
                alt="Campaign Dashboard"
                width={800}
                height={600}
                className="object-cover"
              />
              
              {/* Overlay Stats */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl">
                    <p className="text-sm text-gray">Reach</p>
                    <p className="text-2xl font-medium text-[#1A1A1A]">2.4M+</p>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl">
                    <p className="text-sm text-gray">Engagement</p>
                    <p className="text-2xl font-medium text-[#1A1A1A]">8.2%</p>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl">
                    <p className="text-sm text-gray">ROI</p>
                    <p className="text-2xl font-medium text-[#1A1A1A]">3.1x</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-8 -right-8 bg-white p-4 rounded-2xl shadow-lg border border-gray/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden relative">
                  <Image
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop"
                    alt="Creator Avatar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-[#1A1A1A]">Sarah Johnson</p>
                  <p className="text-sm text-gray">Campaign Approved</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandFeatures; 