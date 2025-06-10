"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  nextStep,
  setCurrentStep,
  previousStep,
} from "@/redux/features/stepper";

const Pricing = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentStep(17));
  }, [dispatch]);

  const plans = [
    {
      name: "Discovery Plan",
      price: "Free",
      period: "forever",
      description: "For exploring brands & startups",
      features: [
        "Browse influencers (blurred contact info)",
        "Draft & save 1 campaign",
        "Get 20–30 influencer suggestions (by niche & location)",
        "Create a brand profile",
        "Connect social media + verify contact",
      ],
      locked: [
        "Cannot launch campaigns",
        "No contact, invites, or analytics",
      ],
      upgradeTeasers: [
        "You've matched with 37 creators – unlock to connect",
        "Send invites and see full profiles — upgrade now",
      ],
      cta: "Get Started",
      popular: false,
      icon: "🆓",
      gradient: "from-[#f5f9fc] to-white"
    },
    {
      name: "Local Plan",
      price: "£49",
      period: "per month",
      description: "For local service-based businesses",
      features: [
        "Access creators within your chosen region or city",
        "Advanced search filters (gender, age, platform)",
        "Up to 3 active campaigns",
        "Up to 150 invites/month",
        "Work with up to 5 creators/month",
        "Campaign performance analytics (basic reach & views)",
      ],
      cta: "Start Free Trial",
      popular: true,
      icon: "🏙",
      gradient: "from-[#5373d4]/5 to-white"
    },
    {
      name: "Nationwide Plan",
      price: "£89",
      period: "per month",
      description: "For UK-wide eCommerce & regional brands",
      features: [
        "Search & collaborate with creators across the UK",
        "Up to 5 active campaigns",
        "Up to 300 invites/month",
        "Work with up to 10 creators/month",
        "Advanced analytics (audience gender, age, regional split)",
        "Predictive ROI modelling",
        "UK Brand Spotlight eligibility",
      ],
      cta: "Start Free Trial",
      popular: false,
      icon: "🇬🇧",
      gradient: "from-[#3680A1]/5 to-white"
    },
    {
      name: "Global Plan",
      price: "£149",
      period: "per month",
      description: "For international brands & agencies",
      features: [
        "Global creator discovery across all regions",
        "Up to 7 active campaigns",
        "Up to 600 invites/month",
        "Work with up to 15 creators/month",
        "Language + geo targeting filters",
        "Content engagement heatmaps",
        "1 team seat included",
        "Dedicated strategist session monthly",
        "Early feature access",
      ],
      cta: "Start Free Trial",
      popular: false,
      icon: "🌍",
      gradient: "from-[#5373d4]/5 to-white"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f5f9fc] to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl mb-6">
            Tailored by geography, not jargon
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed">
            Choose a plan that matches your scale of operations
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-6 rounded-3xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? "bg-gradient-to-br from-white to-white border-2 border-[#5373d4]" 
                  : `bg-gradient-to-br ${plan.gradient}`
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="px-4 py-1.5 text-xs font-semibold tracking-wide text-white uppercase bg-[#5373d4] rounded-full shadow-md">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{plan.icon}</span>
                  <h2 className="text-2xl font-bold text-gray-900">{plan.name}</h2>
                </div>
                <p className="text-gray-600 text-lg">{plan.description}</p>
                
                <div className="mt-6 flex items-baseline">
                  <span className="text-5xl font-extrabold text-[#3680A1]">
                    {plan.price}
                  </span>
                  <span className="ml-2 text-lg font-medium text-gray-500">
                    /{plan.period}
                  </span>
                </div>
              </div>
              
              {/* Features */}
              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <svg
                      className="h-5 w-5 text-[#5373d4] mt-0.5 flex-shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-3 text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Locked Features (for Discovery Plan) */}
              {plan.locked && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Locked:</h4>
                  <ul className="space-y-3">
                    {plan.locked.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="ml-3 text-gray-500">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Upgrade Teasers (for Discovery Plan) */}
              {plan.upgradeTeasers && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <ul className="space-y-3">
                    {plan.upgradeTeasers.map((teaser) => (
                      <li key={teaser} className="text-sm text-[#5373d4] italic bg-[#5373d4]/5 px-4 py-2 rounded-lg">
                        "{teaser}"
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* CTA */}
              <div className="mt-8">
                <button
                  className={`w-full px-6 py-3.5 rounded-xl text-base font-semibold text-white transition-all duration-300 ${
                    plan.popular
                      ? "bg-[#5373d4] hover:bg-[#4a67c0] shadow-lg shadow-[#5373d4]/20"
                      : "bg-[#3680A1] hover:bg-[#2a6a8a] shadow-md"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;