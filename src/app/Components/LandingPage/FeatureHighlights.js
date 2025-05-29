import React from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, Zap, Target, BarChart3 } from "lucide-react";
import Link from "next/link";

const FeatureHighlights = () => {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Matching",
      description: "Our smart algorithm connects brands with the perfect creators based on audience, style, and performance.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Campaign Launch",
      description: "Create and launch campaigns in minutes with our intuitive dashboard and automated workflows.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2940&auto=format&fit=crop"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Performance Tracking",
      description: "Real-time analytics and insights to measure campaign success and optimize your strategy.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Smart Analytics",
      description: "Deep insights into campaign performance, audience engagement, and ROI metrics.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2940&auto=format&fit=crop"
    }
  ];

  return (
    <div className="relative py-24 bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[#F0FFFF]/20" />
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-[#F0FFFF] rounded-full blur-3xl -z-10 opacity-30" />
      
      <div className="max-w-7xl mx-auto px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-light text-[#1A1A1A] mb-6">
            Powerful Features That Drive Results
          </h2>
          <p className="text-xl text-gray max-w-3xl mx-auto">
            Our platform combines cutting-edge technology with intuitive design to make
            influencer marketing effortless and effective.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-[40px] border border-gray/10 hover:border-gray/20 transition-all hover:shadow-xl"
            >
              {/* Feature Image */}
              <div className="relative h-[300px]">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>

              {/* Feature Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-white/90">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-8 left-8">
                  <Link
                    href={`/features/${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center gap-2 text-white group/link"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        {/* <div className="mt-16 text-center">
          <Link
            href="/features"
            className="inline-flex items-center gap-2 text-[#1A1A1A] group"
          >
            <span className="text-lg">Explore All Features</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default FeatureHighlights; 