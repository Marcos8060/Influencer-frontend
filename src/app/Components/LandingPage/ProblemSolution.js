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
    <div className="relative py-24 overflow-hidden bg-white">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F0FFFF] rounded-full blur-3xl -z-10 opacity-30" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#F0FFFF] rounded-full blur-3xl -z-10 opacity-30" />

      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-light text-[#1A1A1A] mb-6">🎯 What We Solve</h2>
          <p className="text-2xl text-gray max-w-3xl mx-auto">
            Influencer marketing is broken. Too much faff. Too little return.
            <br />
            <span className="font-medium">We fix the chaos.</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Problems Section */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <XCircle className="text-red w-8 h-8" />
              <h3 className="text-2xl font-light text-[#1A1A1A]">The Problems</h3>
            </div>
            <div className="space-y-4 relative">
              {/* Decorative Line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-red/10" />
              
              {problems.map((problem, index) => (
                <div
                  key={index}
                  className="flex items-start gap-6 pl-8 relative group"
                >
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-red/20 group-hover:border-red/40 transition-colors" />
                  <p className="text-lg text-gray py-4">{problem}</p>
                </div>
              ))}
            </div>

            {/* Problem Image */}
            <div className="relative h-[300px] rounded-[30px] overflow-hidden mt-8">
              <Image
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2787&auto=format&fit=crop"
                alt="Frustrated Content Creator"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm font-light">Old Way</p>
                <p className="text-xl">Endless back-and-forth</p>
              </div>
            </div>
          </div>

          {/* Solutions Section */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green w-8 h-8" />
              <h3 className="text-2xl font-light text-[#1A1A1A]">Our Solution</h3>
            </div>
            <div className="space-y-4 relative">
              {/* Decorative Line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-green/10" />
              
              {solutions.map((solution, index) => (
                <div
                  key={index}
                  className="flex items-start gap-6 pl-8 relative group"
                >
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-green/20 group-hover:border-green/40 transition-colors" />
                  <p className="text-lg text-gray py-4">{solution}</p>
                </div>
              ))}
            </div>

            {/* Solution Image */}
            <div className="relative h-[300px] rounded-[30px] overflow-hidden mt-8">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2787&auto=format&fit=crop"
                alt="Successful Content Creator"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm font-light">Grace Belgravia Way</p>
                <p className="text-xl">Streamlined Success</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-xl text-gray max-w-3xl mx-auto">
            Grace Belgravia is your all-in-one influencer marketing platform for launching campaigns,
            finding the right creators, and collecting performance-led UGC — all from one neat dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolution; 