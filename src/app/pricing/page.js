"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  nextStep,
  setCurrentStep,
  previousStep,
} from "@/redux/features/stepper";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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
  const router = useRouter();
  const [selectedPlanIdx, setSelectedPlanIdx] = useState(() => {
    const popularIdx = plans.findIndex(p => p.popular);
    return popularIdx !== -1 ? popularIdx : 0;
  });
  useEffect(() => {
    dispatch(setCurrentStep(17));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-white to-secondary/20 py-12 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Plan Cards */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-gray mb-2 tracking-tight drop-shadow-sm">Choose a plan that's right for you</h2>
          <p className="text-lg text-color mb-10">We believe influencer marketing should be accessible to all companies, no matter the size of your startup.</p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12 w-full px-2 md:px-0">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`flex flex-col items-center bg-white/90 rounded-2xl border-2 p-6 sm:p-8 w-full max-w-xs shadow-lg transition-all duration-300 cursor-pointer hover:shadow-2xl hover:scale-105 mx-auto ${
                idx === selectedPlanIdx ? 'border-primary scale-105 shadow-2xl ring-2 ring-primary/20' : 'border-input'
              }`}
              onClick={() => setSelectedPlanIdx(idx)}
              style={{ minWidth: 0 }}
            >
              <div className="flex items-center gap-2 mb-2 text-base sm:text-2xl">
                <span className="font-bold text-gray-800">{plan.name.replace(' plan', '')}</span>
                {plan.popular && (
                  <span className="px-2 py-0.5 text-xs font-bold uppercase bg-yellow text-white rounded-full">Most Popular</span>
                )}
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-primary mb-1">{plan.price}</div>
              {plan.priceValue !== 0 && <div className="text-xs text-gray font-medium mb-2">/month</div>}
              <ul className="text-xs sm:text-sm text-gray-700 mb-4 w-full list-disc list-inside">
                {plan.features.slice(0, 3).map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
                {plan.features.length > 3 && <li className="text-link cursor-pointer" onClick={e => {e.stopPropagation(); setSelectedPlanIdx(idx);}}>+{plan.features.length - 3} more</li>}
              </ul>
              <button
                className={`mt-auto w-full px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow text-sm sm:text-base ${
                  idx === selectedPlanIdx
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'bg-secondary text-white hover:bg-secondary/90'
                }`}
                onClick={e => {
                  e.stopPropagation();
                  if (typeof window !== 'undefined') {
                    localStorage.setItem("selectedPlan", JSON.stringify(plan));
                  }
                  router.push("/pricing/payment");
                }}
              >
                Get started
              </button>
            </div>
          ))}
        </div>
        {/* Multi-Plan Comparison Table with Highlighted Column */}
        <div className="overflow-x-auto rounded-2xl border border-input bg-white/80 mb-16 shadow-2xl backdrop-blur-md max-w-5xl mx-auto animate-fade-in text-xs sm:text-base">
          <table className="min-w-full text-xs sm:text-base">
            <thead>
              <tr className="bg-gradient-to-r from-white/90 via-secondary/10 to-white/80">
                <th className="py-5 px-4 text-left font-bold text-gray text-base sm:text-lg tracking-wide">Feature</th>
                {plans.map((plan, idx) => (
                  <th
                    key={plan.name}
                    className={`py-5 px-4 text-center font-bold text-base sm:text-lg text-gray relative drop-shadow-sm transition-all duration-200 ${
                      idx === selectedPlanIdx ? 'bg-primary/10 text-primary ring-2 ring-primary/30' : ''
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <span>{plan.name.replace(' plan', '')}</span>
                      <span className="text-lg font-extrabold">{plan.price}</span>
                      {plan.priceValue !== 0 && <span className="text-xs text-gray font-medium">/month</span>}
                      {plan.popular && (
                        <span className="mt-2 px-2 py-0.5 text-xs font-bold uppercase bg-yellow text-white rounded-full">Most Popular</span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {plans[0].features.map((feature, rowIdx) => (
                <tr
                  key={feature}
                  className={rowIdx % 2 === 0 ? "bg-white/70" : "bg-white/40"}
                >
                  <td className="py-4 px-4 font-medium text-gray-700 border-t border-input w-40 sm:w-56">
                    {feature}
                  </td>
                  {plans.map((plan, colIdx) => (
                    <td
                      key={plan.name + feature}
                      className={`py-4 px-4 text-center border-t border-input transition-all duration-200 ${
                        colIdx === selectedPlanIdx ? 'bg-primary/10 text-primary font-bold ring-2 ring-primary/30' : ''
                      }`}
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
