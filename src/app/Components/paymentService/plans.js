export const plans = [
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


export const FEATURES = [
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
];


export const  mapBackendPlans = (paymentPlans) => {
  const filtered = paymentPlans.filter(
    (plan) => plan.active && plan.metadata && Object.keys(plan.metadata).length > 0
  );
  return filtered.map((plan) => {
    // Only consider prices with recurring interval 'month'
    let priceObj = Array.isArray(plan.prices)
      ? plan.prices.find(
          (p) =>
            p.recurring &&
            p.recurring.interval === "month" &&
            p.active
        )
      : null;
    // If no monthly price, skip this plan
    if (!priceObj) return null;
    let priceValue = priceObj ? (priceObj.unit_amount || 0) / 100 : 0;
    let price = priceValue === 0 ? "Free" : (priceObj?.currency === "gbp" ? `£${priceValue}` : `$${priceValue}`);
    let isPopular = /popular/i.test(plan.description || plan.name);
    let values = FEATURES.map((feature) => {
      let val = plan.metadata[feature] || plan.metadata[feature.replace(/ & /g, " and ")] || plan.metadata[feature.toLowerCase()] || plan.metadata[feature.replace(/\s/g, "_").toLowerCase()];
      if (val === undefined) return <span className="text-red">✗</span>;
      if (val === "true") return <span className="text-green">✓</span>;
      if (val === "false") return <span className="text-red">✗</span>;
      if (typeof val === "string" && /^up to/i.test(val)) return val;
      if (typeof val === "string" && /view profiles/i.test(val)) return <span className="text-link font-medium">{val}</span>;
      if (typeof val === "string" && /basic/i.test(val)) return <span className="text-yellow font-medium">{val}</span>;
      if (typeof val === "string" && /engagement|demographics|heatmaps|all uk|global/i.test(val)) return <span className="text-green">{val}</span>;
      return val;
    });
    return {
      name: plan.name.replace(/\s*\(.*?\)/, ""),
      price,
      priceValue,
      description: plan.description || "",
      cta: "Get started",
      features: FEATURES,
      values,
      popular: isPopular,
      icon: null,
      raw: plan,
    };
  }).filter(Boolean); // Remove nulls (plans without monthly price)
}


export const reorderPlansToPopularSecond = (plansArr) => {
  if (!Array.isArray(plansArr) || plansArr.length < 2) return plansArr;
  const popularIdx = plansArr.findIndex((p) => p.popular);
  if (popularIdx === -1 || popularIdx === 1) return plansArr;
  const reordered = [...plansArr];
  const [popularPlan] = reordered.splice(popularIdx, 1);
  reordered.splice(1, 0, popularPlan);
  return reordered;
}

export const getSerializablePlan = (plan) => {
  // Remove React elements and any non-serializable fields
  const { values, icon, raw, ...rest } = plan;
  // Only keep primitive values in 'values' (convert React elements to null or string)
  const serializableValues = Array.isArray(values)
    ? values.map((v) => (typeof v === 'string' || typeof v === 'number' ? v : null))
    : [];
  return { ...rest, values: serializableValues };
};

// Helper to get the price id from the plan (assume plan.raw.prices[0].id or similar)
export const getPlanPriceId = (plan) => {
  // In the new structure, plan is a price object or a mapped plan with .id
  return plan && plan.id ? plan.id : undefined;
};