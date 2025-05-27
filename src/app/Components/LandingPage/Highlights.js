import React from "react";
import { Settings2, Shield, UserCheck, Search, Video, Bot, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const FeatureCard = ({ Icon, title, items, gradient }) => (
  <div className={`${gradient} rounded-2xl p-8 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-white/10`}>
    <div className="flex items-start gap-4">
      <div className="p-3 bg-white/20 rounded-xl">
        <Icon className="text-white" strokeWidth={1.5} size={24} />
      </div>
      <div className="space-y-4">
        <h3 className="text-white font-semibold text-lg">{title}</h3>
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-white/90 text-sm leading-relaxed">
              <Sparkles className="text-white/80 mt-1 flex-shrink-0" size={14} strokeWidth={1.5} />
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
      title: "Advanced Security",
      gradient: "bg-gradient-to-r from-primary to-primary/80",
      items: [
        "Multi-factor authentication and robust data encryption",
        "Secure payment processing and data protection protocols"
      ]
    },
    {
      Icon: Bot,
      title: "Smart Match™ Technology",
      gradient: "bg-gradient-to-r from-secondary to-secondary/80",
      items: [
        "AI-powered creator-brand matching based on performance metrics",
        "Real-time analytics and engagement predictions"
      ]
    },
    {
      Icon: Video,
      title: "Content Management",
      gradient: "bg-gradient-to-r from-primary/90 to-secondary",
      items: [
        "Streamlined content approval and revision process",
        "Integrated scheduling and publishing tools"
      ]
    },
    {
      Icon: Search,
      title: "Discovery & Analytics",
      gradient: "bg-gradient-to-r from-secondary/90 to-primary",
      items: [
        "Advanced search with demographic and performance filters",
        "Comprehensive campaign analytics and ROI tracking"
      ]
    }
  ];

  return (
    <div className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 -z-10" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-primary/5 [mask-image:linear-gradient(0deg,transparent,black,transparent)]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* Gradient Orbs */}
      <div className="absolute top-20 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 opacity-50 mix-blend-multiply" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl -z-10 opacity-50 mix-blend-multiply" />
      <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl opacity-30 mix-blend-multiply animate-pulse" />

      <div className="max-w-7xl mx-auto px-8 relative">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-16 relative">
          <span className="text-primary font-medium">PLATFORM FEATURES</span>
          <h2 className="text-4xl font-bold">
            Powerful Tools for Growth
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Grace Belgravia provides cutting-edge features that empower creators and brands 
            to build meaningful partnerships and achieve exceptional results.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 relative">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}

          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl -z-10" />
        </div>

        {/* Bottom Section - Call to Action */}
        <div className="mt-20 text-center relative">
          <div className="inline-block bg-gradient-to-r from-primary to-secondary p-[1px] rounded-full hover:scale-105 transition-transform">
            <Link href="/register" className="block bg-gray-900 rounded-full px-8 py-4 hover:bg-gray-800/80 transition-colors">
              <div className="flex items-center gap-3 text-white">
                <UserCheck strokeWidth={1.5} size={24} />
                <span className="text-lg font-medium">Start Your Journey Today</span>
                <ArrowRight strokeWidth={1.5} size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
          <p className="mt-4 text-gray-400">No credit card required • Free to join</p>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm" />
        </div>
        <div className="absolute bottom-20 right-10 animate-pulse">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-secondary/10 to-primary/10 backdrop-blur-sm" />
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .bg-grid-primary\/5 {
          background-size: 30px 30px;
          background-image: linear-gradient(to right, rgba(54,128,161,0.05) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(54,128,161,0.05) 1px, transparent 1px);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Highlights;