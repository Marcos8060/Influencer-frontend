"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  nextStep,
  setCurrentStep,
  previousStep,
} from "@/redux/features/stepper";

const plans = [
  {
    name: "Discovery plan",
    price: "Free",
    priceValue: 0,
    description: "For exploring brands & startups",
    cta: "Get started",
    features: [
      "Browse influencers",
      "Contact details access",
      "Campaign creation",
      "Monthly invites",
      "Creator collaborations",
      "Advanced search filters",
      "Analytics",
      "ROI modeling",
      "Team seats",
      "Dedicated strategist",
      "Geographic targeting",
      "Language & geo filters",
      "UK Brand Spotlight",
      "Early feature access",
    ],
    values: [
      <span className="text-link font-medium">View profiles</span>,
      <span className="text-red">✗</span>,
      <span className="text-yellow font-medium">1 saved</span>,
      <span className="text-red">✗</span>,
      <span className="text-red">✗</span>,
      <span className="text-red">✗</span>,
      <span className="text-red">✗</span>,
      <span className="text-red">✗</span>,
      1,
      <span className="text-red">✗</span>,
      <span className="text-yellow font-medium">Basic suggestions</span>,
      <span className="text-red">✗</span>,
      <span className="text-red">✗</span>,
      <span className="text-red">✗</span>,
    ],
    popular: false,
    icon: null,
  },
  {
    name: "Local plan",
    price: "£49",
    priceValue: 49,
    description: "For local service-based businesses",
    cta: "Get started",
    features: [
      "Browse influencers",
      "Contact details access",
      "Campaign creation",
      "Monthly invites",
      "Creator collaborations",
      "Advanced search filters",
      "Analytics",
      "ROI modeling",
      "Team seats",
      "Dedicated strategist",
      "Geographic targeting",
      "Language & geo filters",
      "UK Brand Spotlight",
      "Early feature access",
    ],
    values: [
      <span className="text-green">✓</span>,
      <span className="text-green">✓</span>,
      "Up to 3",
      150,
      "Up to 5",
      <span className="text-green">✓</span>,
      <span className="text-yellow font-medium">Basic reach & views</span>,
      <span className="text-red">✗</span>,
      1,
      <span className="text-red">✗</span>,
      <span className="text-yellow font-medium">Region/City only</span>,
      <span className="text-red">✗</span>,
      <span className="text-red">✗</span>,
      <span className="text-red">✗</span>,
    ],
    popular: true,
    icon: null,
  },
  {
    name: "Nationwide plan",
    price: "£89",
    priceValue: 89,
    description: "For UK-wide eCommerce & regional brands",
    cta: "Get started",
    features: [
      "Browse influencers",
      "Contact details access",
      "Campaign creation",
      "Monthly invites",
      "Creator collaborations",
      "Advanced search filters",
      "Analytics",
      "ROI modeling",
      "Team seats",
      "Dedicated strategist",
      "Geographic targeting",
      "Language & geo filters",
      "UK Brand Spotlight",
      "Early feature access",
    ],
    values: [
      <span className="text-green">✓</span>,
      <span className="text-green">✓</span>,
      "Up to 5",
      300,
      "Up to 10",
      <span className="text-green">✓</span>,
      <span className="text-green">Audience demographics</span>,
      <span className="text-green">✓</span>,
      1,
      <span className="text-red">✗</span>,
      <span className="text-green">All UK creators</span>,
      <span className="text-red">✗</span>,
      <span className="text-green">✓</span>,
      <span className="text-red">✗</span>,
    ],
    popular: false,
    icon: null,
  },
  {
    name: "Global plan",
    price: "£149",
    priceValue: 149,
    description: "For international brands & agencies",
    cta: "Get started",
    features: [
      "Browse influencers",
      "Contact details access",
      "Campaign creation",
      "Monthly invites",
      "Creator collaborations",
      "Advanced search filters",
      "Analytics",
      "ROI modeling",
      "Team seats",
      "Dedicated strategist",
      "Geographic targeting",
      "Language & geo filters",
      "UK Brand Spotlight",
      "Early feature access",
    ],
    values: [
      <span className="text-green">✓</span>,
      <span className="text-green">✓</span>,
      "Up to 7",
      600,
      "Up to 15",
      <span className="text-green">✓</span>,
      <span className="text-green">Engagement heatmaps</span>,
      <span className="text-green">✓</span>,
      <span className="text-green">1 included</span>,
      <span className="text-green">✓</span>,
      <span className="text-green">Global access</span>,
      <span className="text-green">✓</span>,
      <span className="text-green">✓</span>,
      <span className="text-green">✓</span>,
    ],
    popular: false,
    icon: null,
  },
];

const Pricing = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentStep(17));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white py-12 px-2 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Plan Cards */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-gray mb-2">
            Choose a plan that's right for you
          </h2>
          <p className="text-lg text-muted mb-10">
            We believe influencer marketing should be accessible to all
            companies, no matter the size of your startup.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col justify-between p-7 rounded-3xl border bg-white shadow transition-all duration-300 hover:shadow-lg ${
                plan.popular ? "border-2 border-secondary" : "border-input"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="px-4 py-1.5 text-xs font-semibold tracking-wide text-white uppercase bg-yellow rounded-full shadow-md">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray mb-2">
                  {plan.name.replace(" plan", "")}
                </h2>
                <p className="text-muted text-base mb-4">{plan.description}</p>
                <div className="flex items-end justify-center gap-2 mb-2">
                  <span className="text-5xl font-extrabold text-primary">
                    {plan.price}
                  </span>
                  {plan.priceValue !== 0 && (
                    <span className="text-base text-gray font-medium mb-1">
                      /month
                    </span>
                  )}
                </div>
              </div>
              <button
                className={`w-full px-6 py-3.5 rounded-xl text-base font-semibold text-white transition-all duration-300 mt-auto ${
                  plan.popular
                    ? "bg-secondary hover:bg-secondary/90 shadow-lg shadow-secondary/20"
                    : "bg-primary hover:bg-primary/90 shadow-md"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-input bg-white mb-16">
          <table className="min-w-full text-sm md:text-base">
            <thead>
              <tr className="bg-background">
                <th className="py-5 px-4 text-left font-bold text-gray text-lg">
                  Overview
                </th>
                {plans.map((plan, idx) => (
                  <th
                    key={plan.name}
                    className="py-5 px-4 text-center font-bold text-lg text-gray relative"
                  >
                    {plan.name.replace(" plan", "")}
                    {plan.popular && (
                      <span className="absolute top-2 left-1/2 -translate-x-1/2 bg-yellow text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                        Most Popular
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {plans[0].features.map((feature, rowIdx) => (
                <tr
                  key={feature}
                  className={rowIdx % 2 === 0 ? "bg-white" : "bg-background"}
                >
                  <td className="py-4 px-4 font-medium text-gray-700 border-t border-input w-56">
                    {feature}
                  </td>
                  {plans.map((plan, colIdx) => (
                    <td
                      key={plan.name + feature}
                      className="py-4 px-4 text-center border-t border-input"
                    >
                      {typeof plan.values[rowIdx] === "string" ||
                      typeof plan.values[rowIdx] === "number" ? (
                        <span>{plan.values[rowIdx]}</span>
                      ) : (
                        plan.values[rowIdx]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
