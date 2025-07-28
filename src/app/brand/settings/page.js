"use client";
import React, { useState, useEffect } from "react";
import { Form, message } from "antd";
import AuthGuard from "@/assets/hooks/authGuard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCustomerSubscriptions, fetchAllPaymentPlans } from "@/redux/features/payment-service";
import toast from "react-hot-toast";
import {
  SubscriptionCard,
  NoPlanFallback,
  SubscriptionHistory,
  PasswordChangeForm,
  PlanSwitchingModal,
  SubscriptionSkeleton,
  PasswordFormSkeleton,
  formatPrice,
  formatDate,
  getTierColor,
  getTierIcon,
  getTierName,
  getPlanMetadata,
  getPlanFeaturesCount,
} from "@/app/Components/Settings";

const SettingsPage = () => {
  const userEmail = "user@email.com";
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [planModalVisible, setPlanModalVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [switchingPlan, setSwitchingPlan] = useState(false);
  const [availablePlans, setAvailablePlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [loadingSubscriptions, setLoadingSubscriptions] = useState(true);
  
  const { customerSubscriptions: subscriptionsResponse } = useSelector(
    (store) => store.paymentService
  );
  
  // Extract subscriptions from the nested response structure
  const customerSubscriptions = subscriptionsResponse?.subscriptions || [];
  const dispatch = useDispatch();

  // Get current plan - first subscription is the active one
  const getCurrentPlan = () => {
    try {
      if (
        !customerSubscriptions ||
        !Array.isArray(customerSubscriptions) ||
        loadingSubscriptions
      )
        return null;

      // First subscription is the active one
      const firstSubscription = customerSubscriptions[0];

      if (!firstSubscription || firstSubscription.canceled_at) return null;

      return firstSubscription?.items?.[0] || null;
    } catch (error) {
      console.error("Error getting current plan:", error);
      return null;
    }
  };

  const currentPlan = getCurrentPlan();
  const currentPlanId = currentPlan?.plan_id || null;

  // Calculate hasNoPlan synchronously to match currentPlan logic
  const hasActiveSubscription =
    !loadingSubscriptions &&
    customerSubscriptions &&
    Array.isArray(customerSubscriptions) &&
    customerSubscriptions.length > 0 &&
    !customerSubscriptions[0]?.canceled_at;
  const hasNoPlan = !hasActiveSubscription;

  const fetchSubs = async () => {
    setLoadingSubscriptions(true);
    try {
      await dispatch(fetchAllCustomerSubscriptions("cus_ShCIuex4onhmI7"));
    } catch (err) {
      toast.error("Error fetching customer subscriptions");
    } finally {
      setLoadingSubscriptions(false);
    }
  };

  // Fetch available plans from backend
  const fetchAvailablePlans = async () => {
    setLoadingPlans(true);
    try {
      const response = await dispatch(fetchAllPaymentPlans());
      const data = response;

      // Extract prices from the first product (assuming single product)
      const plans = data[0]?.prices || [];
      setAvailablePlans(plans);
    } catch (error) {
      console.error("Error fetching plans:", error);
      message.error("Failed to load available plans");
    } finally {
      setLoadingPlans(false);
    }
  };

  useEffect(() => {
    fetchAvailablePlans();
    fetchSubs();
  }, []);

  // Reset loading state when subscriptions are loaded
  useEffect(() => {
    if (subscriptionsResponse && !loadingSubscriptions) {
      // Data has been loaded, loading state is already managed by fetchSubs
    }
  }, [subscriptionsResponse, loadingSubscriptions]);

  const handlePasswordChange = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("Passwords do not match");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("Password changed successfully");
      form.resetFields(["newPassword", "confirmPassword"]);
    }, 1200);
  };

  const handlePlanSwitch = async () => {
    if (!selectedPlan) return;

    setSwitchingPlan(true);
    try {

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const action = hasNoPlan ? "subscribed to" : "switched to";
      message.success(`Successfully ${action} ${selectedPlan.nickname}`);
      setPlanModalVisible(false);
      setSelectedPlan(null);

    } catch (error) {
      console.error("Error switching plan:", error);
      message.error("Failed to switch plan. Please try again.");
    } finally {
      setSwitchingPlan(false);
    }
  };

  const isUpgrade = (selectedPlan) => {
    if (!selectedPlan) return false;
    if (!currentPlan) return selectedPlan.unit_amount > 0; // Any paid plan is an upgrade from no plan
    return selectedPlan.unit_amount > currentPlan.plan_amount;
  };

  const getPriceDifference = (selectedPlan) => {
    if (!selectedPlan) return 0;
    if (!currentPlan) return selectedPlan.unit_amount; // Full price for new subscription
    return selectedPlan.unit_amount - currentPlan.plan_amount;
  };

  const handleChoosePlan = () => {
    setPlanModalVisible(true);
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleModalCancel = () => {
    setPlanModalVisible(false);
    setSelectedPlan(null);
  };

  return (
    <AuthGuard>
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6">
          Account Settings
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Subscriptions */}
          <div>
            <h2 className="text-lg sm:text-xl font-medium mb-4">
              Your Subscriptions
            </h2>

            {loadingSubscriptions ? (
              <SubscriptionSkeleton />
            ) : hasNoPlan ? (
              <NoPlanFallback onChoosePlan={handleChoosePlan} />
            ) : (
              // Show only the first (active) subscription
              (() => {
                const activeSubscription = customerSubscriptions[0];
                const plan = activeSubscription?.items?.[0];

                if (!activeSubscription || !plan) return null;

                return (
                  <SubscriptionCard
                    subscription={activeSubscription}
                    plan={plan}
                    onSwitchPlan={handleChoosePlan}
                    getPlanMetadata={getPlanMetadata}
                    getPlanFeaturesCount={getPlanFeaturesCount}
                    formatPrice={formatPrice}
                    formatDate={formatDate}
                  />
                );
              })()
            )}
          </div>

          {/* Right Column - Change Password */}
          <div>
            <h2 className="text-lg sm:text-xl font-medium mb-4">
              Change Password
            </h2>
            {loadingSubscriptions ? (
              <PasswordFormSkeleton />
            ) : (
              <PasswordChangeForm
                form={form}
                userEmail={userEmail}
                loading={loading}
                onPasswordChange={handlePasswordChange}
              />
            )}
          </div>
        </div>

        {/* Subscription History Section */}
        <SubscriptionHistory
          customerSubscriptions={customerSubscriptions}
          loadingSubscriptions={loadingSubscriptions}
          getPlanMetadata={getPlanMetadata}
          getPlanFeaturesCount={getPlanFeaturesCount}
          formatPrice={formatPrice}
          formatDate={formatDate}
        />

        {/* Plan Switching Modal */}
        <PlanSwitchingModal
          visible={planModalVisible}
          onCancel={handleModalCancel}
          hasNoPlan={hasNoPlan}
          currentPlan={currentPlan}
          loadingPlans={loadingPlans}
          availablePlans={availablePlans}
          selectedPlan={selectedPlan}
          onPlanSelect={handlePlanSelect}
          onPlanSwitch={handlePlanSwitch}
          switchingPlan={switchingPlan}
          getTierColor={getTierColor}
          getTierIcon={getTierIcon}
          getTierName={getTierName}
          getPlanMetadata={getPlanMetadata}
          getPlanFeaturesCount={getPlanFeaturesCount}
          formatPrice={formatPrice}
          isUpgrade={isUpgrade}
          getPriceDifference={getPriceDifference}
        />
      </div>
    </AuthGuard>
  );
};

export default SettingsPage;
