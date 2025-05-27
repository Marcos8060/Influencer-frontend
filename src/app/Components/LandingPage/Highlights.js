import React from "react";
import { Settings2, Shield, UserCheck, Search, Video, Bot, Sparkles } from "lucide-react";

const FeatureCard = ({ Icon, title, items, gradient }) => (
  <div className={`${gradient} rounded-2xl p-8 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}>
    <div className="flex items-start gap-4">
      <div className="p-3 bg-white/20 rounded-xl">
        <Icon className="text-white text-2xl" />
      </div>
      <div className="space-y-4">
        <h3 className="text-white font-semibold text-lg">{title}</h3>
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-white/90 text-sm leading-relaxed">
              <Sparkles className="text-white/80 mt-1 flex-shrink-0" size={16} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const Highlights = () => {
  const features = [
    {
      Icon: Shield,
      title: "Verified User Authentication",
      gradient: "bg-gradient-to-r from-blue-600 to-blue-700",
      items: [
        "Rigorous verification processes ensure the authenticity of user identities",
        "Users undergo identity checks against government databases for added security and trustworthiness"
      ]
    },
    {
      Icon: Bot,
      title: "Talent Matching Algorithm",
      gradient: "bg-gradient-to-r from-purple-600 to-purple-700",
      items: [
        "Leverage our proprietary talent matching algorithm to find the perfect fit for your project",
        "Receive personalized recommendations based on your project requirements and preferences"
      ]
    },
    {
      Icon: Video,
      title: "Personalized Profiles",
      gradient: "bg-gradient-to-r from-pink-600 to-pink-700",
      items: [
        "Build a personalized profile that showcases your unique talents, skills, and expertise",
        "Customize your profile with a bio, portfolio, work samples, and social media integration"
      ]
    },
    {
      Icon: Search,
      title: "Advanced Search and Discovery",
      gradient: "bg-gradient-to-r from-orange-600 to-orange-700",
      items: [
        "Explore a diverse community of verified creatives spanning various industries",
        "Use advanced search filters to find talent based on skills, location, and availability"
      ]
    }
  ];

  return (
    <div className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 -z-10" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl -z-10 animate-pulse" />

      <div className="max-w-7xl mx-auto px-8">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">
            Platform Highlights
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Discover the powerful features that make our platform the perfect place for creators and brands to connect and collaborate.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 relative">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}

          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl -z-10" />
        </div>

        {/* Bottom Section - Free to Join */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 p-[2px] rounded-full">
            <div className="bg-gray-900 rounded-full px-8 py-4">
              <div className="flex items-center gap-3 text-white">
                <UserCheck className="text-2xl" />
                <span className="text-lg font-medium">No Cost to Join - Start Creating Today</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-10 animate-bounce">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm" />
        </div>
        <div className="absolute bottom-20 left-10 animate-pulse">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500/20 to-orange-500/20 backdrop-blur-sm" />
        </div>
      </div>
    </div>
  );
};

export default Highlights;