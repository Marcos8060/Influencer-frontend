"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  fetchAllPaymentPlans,
  setCheckoutResponse,
} from "@/redux/features/payment-service";
import { Skeleton, Empty, Tag, Badge } from "antd";
import "antd/dist/reset.css";
import axios from "axios";
import { LoadingOutlined, MegaphoneOutlined, EnvironmentOutlined, GlobalOutlined, GiftOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { createCheckoutSession } from "@/redux/services/payment-service";
import {
  plans,
  FEATURES,
  mapBackendPlans,
  reorderPlansToPopularSecond,
  getSerializablePlan,
  getPlanPriceId,
} from "../Components/paymentService/plans";
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

// Skeleton component for plan cards
const PlanCardSkeleton = () => (
  <div className="relative bg-white rounded-2xl border border-input shadow-lg p-6">
    {/* Limited Time Offer Banner Skeleton */}
    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
      <Skeleton.Input 
        active 
        size="small" 
        style={{ width: 120, height: 24, borderRadius: 12 }}
      />
    </div>

    {/* Discount Badge Skeleton */}
    <div className="absolute -top-2 -right-2 z-10">
      <Skeleton.Input 
        active 
        size="small" 
        style={{ width: 60, height: 20, borderRadius: 10 }}
      />
    </div>

    <div className="space-y-4">
      {/* Plan Icon Skeleton */}
      <div className="flex justify-center">
        <Skeleton.Avatar 
          active 
          size={48} 
          shape="circle"
          style={{ backgroundColor: '#f0f0f0' }}
        />
      </div>

      {/* Plan Name Skeleton */}
      <div className="text-center space-y-2">
        <Skeleton.Input 
          active 
          size="large" 
          style={{ width: 120, height: 32 }}
        />
        <Skeleton.Input 
          active 
          size="small" 
          style={{ width: 80, height: 20 }}
        />
      </div>

      {/* Price Skeleton */}
      <div className="text-center space-y-1">
        <Skeleton.Input 
          active 
          size="large" 
          style={{ width: 100, height: 36 }}
        />
        <Skeleton.Input 
          active 
          size="small" 
          style={{ width: 60, height: 16 }}
        />
      </div>

      {/* Description Skeleton */}
      <div className="text-center space-y-2">
        <Skeleton.Input 
          active 
          size="small" 
          style={{ width: '100%', height: 16 }}
        />
        <Skeleton.Input 
          active 
          size="small" 
          style={{ width: '80%', height: 16 }}
        />
      </div>

      {/* Target Audience Skeleton */}
      <div className="text-center">
        <Skeleton.Input 
          active 
          size="small" 
          style={{ width: '90%', height: 14 }}
        />
      </div>

      {/* Button Skeleton */}
      <Skeleton.Input 
        active 
        size="large" 
        style={{ width: '100%', height: 44, borderRadius: 8 }}
      />
    </div>
  </div>
);

const Pricing = () => {
  const dispatch = useDispatch();
  const { paymentPlans } = useSelector((store) => store.paymentService);
  const CUSTOMER_ID = "cus_ShCIuex4onhmI7";

  // ------------------ Set default to Local plan or most popular or 0 on first mount only -----------------//
  const [selectedPlanIdx, setSelectedPlanIdx] = useState(() => {
    const backendPlans =
      Array.isArray(paymentPlans) && paymentPlans.length > 0
        ? mapBackendPlans(paymentPlans)
        : null;
    const plansToShow = reorderPlansToPopularSecond(
      backendPlans && backendPlans.length > 0 ? backendPlans : plans
    );
    let initialIdx = plansToShow.findIndex((p) =>
      p.name.toLowerCase().includes("local")
    );
    if (initialIdx === -1) {
      initialIdx = plansToShow.findIndex((p) => p.popular);
    }
    return initialIdx !== -1 ? initialIdx : 0;
  });
  // Track which button is loading (by index)
  const [loadingButtonIdx, setLoadingButtonIdx] = useState(null);

  // ---------------------------API CALL-----------------------------------//

  async function createCheckout(plan) {
    const payload = {
      customer_id: CUSTOMER_ID,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      payment_method_types: ["card"],
      mode: "subscription",
      success_url: "https://influencer-frontend-nu.vercel.app/",
      cancel_url: null,
      items: [{ price: getPlanPriceId(plan), quantity: 1 }],
      metadata: {},
    };
    try {
      const response = await createCheckoutSession(payload);
      dispatch(setCheckoutResponse(response));
      if (response?.checkout_url) {
          window.location.href = response.checkout_url;
      }
      return response;
    } catch (error) {
      console.error("Checkout session error:", error);
    }finally{
      setLoadingButtonIdx(null);
    }
  }
  // ---------------------------END OF API CALL-----------------------------------//

  useEffect(() => {
    dispatch(fetchAllPaymentPlans());
  }, [dispatch]);

  // Helper function to get plan icon
  const getPlanIcon = (planName) => {
    const name = planName.toLowerCase();
    if (name.includes('free')) return <MegaphoneOutlined className="text-3xl text-blue-500" />;
    if (name.includes('local')) return <EnvironmentOutlined className="text-3xl text-blue-500" />;
    if (name.includes('nationwide')) return <GlobalOutlined className="text-3xl text-blue-500" />;
    if (name.includes('global')) return <GlobalOutlined className="text-3xl text-blue-500" />;
    return <GiftOutlined className="text-3xl text-blue-500" />;
  };

  // Helper function to get plan description
  const getPlanDescription = (planName) => {
    const name = planName.toLowerCase();
    if (name.includes('free')) return "Browse influencers for free.";
    if (name.includes('local')) return "Recommended for businesses serving local customers.";
    if (name.includes('nationwide')) return "Ideal for businesses that operate nationwide. Find influencers across the country.";
    if (name.includes('global')) return "Perfect for businesses with a worldwide reach. Find influencers all over the world.";
    return "Great plan for your business needs.";
  };

  // Helper function to get target audience
  const getTargetAudience = (planName) => {
    const name = planName.toLowerCase();
    if (name.includes('free')) return "Great for individuals and startups.";
    if (name.includes('local')) return "Perfect for local businesses.";
    if (name.includes('nationwide')) return "Ideal for national brands.";
    if (name.includes('global')) return "Best for international companies.";
    return "Suitable for all business types.";
  };

  // Helper function to get discount percentage
  const getDiscountPercentage = (planName) => {
    const name = planName.toLowerCase();
    if (name.includes('local')) return "75%";
    if (name.includes('nationwide')) return "77%";
    if (name.includes('global')) return "75%";
    return null;
  };

  // New: Map backend product/prices structure
  const subscriptionProduct = Array.isArray(paymentPlans)
    ? paymentPlans.find((p) => p.name === "Grace Belgravia Subscription")
    : null;
  const plansToShow = useMemo(() => {
    if (!subscriptionProduct || !Array.isArray(subscriptionProduct.prices)) return [];
    const mapped = subscriptionProduct.prices
      .filter((price) => price.recurring && price.recurring.interval === "month")
      .map((price, idx) => {
        // Convert metadata to features array
        const features = Object.entries(price.metadata || {}).map(
          ([key, value]) => `${key}: ${value}`
        );
        const nickname = (price.nickname || '').toLowerCase();
        const isLocal = nickname.includes('local');
        const isNationwide = nickname.includes('nationwide');
        const isGlobal = nickname.includes('global');
        const isFree = price.unit_amount === 0;
        return {
          id: price.id,
          name: price.nickname || `Plan ${idx + 1}`,
          price: price.unit_amount === 0 ? "Free" : `$${(price.unit_amount / 100).toLocaleString()}`,
          priceValue: price.unit_amount / 100,
          features,
          popular: isLocal, // Mark local plan as most popular
          values: features, // For comparison table
          raw: price,
          isFree,
          _sortOrder:
            price.unit_amount === 0 ? 0 :
            isLocal ? 1 :
            isNationwide ? 2 :
            isGlobal ? 3 : 4,
        };
      });
    // Sort by _sortOrder
    return mapped.sort((a, b) => a._sortOrder - b._sortOrder);
  }, [subscriptionProduct]);

  // Check if plans are still loading
  const isLoadingPlans = !subscriptionProduct || plansToShow.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-color mb-4 tracking-tight">
            Choose a plan that's right for you
          </h1>
          <p className="text-xl text-color max-w-3xl mx-auto leading-relaxed">
            We believe influencer marketing should be accessible to all
            companies, no matter the size of your startup.
          </p>
        </div>

        {/* Plan Cards */}
        <div className="mb-16">
          {isLoadingPlans ? (
            // Show skeleton loaders while plans are loading
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((index) => (
                <PlanCardSkeleton key={index} />
              ))}
            </div>
          ) : plansToShow.length === 0 ? (
            <Empty description="No subscription plans available." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plansToShow.map((plan, idx) => {
                const isSelected = idx === selectedPlanIdx;
                const discountPercentage = getDiscountPercentage(plan.name);
                const hasLimitedTimeOffer = !plan.isFree && discountPercentage;
                
                return (
                  <div
                    key={plan.id}
                    className={`relative bg-white rounded-2xl border transition-all duration-300 cursor-pointer hover:shadow-2xl ${
                      plan.isFree 
                        ? 'border-dashed border-primary' 
                        : 'border-input'
                    } ${
                      isSelected
                        ? " ring-primary shadow-2xl"
                        : "shadow-lg"
                    }`}
                    onClick={() => setSelectedPlanIdx(idx)}
                  >
                    {/* Limited Time Offer Banner */}
                    {hasLimitedTimeOffer && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                        <Tag color="blue" className="text-xs font-semibold px-3 py-1">
                          LIMITED TIME OFFER
                        </Tag>
                      </div>
                    )}

                    {/* Discount Badge */}
                    {discountPercentage && (
                      <div className="absolute -top-2 -right-2 z-10">
                        <Badge 
                          count={`SAVE ${discountPercentage}`} 
                          className="py-2"
                          style={{ 
                            backgroundColor: '#f59e0b',
                            color: 'white',
                            fontSize: '10px',
                            fontWeight: 'bold',
                            borderRadius: '12px'
                          }}
                        />
                      </div>
                    )}

                    <div className="p-6">
                      {/* Plan Icon */}
                      <div className="flex justify-center mb-4">
                        {getPlanIcon(plan.name)}
                      </div>

                      {/* Plan Name */}
                      <div className="text-center mb-4">
                        <h3 className="text-2xl font-bold text-color mb-2">
                          {plan.name}
                        </h3>
                        {plan.popular && (
                          <Tag color="blue" className="text-xs font-bold">
                            Most Popular
                          </Tag>
                        )}
                      </div>

                      {/* Price */}
                      <div className="text-center mb-4">
                        <div className="text-3xl font-bold text-color">
                          {plan.price}
                        </div>
                        {!plan.isFree && (
                          <div className="text-sm text-gray-500 font-medium">
                            /month
                          </div>
                        )}
                        {hasLimitedTimeOffer && (
                          <div className="text-xs text-gray-500 mt-1">
                            Billed yearly
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <div className="text-center mb-4">
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {getPlanDescription(plan.name)}
                        </p>
                      </div>

                      {/* Target Audience */}
                      <div className="text-center mb-6">
                        <p className="text-xs text-gray-500">
                          {getTargetAudience(plan.name)}
                        </p>
                      </div>

                      {/* CTA Button */}
                      <button
                        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 text-sm ${
                          plan.isFree
                            ? "bg-gradient-to-br from-primary to-secondary text-white"
                            : "bg-gradient-to-br from-primary to-secondary text-white"
                        } ${
                          isSelected ? "ring ring-primary" : ""
                        }`}
                        disabled={loadingButtonIdx === idx}
                        onClick={async (e) => {
                          e.stopPropagation();
                          if (typeof window !== "undefined") {
                            localStorage.setItem(
                              "selectedPlan",
                              JSON.stringify(plan)
                            );
                          }
                          setLoadingButtonIdx(idx);
                          await createCheckout(plan.raw);
                        }}
                      >
                        {loadingButtonIdx === idx ? (
                          <Spin indicator={<LoadingOutlined style={{ fontSize: 16, color: '#fff' }} spin />} />
                        ) : (
                          'Get started'
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Multi-Plan Comparison Table with Highlighted Column */}
        {!isLoadingPlans && plansToShow.length > 0 && (
          <div className="overflow-x-auto rounded-2xl border border-input bg-white/90 mb-16 shadow backdrop-blur-md max-w-6xl mx-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 via-blue-50 to-gray-50">
                  <th className="py-6 px-6 text-left font-bold text-gray-800 text-lg">
                    Feature
                  </th>
                  {plansToShow.map((plan, idx) => (
                    <th
                      key={plan.id}
                      className={`py-6 px-6 text-center font-bold text-lg text-gray-800 relative transition-all duration-200 ${
                        idx === selectedPlanIdx
                          ? "bg-blue-100 text-color  -primary"
                          : ""
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <span className="text-center font-bold">{plan.name}</span>
                        {plan.popular && (
                          <Tag color="blue" className="text-xs font-bold">
                            Most Popular
                          </Tag>
                        )}
                        <span className="text-2xl font-bold text-color">{plan.price}</span>
                        {!plan.isFree && (
                          <span className="text-sm text-gray-500 font-medium">/month</span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Collect all unique feature keys for rows */}
                {(() => {
                  // Get all unique feature keys from all plans
                  const allFeatureKeys = Array.from(new Set(
                    plansToShow.flatMap((plan) =>
                      (plan.features || []).map((f) => f.split(":")[0])
                    )
                  ));
                  return allFeatureKeys.map((feature, rowIdx) => (
                    <tr
                      key={feature}
                      className={rowIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="py-4 px-6 font-semibold text-gray-700 border-t border-input w-48">
                        {feature}
                      </td>
                      {plansToShow.map((plan, colIdx) => {
                        // Find the value for this feature in this plan
                        const value = (plan.features || [])
                          .find((f) => f.startsWith(feature + ":"));
                        const displayValue = value ? value.split(":").slice(1).join(":").trim() : "";
                        let cellContent;
                        if (displayValue.toLowerCase() === "true") {
                          cellContent = <CheckOutlined style={{ color: '#10b981', fontSize: 20 }} />;
                        } else if (displayValue.toLowerCase() === "false" || displayValue === "") {
                          cellContent = <CloseOutlined style={{ color: '#ef4444', fontSize: 20 }} />;
                        } else {
                          cellContent = <span className="text-sm font-medium">{displayValue}</span>;
                        }
                        return (
                          <td
                            key={plan.id + feature}
                            className={`py-4 px-6 text-center border-t border-input transition-all duration-200 ${
                              colIdx === selectedPlanIdx
                                ? "bg-blue-50 text-color font-semibold"
                                : ""
                            }`}
                          >
                            {cellContent}
                          </td>
                        );
                      })}
                    </tr>
                  ));
                })()}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pricing;
