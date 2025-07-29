import {
  CheckCircleOutlined,
  CrownOutlined,
  StarOutlined,
} from "@ant-design/icons";

// Utility functions for settings components

export const formatPrice = (amount, currency) => {
  // Handle undefined or null currency
  const safeCurrency = currency || 'USD';
  
  // Handle undefined or null amount
  if (amount === undefined || amount === null) {
    return '$0.00';
  }
  
  return `${(amount / 100).toLocaleString(undefined, {
    style: "currency",
    currency: safeCurrency.toUpperCase(),
  })}`;
};

export const formatDate = (timestamp) => {
  if (!timestamp) return "-";
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString();
};

export const getTierColor = (plan) => {
  if (plan.unit_amount >= 14900) return "purple"; // Global
  if (plan.unit_amount >= 8900) return "blue"; // Nationwide
  if (plan.unit_amount >= 4900) return "green"; // Local
  return "default";
};

export const getTierIcon = (plan) => {
  if (plan.unit_amount >= 14900) return <CrownOutlined />;
  if (plan.unit_amount >= 8900) return <StarOutlined />;
  return <CheckCircleOutlined />;
};

export const getTierName = (plan) => {
  if (plan.unit_amount >= 14900) return "Premium";
  if (plan.unit_amount >= 8900) return "Pro";
  if (plan.unit_amount >= 4900) return "Basic";
  return "Free";
};

export const getPlanMetadata = (plan) => {
  return plan?.plan_metadata || plan?.metadata || {};
};

export const getPlanFeaturesCount = (plan) => {
  const metadata = getPlanMetadata(plan);
  return Object.keys(metadata).length;
}; 