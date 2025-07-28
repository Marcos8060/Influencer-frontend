import React from "react";
import Image from "next/image";
import { ArrowRight, DollarSign, Briefcase, Shield, Award } from "lucide-react";
import Link from "next/link";

const CreatorFeatures = () => {
  const features = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Get Paid Your Worth",
      description: "Set your own rates and receive secure, on-time payments for every collaboration."
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Choose Your Brands",
      description: "Browse and apply to campaigns that match your style and values."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Protected Rights",
      description: "Clear content usage terms and protected intellectual property rights."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Grow Your Career",
      description: "Access exclusive opportunities and build long-term brand relationships."
    }
  ];

  const testimonials = [
    {
      name: "Alex Rivera",
      role: "Dance & Performance",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
      quote: "Grace Belgravia helped me turn my passion into a thriving career. The opportunities and support are unmatched."
    },
    {
      name: "Maya Chen",
      role: "Lifestyle Creator",
      image: "https://images.unsplash.com/photo-1524117074681-31bd4de22ad3",
      quote: "I've doubled my income and work with amazing brands. The platform makes everything so seamless."
    }
  ];

  return (
    <div className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-primary/5 via-white to-secondary/5 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 right-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] bg-primary/10 rounded-full blur-3xl -z-10 opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          {/* Left Content - Creator Showcase */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-[20px] sm:rounded-[30px] md:rounded-[40px] overflow-hidden shadow-2xl border border-primary/10">
              <Image
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2362&auto=format&fit=crop"
                alt="Creator Dashboard"
                width={800}
                height={600}
                className="object-cover w-full h-auto"
              />
              
              {/* Overlay Stats */}
              <div className="absolute inset-0 bg-gradient-to-t from-color/80 via-color/20 to-transparent" />
              <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 right-4 sm:right-6 md:right-8">
                <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                  <div className="bg-white/95 backdrop-blur-sm p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl">
                    <p className="text-xs sm:text-sm text-gray">Avg. Rate</p>
                    <p className="text-lg sm:text-xl md:text-2xl font-medium text-primary">$1.2K</p>
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl">
                    <p className="text-xs sm:text-sm text-gray">Campaigns</p>
                    <p className="text-lg sm:text-xl md:text-2xl font-medium text-primary">24</p>
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl">
                    <p className="text-xs sm:text-sm text-gray">Growth</p>
                    <p className="text-lg sm:text-xl md:text-2xl font-medium text-primary">+85%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 sm:-top-6 md:-top-8 -left-4 sm:-left-6 md:-left-8 bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg border border-primary/10">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full overflow-hidden relative">
                  <Image
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=2787&auto=format&fit=crop"
                    alt="Brand Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-primary text-xs sm:text-sm md:text-base truncate">New Campaign</p>
                  <p className="text-xs sm:text-sm text-gray truncate">$2,500 Budget</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8 sm:space-y-10 md:space-y-12 order-1 lg:order-2">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-color mb-4 sm:mb-6">
                For Creators Who Dream Big
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray">
                Turn your influence into income. Our platform connects you with premium brands
                and provides the tools you need to succeed.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group p-4 sm:p-5 md:p-6 rounded-[20px] sm:rounded-[25px] md:rounded-[30px] bg-white border border-primary/10 hover:border-primary/20 transition-all hover:shadow-lg"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-3 sm:mb-4">
                    {React.cloneElement(feature.icon, { className: "w-6 h-6 text-primary" })}
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium text-color mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Testimonials */}
            <div className="space-y-4 sm:space-y-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 rounded-[20px] sm:rounded-[25px] md:rounded-[30px] bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full overflow-hidden relative flex-shrink-0 border-2 border-primary/20">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                      <h4 className="font-medium text-primary text-sm sm:text-base">{testimonial.name}</h4>
                      <span className="hidden sm:inline text-sm text-gray">•</span>
                      <p className="text-xs sm:text-sm text-gray">{testimonial.role}</p>
                    </div>
                    <p className="text-sm sm:text-base text-gray">{testimonial.quote}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/influencer/influencer-landing-page"
              className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors group"
            >
              <span className="text-base sm:text-lg">Join as Creator</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorFeatures; 