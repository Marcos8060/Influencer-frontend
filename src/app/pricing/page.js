"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  fetchAllPaymentPlans,
  setCheckoutResponse,
} from "@/redux/features/payment-service";
import { Skeleton } from "antd";
import "antd/dist/reset.css";
import axios from "axios";
import { LoadingOutlined } from '@ant-design/icons';
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

  const backendPlans =
    Array.isArray(paymentPlans) && paymentPlans.length > 0
      ? mapBackendPlans(paymentPlans)
      : null;
  const plansToShow = reorderPlansToPopularSecond(
    backendPlans && backendPlans.length > 0 ? backendPlans : plans
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-white to-secondary/20 py-12 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Plan Cards */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-gray mb-2 tracking-tight drop-shadow-sm">
            Choose a plan that's right for you
          </h2>
          <p className="text-lg text-color mb-10">
            We believe influencer marketing should be accessible to all
            companies, no matter the size of your startup.
          </p>
        </div>
        <Skeleton
          loading={!backendPlans}
          active
          paragraph={{ rows: 2 }}
          round
        >
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12 w-full px-2 md:px-0">
            {plansToShow.map((plan, idx) => (
              <div
                key={plan.name}
                className={`flex flex-col items-center bg-white/90 rounded-2xl border-2 p-6 sm:p-8 w-full max-w-xs shadow-lg transition-all duration-300 cursor-pointer hover:shadow-2xl hover:scale-105 mx-auto ${
                  idx === selectedPlanIdx
                    ? "border-primary scale-105 shadow-2xl ring-2 ring-primary/20"
                    : "border-input"
                }`}
                style={{ minWidth: 0 }}
                onClick={() => setSelectedPlanIdx(idx)}
              >
                <div style={{ width: "100%" }}>
                  <div className="flex items-center gap-2 mb-2 text-base sm:text-2xl">
                    <span className="font-bold text-gray-800">{plan.name}</span>
                    {plan.popular && (
                      <span className="px-2 py-0.5 text-xs font-bold uppercase bg-yellow text-white rounded-full">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-primary mb-1">
                    {plan.price}
                  </div>
                  {plan.priceValue !== 0 && (
                    <div className="text-xs text-gray font-medium mb-2">
                      /month
                    </div>
                  )}
                  <ul className="text-xs sm:text-sm text-gray-700 mb-4 w-full list-disc list-inside">
                    {plan.features.slice(0, 3).map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                    {plan.features.length > 3 && (
                      <li
                        className="text-link cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPlanIdx(idx);
                        }}
                      >
                        +{plan.features.length - 3} more
                      </li>
                    )}
                  </ul>
                </div>
                <button
                  className={`mt-auto w-full px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow text-sm sm:text-base ${
                    idx === selectedPlanIdx
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "bg-secondary text-white hover:bg-secondary/90"
                  }`}
                  disabled={loadingButtonIdx === idx}
                  onClick={async (e) => {
                    e.stopPropagation();
                    if (typeof window !== "undefined") {
                      localStorage.setItem(
                        "selectedPlan",
                        JSON.stringify(getSerializablePlan(plan))
                      );
                    }
                    setLoadingButtonIdx(idx);
                    await createCheckout(plan);
                  }}
                >
                  {loadingButtonIdx === idx ? <Spin indicator={<LoadingOutlined style={{ fontSize: 20, color: '#fff' }} spin />} /> : 'Get started'}
                </button>
              </div>
            ))}
          </div>
        </Skeleton>
        {/* Multi-Plan Comparison Table with Highlighted Column */}
        <Skeleton
          loading={!backendPlans}
          active
          paragraph={{ rows: 8 }}
          round
        >
          <div className="overflow-x-auto rounded-2xl border border-input bg-white/80 mb-16 shadow-2xl backdrop-blur-md max-w-5xl mx-auto animate-fade-in text-xs sm:text-base">
            <table className="min-w-full text-xs sm:text-base">
              <thead>
                <tr className="bg-gradient-to-r from-white/90 via-secondary/10 to-white/80">
                  <th className="py-5 px-4 text-left font-bold text-gray text-base sm:text-lg tracking-wide">
                    Feature
                  </th>
                  {plansToShow.map((plan, idx) => (
                    <th
                      key={plan.name}
                      className={`py-5 px-4 text-center font-bold text-base sm:text-lg text-gray relative drop-shadow-sm transition-all duration-200 ${
                        idx === selectedPlanIdx
                          ? "bg-primary/10 text-primary ring-2 ring-primary/30"
                          : ""
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <span>{plan.name}</span>
                        <span className="text-lg font-extrabold">
                          {plan.price}
                        </span>
                        {plan.priceValue !== 0 && (
                          <span className="text-xs text-gray font-medium">
                            /month
                          </span>
                        )}
                        {plan.popular && (
                          <span className="mt-2 px-2 py-0.5 text-xs font-bold uppercase bg-yellow text-white rounded-full">
                            Most Popular
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FEATURES.map((feature, rowIdx) => (
                  <tr
                    key={feature}
                    className={rowIdx % 2 === 0 ? "bg-white/70" : "bg-white/40"}
                  >
                    <td className="py-4 px-4 font-medium text-gray-700 border-t border-input w-40 sm:w-56">
                      {feature}
                    </td>
                    {plansToShow.map((plan, colIdx) => (
                      <td
                        key={plan.name + feature}
                        className={`py-4 px-4 text-center border-t border-input transition-all duration-200 ${
                          colIdx === selectedPlanIdx
                            ? "bg-primary/10 text-primary font-bold ring-2 ring-primary/30"
                            : ""
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
        </Skeleton>
      </div>
    </div>
  );
};

export default Pricing;
