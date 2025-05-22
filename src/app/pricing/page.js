"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  nextStep,
  setCurrentStep,
  previousStep,
} from "@/redux/features/stepper";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";

const Pricing = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentStep(17));
  }, [dispatch]);

  const plans = [
    {
      name: "Starter",
      price: "$0",
      period: "forever",
      description: "Perfect for individual creators getting started",
      features: [
        "Up to 3 campaigns",
        "Up to 3 team members",
        "Content usage for all rights",
        "Collaborate with up to 50 creators/yr",
        "Basic analytics",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Professional",
      price: "$29",
      period: "per month",
      description: "For growing creator teams and agencies",
      features: [
        "Unlimited campaigns",
        "Up to 10 team members",
        "Advanced content rights",
        "Collaborate with up to 180 creators/yr",
        "Priority support",
        "Enhanced analytics",
      ],
      cta: "Start 7-Day Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per month",
      description: "For large agencies and production houses",
      features: [
        "Unlimited everything",
        "Dedicated account manager",
        "Custom content rights",
        "White-label solutions",
        "API access",
        "24/7 premium support",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f5f9fc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl mb-4">
            Simple, transparent pricing
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Start with a 7-day free trial. No credit card required.
          </p>
          
          {/* Toggle */}
          <div className="mt-8 flex items-center justify-center">
            <div className="flex items-center bg-gray-100 rounded-full p-1">
              <button
                className="px-6 py-2 rounded-full text-sm font-medium text-gray-700"
              >
                Monthly
              </button>
              <button
                className="px-6 py-2 rounded-full text-sm font-medium text-white bg-[#3680A1] shadow-sm"
              >
                <span>Yearly</span>
                <span className="ml-2 px-2 py-1 text-xs rounded-full bg-[#5373d4]">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mt-12 space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-8 bg-white rounded-2xl shadow-sm border-2 ${
                plan.popular ? "border-[#5373d4]" : "border-transparent"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="px-4 py-1 text-xs font-semibold tracking-wide text-white uppercase bg-[#5373d4] rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-8">
                <h2 className="text-lg font-medium text-gray-900">{plan.name}</h2>
                <p className="mt-2 text-gray-600">{plan.description}</p>
                
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-extrabold text-[#3680A1]">
                    {plan.price}
                  </span>
                  <span className="ml-1 text-lg font-medium text-gray-500">
                    /{plan.period}
                  </span>
                </div>
              </div>
              
              {/* Features */}
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <svg
                      className="h-5 w-5 text-[#5373d4] mt-0.5"
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
              
              {/* CTA */}
              <div className="mt-8">
                <button
                  className={`w-full px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                    plan.popular
                      ? "bg-[#5373d4] hover:bg-[#3e5cb2]"
                      : "bg-[#3680A1] hover:bg-[#2a6a8a]"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">
            Frequently asked questions
          </h2>
          <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
            {[
              {
                question: "Can I change plans later?",
                answer: "Yes, you can upgrade or downgrade your plan at any time."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards and PayPal."
              },
              {
                question: "Is there a contract?",
                answer: "No, you can cancel your subscription at any time."
              },
              {
                question: "Do you offer discounts for non-profits?",
                answer: "Yes! Contact our sales team for special non-profit pricing."
              }
            ].map((faq, index) => (
              <div key={index} className="py-6">
                <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;