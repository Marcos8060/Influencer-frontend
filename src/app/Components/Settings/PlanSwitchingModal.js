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
  return (
    <Modal
      title={hasNoPlan ? "Choose Your Plan" : "Switch Your Plan"}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={900}
      className="plan-switching-modal"
    >
      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          {hasNoPlan
            ? "Choose a plan that best fits your needs. Start with our free Discovery plan or unlock premium features with our paid plans."
            : "Choose a plan that best fits your needs. You can upgrade or downgrade at any time."}
        </p>

        {/* Current Plan Badge */}
        {!hasNoPlan && currentPlan && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircleOutlined className="text-blue-600" />
              <span className="font-medium text-blue-800">
                Current Plan: {currentPlan.plan_nickname}
              </span>
            </div>
          </div>
        )}

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

              return (
                <Col xs={24} sm={12} lg={6} key={plan.id}>
                  <Card
                    className={`h-full cursor-pointer transition-all ${
                      isSelected
                        ? "ring-2 ring-blue-500 shadow-lg"
                        : "hover:shadow-md"
                    } ${
                      isCurrentPlan ? "border-blue-300 bg-blue-50" : ""
                    } ${
                      hasNoPlan && plan.unit_amount === 0
                        ? "border-green-300 bg-green-50"
                        : ""
                    }`}
                    onClick={() => !isCurrentPlan && onPlanSelect(plan)}
                  >
                    <div className="text-center">
                      <div className="mb-3">
                        <Tag
                          color={getTierColor(plan)}
                          icon={getTierIcon(plan)}
                          className="text-sm font-medium"
                        >
                          {plan.nickname}
                        </Tag>
                        <div className="mt-1">
                          <Tag color="default" className="text-xs">
                            {getTierName(plan)}
                          </Tag>
                        </div>
                      </div>

                      <div className="mb-3">
                        <span className="text-2xl font-bold">
                          {formatPrice(plan.unit_amount, plan.currency)}
                        </span>
                        <span className="text-gray-500">/month</span>
                      </div>

                      {isCurrentPlan && (
                        <Badge
                          status="processing"
                          text="Current Plan"
                          className="mb-3"
                        />
                      )}

                      {hasNoPlan && plan.unit_amount === 0 && (
                        <Badge
                          status="success"
                          text="Recommended to Start"
                          className="mb-3"
                        />
                      )}

                      <div className="text-left">
                        <h4 className="font-medium text-gray-800 mb-2">
                          Key Features:
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {(() => {
                            const metadata = getPlanMetadata(plan);
                            const features = Object.entries(metadata).slice(
                              0,
                              4
                            );
                            return features.map(([key, value]) => (
                              <li
                                key={key}
                                className="flex items-start gap-2"
                              >
                                <CheckCircleOutlined className="text-green-500 text-xs mt-0.5 flex-shrink-0" />
                                <span className="text-xs">
                                  {key}: {value}
                                </span>
                              </li>
                            ));
                          })()}
                          {getPlanFeaturesCount(plan) > 4 && (
                            <li className="text-xs text-blue-600">
                              +{getPlanFeaturesCount(plan) - 4} more
                              features
                            </li>
                          )}
                        </ul>
                      </div>

                      {!isCurrentPlan && (
                        <Button
                          type={isSelected ? "primary" : "default"}
                          className="w-full mt-4"
                          disabled={!isSelected}
                        >
                          {isSelected
                            ? hasNoPlan
                              ? "Subscribe"
                              : isUpgrade(plan)
                              ? "Upgrade"
                              : "Downgrade"
                            : "Select Plan"}
                        </Button>
                      )}
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>

          {selectedPlan && !currentPlan && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">
                    {hasNoPlan
                      ? `Subscribe to ${selectedPlan.nickname}`
                      : `Switch to ${selectedPlan.nickname}`}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {hasNoPlan
                      ? `You'll be charged ${formatPrice(
                          getPriceDifference(selectedPlan),
                          selectedPlan.currency
                        )} monthly`
                      : isUpgrade(selectedPlan)
                      ? `You'll be charged ${formatPrice(
                          getPriceDifference(selectedPlan),
                          selectedPlan.currency
                        )} immediately`
                      : "Changes will take effect at your next billing cycle"}
                  </p>
                </div>
                <Button
                  type="primary"
                  loading={switchingPlan}
                  onClick={onPlanSwitch}
                  className="ml-4"
                >
                  {hasNoPlan
                    ? "Subscribe Now"
                    : isUpgrade(selectedPlan)
                    ? "Upgrade Now"
                    : "Downgrade"}
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </Modal>
  );
};

export default PlanSwitchingModal; 