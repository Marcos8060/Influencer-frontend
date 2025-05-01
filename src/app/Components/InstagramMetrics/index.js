import React, { useState, useEffect } from "react";
import {
  Card,
  Form,
  Select,
  DatePicker,
  Button,
  Space,
  Divider,
  Row,
  Col,
  Alert,
  Typography,
  Table,
  Tag,
  Progress,
  Empty,
  Spin,
} from "antd";
import {
  FilterOutlined,
  LineChartOutlined,
  BarChartOutlined,
  PieChartOutlined,
  GlobalOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getInstagramMetricsLifetime } from "@/redux/features/socials";
import { useAuth } from "@/assets/hooks/use-auth";
import toast from "react-hot-toast";
import moment from "moment";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Title, Text } = Typography;

// Styled components
const FilterCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 24px;

  .ant-card-head {
    border-bottom: none;
    padding: 20px 24px 0;
  }

  .ant-card-body {
    padding: 16px 24px 24px;
  }
`;

const FilterForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 16px;
  }

  .ant-select-selector,
  .ant-picker {
    border-radius: 8px;
    height: 40px;
  }
`;

const ActionButton = styled(Button)`
  height: 40px;
  border-radius: 8px;
  font-weight: 500;
`;

const MetricsDisplayCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 24px;

  .ant-card-head {
    border-bottom: none;
    padding: 16px 24px 0;
  }

  .ant-card-body {
    padding: 16px 24px;
  }
`;

const StatCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  text-align: center;

  .ant-card-body {
    padding: 16px;
  }
`;

const InstagramMetricsDashboard = ({ discoveryProfile }) => {
  // State for the filter form
  const [form] = Form.useForm();
  const [selectedMetric, setSelectedMetric] = useState(null);
  const { instagramMetricsLifetime } = useSelector((store) => store.socials);

  // State for the results
  //   const [metricsData, setMetricsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState(null);

  const dispatch = useDispatch();
  const auth = useAuth();

  const metricOptions = [
    { value: "profile_views", label: "Profile Views" },
    { value: "total_interactions", label: "Total Interactions" },
    { value: "follower_demographics", label: "Follower Demographics" },
    {
      value: "reached_audience_demographics",
      label: "Reached Audience Demographics",
    },
    {
      value: "engaged_audience_demographics",
      label: "Engaged Audience Demographics",
    },
  ];

  const breakdownOptions = [
    { value: "age", label: "Age" },
    { value: "city", label: "City" },
    { value: "country", label: "Country" },
    { value: "gender", label: "Gender" },
  ];

  // Determine which fields to show based on selected metric
  useEffect(() => {
    if (!selectedMetric) return;

    // Reset fields when metric changes
    form.setFieldsValue({
      breakdown: undefined,
      dateRange: undefined,
    });

    // Show breakdown only for specific metrics
    if (selectedMetric === "follower_demographics") {
      form.setFields([
        {
          name: "breakdown",
          errors: [],
        },
      ]);
    }
  }, [selectedMetric, form]);

  const shouldShowBreakdown = () => {
    return (
      selectedMetric === "follower_demographics" ||
      selectedMetric === "engaged_audience_demographics"
    );
  };

  const shouldRequireBreakdown = () => {
    return selectedMetric === "follower_demographics";
  };

  const shouldShowDateRange = () => {
    return selectedMetric !== null;
  };

  const shouldRequireDateRange = () => {
    return selectedMetric === "profile_views";
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    setFormValues(values);
    try {
      const { dateRange, breakdown, ...restValues } = values;

      const payload = {
        ...restValues,
        user_id: discoveryProfile?.userId,
      };

      // Handle date range
      if (dateRange) {
        payload.start_date = dateRange[0].format("YYYY-MM-DD");
        if (dateRange[1]) {
          payload.end_date = dateRange[1].format("YYYY-MM-DD");
        }
      }

      // Only include breakdown if it's allowed for this metric
      if (shouldShowBreakdown() && breakdown) {
        payload.breakdown = breakdown;
      }

      const response = await dispatch(
        getInstagramMetricsLifetime(auth, payload)
      );
      console.log("RESPONSE ", response);
      if (response.statusCode === 10) {
        toast.error("The Influencer has less than 100 engaged audience");
      }
      //   setMetricsData(response.payload);
    } catch (error) {
      toast.error(error.response?.data?.errorMessage?.[0] || "Filter failed");
    } finally {
      setLoading(false);
    }
  };

  const renderTotalValue = () => {
    if (
      instagramMetricsLifetime?.totalValue !== null &&
      instagramMetricsLifetime?.totalValue !== undefined
    ) {
      return (
        <StatCard>
          <Title level={4} style={{ marginBottom: 8 }}>
            Total {formValues?.metric?.replace(/_/g, " ")}
          </Title>
          <Title level={2} style={{ margin: 0 }}>
            {instagramMetricsLifetime.totalValue.toLocaleString()}
          </Title>
        </StatCard>
      );
    }
    return null;
  };

  const renderBreakdownTable = () => {
    if (
      !instagramMetricsLifetime?.breakdownValues ||
      instagramMetricsLifetime.breakdownValues.length === 0
    )
      return null;

    const columns = [
      {
        title:
          formValues?.breakdown === "country"
            ? "Country"
            : formValues?.breakdown === "city"
            ? "City"
            : formValues?.breakdown,
        dataIndex: "breakdownKey",
        key: "breakdownKey",
        render: (value) => (
          <Space>
            {formValues?.breakdown === "country" && (
              <span
                className={`fi fi-${value.toLowerCase()}`}
                style={{ marginRight: 8 }}
              ></span>
            )}
            {formValues?.breakdown === "gender" && <UserOutlined />}
            {value}
          </Space>
        ),
      },
      {
        title: "Count",
        dataIndex: "breakdownValue",
        key: "breakdownValue",
        render: (value) => value.toLocaleString(),
        sorter: (a, b) => a.breakdownValue - b.breakdownValue,
      },
      {
        title: "Percentage",
        key: "percentage",
        render: (_, record) => {
          const total = instagramMetricsLifetime.breakdownValues.reduce(
            (sum, item) => sum + item.breakdownValue,
            0
          );
          const percent = (record.breakdownValue / total) * 100;
          return (
            <Progress
              percent={Math.round(percent * 10) / 10}
              size="small"
              strokeColor="#1890ff"
              format={(percent) => `${percent}%`}
            />
          );
        },
      },
    ];

    return (
      <MetricsDisplayCard
        title={
          <Space>
            {formValues?.breakdown === "country" ? (
              <GlobalOutlined />
            ) : (
              <UserOutlined />
            )}
            <Text strong>Breakdown by {formValues?.breakdown}</Text>
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={instagramMetricsLifetime.breakdownValues}
          rowKey="breakdownKey"
          pagination={{ pageSize: 10 }}
          size="middle"
        />
      </MetricsDisplayCard>
    );
  };

  const renderCharts = () => {
    if (
      !instagramMetricsLifetime?.breakdownValues ||
      instagramMetricsLifetime.breakdownValues.length === 0
    )
      return null;

    const sortedData = [...instagramMetricsLifetime.breakdownValues]
      .sort((a, b) => b.breakdownValue - a.breakdownValue)
      .slice(0, 10);

    const chartData = {
      labels: sortedData.map((item) => item.breakdownKey),
      datasets: [
        {
          label: `Count by ${formValues?.breakdown}`,
          data: sortedData.map((item) => item.breakdownValue),
          backgroundColor: [
            "#1890ff",
            "#13c2c2",
            "#52c41a",
            "#faad14",
            "#f5222d",
            "#722ed1",
            "#eb2f96",
            "#fa8c16",
            "#a0d911",
            "#2f54eb",
          ],
          borderWidth: 1,
        },
      ],
    };

    return (
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col xs={24} style={{ padding: 0 }}>
          <MetricsDisplayCard
            title={
              <Space>
                <BarChartOutlined />
                <Text strong>Top {formValues?.breakdown}s</Text>
              </Space>
            }
            style={{ width: "100%" }}
          >
            <div style={{ width: "100%", height: "400px" }}>
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false, // This allows the chart to fill its container
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      callbacks: {
                        label: (context) => {
                          const total =
                            instagramMetricsLifetime.breakdownValues.reduce(
                              (sum, item) => sum + item.breakdownValue,
                              0
                            );
                          return `${context.parsed.y.toLocaleString()} (${Math.round(
                            (context.parsed.y / total) * 100
                          )}%)`;
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          </MetricsDisplayCard>
        </Col>
        <Col xs={24}>
          <MetricsDisplayCard
            title={
              <Space>
                <PieChartOutlined />
                <Text strong>Distribution</Text>
              </Space>
            }
          >
            <div
              style={{
                width: "100%",
                height: "500px", // Adjust this value to control the size
                margin: "0 auto",
                maxWidth: "500px", // Optional: prevents it from getting too wide
              }}
            >
              <Pie
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false, // Important for size control
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: (context) => {
                          return `${
                            context.label
                          }: ${context.parsed.toLocaleString()} (${
                            context.formattedValue
                          }%)`;
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          </MetricsDisplayCard>
        </Col>
      </Row>
    );
  };

  const renderDateInfo = () => {
    if (
      !instagramMetricsLifetime?.start_date &&
      !instagramMetricsLifetime?.end_date
    )
      return null;

    return (
      <div style={{ marginBottom: 16 }}>
        <Space>
          <CalendarOutlined />
          <Text type="secondary">
            {instagramMetricsLifetime.start_date &&
              `From ${instagramMetricsLifetime.start_date}`}
            {instagramMetricsLifetime.end_date &&
              ` to ${instagramMetricsLifetime.end_date}`}
          </Text>
        </Space>
      </div>
    );
  };

  const renderResults = () => {
    if (loading) {
      return (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <Spin size="large" />
          <Text style={{ display: "block", marginTop: 16 }}>
            Loading metrics...
          </Text>
        </div>
      );
    }

    if (!instagramMetricsLifetime) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No data available for the selected filters"
          style={{ padding: "40px 0" }}
        />
      );
    }

    return (
      <div style={{ padding: "0 16px" }}>
        <MetricsDisplayCard>
          <Title level={4} style={{ marginBottom: 8 }}>
            {instagramMetricsLifetime.description}
          </Title>

          {renderDateInfo()}

          <Row gutter={16}>
            <Col xs={24} md={renderTotalValue() ? 8 : 24}>
              <Tag icon={<LineChartOutlined />} color="blue">
                {formValues?.metric?.replace(/_/g, " ")}
              </Tag>
              {formValues?.breakdown && (
                <Tag
                  icon={<GlobalOutlined />}
                  color="geekblue"
                  style={{ marginLeft: 8 }}
                >
                  Breakdown: {formValues?.breakdown}
                </Tag>
              )}
            </Col>
            {renderTotalValue() && (
              <Col xs={24} md={16}>
                <Row gutter={16}>
                  <Col span={24}>{renderTotalValue()}</Col>
                </Row>
              </Col>
            )}
          </Row>
        </MetricsDisplayCard>

        {renderBreakdownTable()}
        {renderCharts()}
      </div>
    );
  };

  return (
    <div>
      <FilterCard
        title={
          <Space>
            <FilterOutlined style={{ color: "#1890ff" }} />
            <span style={{ fontWeight: 500 }}>Instagram Metrics Filter</span>
          </Space>
        }
      >
        <FilterForm form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col xs={24} sm={12} md={8} lg={8}>
              <Form.Item
                name="metric"
                label="Metric"
                rules={[{ required: true, message: "Please select a metric" }]}
              >
                <Select
                  placeholder="Select metric"
                  onChange={(value) => setSelectedMetric(value)}
                  optionLabelProp="label"
                >
                  {metricOptions.map((option) => (
                    <Option
                      key={option.value}
                      value={option.value}
                      label={option.label}
                    >
                      <Space>
                        <LineChartOutlined />
                        {option.label}
                      </Space>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {shouldShowBreakdown() && (
              <Col xs={24} sm={12} md={8} lg={8}>
                <Form.Item
                  name="breakdown"
                  label="Breakdown By"
                  rules={[
                    {
                      required: shouldRequireBreakdown(),
                      message: "Breakdown is required for this metric",
                    },
                  ]}
                  extra={
                    selectedMetric === "reached_audience_demographics" && (
                      <Text type="warning">Special permissions required</Text>
                    )
                  }
                >
                  <Select
                    placeholder="Select breakdown"
                    disabled={
                      selectedMetric === "reached_audience_demographics"
                    }
                  >
                    {breakdownOptions.map((option) => (
                      <Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            )}

            {shouldShowDateRange() && (
              <Col xs={24} sm={12} md={8} lg={8}>
                <Form.Item
                  name="dateRange"
                  label="Date Range"
                  rules={[
                    {
                      required: shouldRequireDateRange(),
                      message: "Date range is required for this metric",
                    },
                  ]}
                  extra={
                    <Text type="secondary">
                      {shouldRequireDateRange()
                        ? "Start date required"
                        : "Optional for most metrics"}
                    </Text>
                  }
                >
                  <RangePicker
                    style={{ width: "100%" }}
                    format="YYYY-MM-DD"
                    disabledDate={(current) => current > moment().endOf("day")}
                    placeholder={["Start Date", "End Date"]}
                  />
                </Form.Item>
              </Col>
            )}
          </Row>

          {selectedMetric === "profile_views" && (
            <Alert
              message="Date Range Required"
              description="Profile views require a start date to filter results"
              type="info"
              showIcon
              style={{ marginBottom: 16 }}
            />
          )}

          <Divider style={{ margin: "16px 0" }} />

          <Row justify="end">
            <Space>
              <ActionButton
                onClick={() => {
                  form.resetFields();
                  setSelectedMetric(null);
                }}
              >
                Reset
              </ActionButton>
              <ActionButton
                className="bg-primary text-white"
                htmlType="submit"
                loading={loading}
                icon={<FilterOutlined />}
              >
                Apply Filters
              </ActionButton>
            </Space>
          </Row>
        </FilterForm>
      </FilterCard>

      {renderResults()}
    </div>
  );
};

export default InstagramMetricsDashboard;
