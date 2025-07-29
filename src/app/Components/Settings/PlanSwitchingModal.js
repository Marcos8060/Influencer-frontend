import React from "react";
import {
  Modal,
  Row,
  Col,
  Card,
  Tag,
  Button,
  Badge,
  Spin,
} from "antd";
import {
  CheckCircleOutlined,
  CrownOutlined,
  StarOutlined,
  InfoCircleOutlined,
  MegaphoneOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  GiftOutlined,
} from "@ant-design/icons";

const PlanSwitchingModal = ({
  visible,
  onCancel,
  hasNoPlan,
  currentPlan,
  loadingPlans,
  availablePlans,
  selectedPlan,
  onPlanSelect,
  onPlanSwitch,
  switchingPlan,
  getTierColor,
  getTierIcon,
  getTierName,
  getPlanMetadata,
  getPlanFeaturesCount,
  formatPrice,
  isUpgrade,
  getPriceDifference,
}) => {
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

  return (
    <Modal
      title={hasNoPlan ? "Choose Your Plan" : "Switch Your Plan"}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={1000}
      className="plan-switching-modal"
    >
      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          {hasNoPlan
            ? "Choose a plan that best fits your needs. Start with our free Discovery plan or unlock premium features with our paid plans."
            : "Choose a plan that best fits your needs. You can upgrade or downgrade at any time."}
        </p>

        {/* No Plan Badge */}
        {hasNoPlan && (
          <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center gap-2">
              <InfoCircleOutlined className="text-orange-600" />
              <span className="font-medium text-orange-800">
                No active subscription - Choose a plan to get started!
              </span>
            </div>
          </div>
        )}
      </div>

      {loadingPlans ? (
        <div className="text-center py-8">
          <Spin size="large" />
          <p className="mt-4 text-gray-600">Loading available plans...</p>
        </div>
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {availablePlans.map((plan) => {
              const isCurrentPlan = plan.id === currentPlan?.plan_id;
              const isSelected = selectedPlan?.id === plan.id;
              const isFree = plan.unit_amount === 0;
              const discountPercentage = getDiscountPercentage(plan.nickname);
              const hasLimitedTimeOffer = !isFree && discountPercentage;

              return (
                <Col xs={24} sm={12} lg={6} key={plan.id}>
                  <div
                    className={`relative bg-white rounded-2xl border transition-all duration-300 cursor-pointer h-full flex flex-col ${
                      isFree 
                        ? 'border-dashed border-primary' 
                        : 'border-input'
                    } ${
                      isSelected
                        ? "ring ring-input shadow-2xl"
                        : "shadow-lg"
                    } ${
                      isCurrentPlan ? "border-2 border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100 shadow-xl" : ""
                    }`}
                    onClick={() => !isCurrentPlan && onPlanSelect(plan)}
                  >
                    {/* Current Plan Indicator */}
                    {isCurrentPlan && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                        <Tag color="blue" className="text-xs font-bold px-3 py-1 bg-blue-500 text-white border-0">
                          CURRENT PLAN
                        </Tag>
                      </div>
                    )}

                    {/* Limited Time Offer Banner */}
                    {hasLimitedTimeOffer && !isCurrentPlan && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                        <Tag color="blue" className="text-xs font-semibold px-3 py-1">
                          LIMITED TIME OFFER
                        </Tag>
                      </div>
                    )}

                    {/* Discount Badge */}
                    {discountPercentage && !isCurrentPlan && (
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

                    <div className="p-6 flex flex-col h-full">
                      {/* Plan Icon */}
                      <div className="flex justify-center mb-4">
                        {getPlanIcon(plan.nickname)}
                      </div>

                      {/* Plan Name */}
                      <div className="text-center mb-4">
                        <h3 className="text-2xl font-bold text-color mb-2">
                          {plan.nickname}
                        </h3>
                        {plan.unit_amount > 0 && plan.unit_amount <= 4900 && (
                          <Tag color="blue" className="text-xs font-bold">
                            Most Popular
                          </Tag>
                        )}
                      </div>

                      {/* Price */}
                      <div className="text-center mb-4">
                        <div className="text-3xl font-bold text-color">
                          {formatPrice(plan.unit_amount, plan.currency)}
                        </div>
                        {!isFree && (
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

                      {/* Current Plan Badge */}
                      {isCurrentPlan && (
                        <div className="text-center mb-4">
                          <Badge
                            status="processing"
                            text="Your Current Plan"
                            className="mb-3 text-blue-600 font-semibold"
                          />
                        </div>
                      )}

                      {/* Recommended Badge */}
                      {hasNoPlan && isFree && (
                        <div className="text-center mb-4">
                          <Badge
                            status="success"
                            text="Recommended to Start"
                            className="mb-3"
                          />
                        </div>
                      )}

                      {/* Description */}
                      <div className="text-center mb-4 flex-grow">
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {getPlanDescription(plan.nickname)}
                        </p>
                      </div>

                      {/* Target Audience */}
                      <div className="text-center mb-6">
                        <p className="text-xs text-gray-500">
                          {getTargetAudience(plan.nickname)}
                        </p>
                      </div>

                      {/* CTA Button */}
                      {!isCurrentPlan && (
                        <button
                          className={`bg-gradient-to-br from-primary to-secondary text-white text-sm w-full py-2 px-2 rounded-md transition-all duration-200 ${
                            isSelected ? "ring ring-primary" : ""
                          }`}
                          disabled={!isSelected || switchingPlan}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isSelected) {
                              onPlanSwitch();
                            }
                          }}
                        >
                          {switchingPlan && isSelected ? (
                            <Spin size="small" />
                          ) : (
                            isSelected
                              ? hasNoPlan
                                ? "Subscribe"
                                : isUpgrade(plan)
                                ? "Upgrade"
                                : "Downgrade"
                              : "Select Plan"
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>

          {selectedPlan && !currentPlan && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Plan Summary
                  </h4>
                  <p className="text-sm text-gray-600">
                    {selectedPlan.nickname} - {formatPrice(selectedPlan.unit_amount, selectedPlan.currency)}/month
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-800">
                    {formatPrice(selectedPlan.unit_amount, selectedPlan.currency)}
                  </div>
                  <div className="text-sm text-gray-500">per month</div>
                </div>
              </div>
            </div>
          )}

          {selectedPlan && currentPlan && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-blue-800">
                    Plan Change Summary
                  </h4>
                  <p className="text-sm text-blue-600">
                    {currentPlan.plan_nickname} → {selectedPlan.nickname}
                  </p>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${isUpgrade(selectedPlan) ? 'text-green-600' : 'text-red-600'}`}>
                    {isUpgrade(selectedPlan) ? '+' : ''}{formatPrice(getPriceDifference(selectedPlan), selectedPlan.currency)}
                  </div>
                  <div className="text-sm text-blue-600">
                    {isUpgrade(selectedPlan) ? 'additional' : 'savings'} per month
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </Modal>
  );
};

export default PlanSwitchingModal; 