import React from "react";
import { XCircle, CheckCircle } from "lucide-react";
import Image from "next/image";

const ProblemSolution = () => {
  const problems = [
    "No more chasing DMs or lost briefs",
    "No inflated agency retainers",
    "No vague metrics or unpaid creators"
  ];

  const solutions = [
    "Connect brands and influencers instantly",
    "Run gifted, paid or affiliate campaigns",
    "Track content, contracts, results — effortlessly",
    "Drive revenue with trusted creators, not guesswork"
  ];

  return (
    <div className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden bg-white">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] bg-[#F0FFFF] rounded-full blur-3xl -z-10 opacity-30" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] bg-[#F0FFFF] rounded-full blur-3xl -z-10 opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-12 sm:mb-14 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1A1A] mb-4 sm:mb-6">🎯 What We Solve</h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray max-w-3xl mx-auto">
            Influencer marketing is broken. Too much faff. Too little return.
            <br />
            <span className="font-medium">We fix the chaos.</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-start">
          {/* Problems Section */}
          <div className="space-y-6 sm:space-y-8">
            <div className="flex items-center gap-2 sm:gap-3">
              <XCircle className="text-red w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
              <h3 className="text-xl sm:text-2xl font-light text-[#1A1A1A]">The Problems</h3>
            </div>
            <div className="space-y-3 sm:space-y-4 relative">
              {/* Decorative Line */}
              <div className="absolute left-3 sm:left-4 top-0 bottom-0 w-px bg-red/10" />
              
              {problems.map((problem, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 sm:gap-6 pl-6 sm:pl-8 relative group"
                >
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border-2 border-red/20 group-hover:border-red/40 transition-colors" />
                  <p className="text-base sm:text-lg text-gray py-3 sm:py-4">{problem}</p>
                </div>
              ))}
            </div>

            {/* Problem Image */}
            <div className="relative h-[200px] sm:h-[250px] md:h-[300px] rounded-[20px] sm:rounded-[25px] md:rounded-[30px] overflow-hidden mt-6 sm:mt-8">
              <Image
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2787&auto=format&fit=crop"
                alt="Frustrated Content Creator"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white">
                <p className="text-xs sm:text-sm font-light">Old Way</p>
                <p className="text-base sm:text-lg md:text-xl">Endless back-and-forth</p>
              </div>
            </div>
          </div>

          {/* Solutions Section */}
          <div className="space-y-6 sm:space-y-8">
            <div className="flex items-center gap-2 sm:gap-3">
              <CheckCircle className="text-green w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
              <h3 className="text-xl sm:text-2xl font-light text-[#1A1A1A]">Our Solution</h3>
            </div>
            <div className="space-y-3 sm:space-y-4 relative">
              {/* Decorative Line */}
              <div className="absolute left-3 sm:left-4 top-0 bottom-0 w-px bg-green/10" />
              
              {solutions.map((solution, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 sm:gap-6 pl-6 sm:pl-8 relative group"
                >
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border-2 border-green/20 group-hover:border-green/40 transition-colors" />
                  <p className="text-base sm:text-lg text-gray py-3 sm:py-4">{solution}</p>
                </div>
              ))}
            </div>

            {/* Solution Image */}
            <div className="relative h-[200px] sm:h-[250px] md:h-[300px] rounded-[20px] sm:rounded-[25px] md:rounded-[30px] overflow-hidden mt-6 sm:mt-8">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2787&auto=format&fit=crop"
                alt="Successful Content Creator"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white">
                <p className="text-xs sm:text-sm font-light">Grace Belgravia Way</p>
                <p className="text-base sm:text-lg md:text-xl">Streamlined Success</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-14 md:mt-16 text-center">
          <p className="text-base sm:text-lg md:text-xl text-gray max-w-3xl mx-auto">
            Grace Belgravia is your all-in-one influencer marketing platform for launching campaigns,
            finding the right creators, and collecting performance-led UGC — all from one neat dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolution; 