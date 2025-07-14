"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  Avatar,
  Button,
  Tag,
  Collapse,
  Typography,
  Badge,
  Spin,
  Divider,
  Row,
  Col,
  Form,
  Input,
  Select,
  message,
  Tabs,
} from "antd";
import {
  GlobalOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  InfoCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Panel } = Collapse;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const industryOptions = [
  "Automotive, Transport & EVs",
  "Beauty & Personal Care",
  "Business, Finance & Career",
  "Dating, Relationships & Adult Interests",
  "Arts, Crafts & Creativity",
  "Fashion",
  "Technology",
  "Food & Beverage",
  "Sports & Fitness",
  "Health & Wellness",
];

const socialMediaOptions = ["Instagram", "YouTube", "X(Twitter)", "TikTok"];
const countryOptions = [
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "KE", name: "Kenya" },
  // Add more as needed
];

const phoneCodeOptions = [
  {
    code: "+1",
    label: "United States (+1)",
    length: 10,
    regex: /^[2-9][0-9]{9}$/,
  },
  {
    code: "+44",
    label: "United Kingdom (+44)",
    length: 10,
    regex: /^[1-9][0-9]{9}$/,
  },
  { code: "+254", label: "Kenya (+254)", length: 9, regex: /^([17][0-9]{8})$/ },
  { code: "+91", label: "India (+91)", length: 10, regex: /^[6-9][0-9]{9}$/ },
  {
    code: "+61",
    label: "Australia (+61)",
    length: 9,
    regex: /^[1-9][0-9]{8}$/,
  },
  { code: "+81", label: "Japan (+81)", length: 10, regex: /^\d{10}$/ },
  { code: "+49", label: "Germany (+49)", length: 11, regex: /^\d{11}$/ },
  { code: "+33", label: "France (+33)", length: 9, regex: /^\d{9}$/ },
  { code: "+55", label: "Brazil (+55)", length: 11, regex: /^\d{11}$/ },
  { code: "+234", label: "Nigeria (+234)", length: 10, regex: /^\d{10}$/ },
  { code: "+27", label: "South Africa (+27)", length: 9, regex: /^\d{9}$/ },
  { code: "+7", label: "Russia (+7)", length: 10, regex: /^\d{10}$/ },
  { code: "+86", label: "China (+86)", length: 11, regex: /^\d{11}$/ },
  { code: "+62", label: "Indonesia (+62)", length: 10, regex: /^\d{10}$/ },
  { code: "+34", label: "Spain (+34)", length: 9, regex: /^\d{9}$/ },
  { code: "+39", label: "Italy (+39)", length: 10, regex: /^\d{10}$/ },
  { code: "+82", label: "South Korea (+82)", length: 10, regex: /^\d{10}$/ },
  { code: "+90", label: "Turkey (+90)", length: 10, regex: /^\d{10}$/ },
  { code: "+20", label: "Egypt (+20)", length: 10, regex: /^\d{10}$/ },
  // ... (add more as needed, or use a full country code dataset)
];

const phoneFormats = {
  "+254": { length: 9, regex: /^([17][0-9]{8})$/ }, // Kenya: 9 digits, starts with 1 or 7
  "+1": { length: 10, regex: /^[2-9][0-9]{9}$/ }, // US/Canada: 10 digits
  "+44": { length: 10, regex: /^[1-9][0-9]{9}$/ }, // UK: 10 digits (simplified)
  "+91": { length: 10, regex: /^[6-9][0-9]{9}$/ }, // India
  // Add more as needed
};
const getPhoneFormat = (code) =>
  phoneFormats[code] || { length: 10, regex: /^\d+$/ };

const BrandProfile = () => {
  const [loading, setLoading] = useState(true);
  const [brandData, setBrandData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setBrandData({
        id: "859f9c6e-e034-430b-bb9b-0738467e5bc2",
        name: "Youtube",
        website: "https://www.youtube.com/",
        legalCompanyName: "Google",
        brandPhoneNumber: { code: "+254", number: "702854204" },
        address: "40405",
        city: "Gitaru ward",
        state: "Nairobi",
        country: null,
        countryData: { code: "KE", name: "Kenya" },
        zipCode: "12345",
        description:
          "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        uniqueness: null,
        businessType: "E-Commerce",
        industry: [
          "Automotive, Transport & EVs",
          "Beauty & Personal Care",
          "Business, Finance & Career",
          "Dating, Relationships & Adult Interests",
          "Arts, Crafts & Creativity",
        ],
        companyType: null,
        companySize: null,
        geographicalScopeOfOperations: null,
        userId: "d818b004-576c-43f6-aa93-427083243a63",
        platformIntroductionSource: null,
        agreedToTerms: false,
        finishedOnboarding: false,
        updatedAt: "2025-07-14T12:58:33.577906Z",
        myUser: null,
        dateJoined: "2025-07-14T12:53:45.133370Z",
        preferences: {
          id: "5524e510-18b6-400f-a49c-729fd7e1eb60",
          monthlyNumberOfInfluencers: null,
          preferredSocialMediaPlatforms: [
            "Instagram",
            "YouTube",
            "X(Twitter)",
            "TikTok",
          ],
          mostImportantCollaborationFactor: null,
          preferredInfluencerMinimumFollowers: null,
          preferredInfluencerGenders: null,
          preferredInfluencerEthnicities: null,
          preferredInfluencerAgeGroups: null,
          preferredInfluencerCountries: [
            { code: "US", name: "United States" },
            { code: "GB", name: "United Kingdom" },
            { code: "AE", name: "United Arab Emirates" },
          ],
          preferredInfluencerCategories: null,
          preferredPaymentOption: null,
          preferredPaidMinimumPay: null,
          preferredPaidMaximumPay: null,
          campaignGoal: null,
          preferredContentFormats: null,
          preferredVideoType: null,
          createdAt: "2025-07-14T12:58:33.594536Z",
          updatedAt: "2025-07-14T12:58:33.594554Z",
          brand: "859f9c6e-e034-430b-bb9b-0738467e5bc2",
        },
      });
      setLoading(false);
    }, 500);
  }, []);

  // Helper for null/empty
  const showValue = (val) =>
    val ? val : <span style={{ color: "#bbb" }}>—</span>;
  const industries = Array.isArray(brandData?.industry)
    ? brandData.industry
    : typeof brandData?.industry === "string" && brandData.industry.length > 0
    ? brandData.industry.split(",").map((s) => s.trim())
    : [];
  const pref = brandData?.preferences || {};
  const prefPlatforms = pref.preferredSocialMediaPlatforms || [];
  const prefCountries = pref.preferredInfluencerCountries || [];

  // Edit handlers
  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldsValue({
      ...brandData,
      industry: industries,
      website: brandData.website?.replace(/^https?:\/\//, ""),
      brandPhoneNumber: brandData.brandPhoneNumber?.number,
      phoneCode: brandData.brandPhoneNumber?.code || "+1",
      country: brandData.countryData?.name || "",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const handleSave = (values) => {
    // Simulate API update
    const updatedPreferences = {
      ...brandData.preferences,
      ...values.preferences,
      preferredSocialMediaPlatforms:
        values.preferences?.preferredSocialMediaPlatforms || [],
      preferredInfluencerCountries: (
        values.preferences?.preferredInfluencerCountries || []
      ).map((c) => {
        if (typeof c === "object" && c.code && c.name) return c;
        const found = countryOptions.find(
          (opt) => opt.code === (c.key || c.value || c)
        );
        return found
          ? { code: found.code, name: found.name }
          : { code: c.key || c.value || c, name: c.label || c };
      }),
    };
    const updated = {
      ...brandData,
      ...values,
      website: values.website.startsWith("http")
        ? values.website
        : `https://${values.website}`,
      industry: values.industry,
      brandPhoneNumber: {
        code: values.phoneCode,
        number: values.brandPhoneNumber,
      },
      countryData: { ...brandData.countryData, name: values.country },
      preferences: updatedPreferences,
    };
    setBrandData(updated);
    setIsEditing(false);
    message.success("Profile updated!");
  };

  if (loading || !brandData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f4f6fb] to-[#e9ecf7]">
      <div className="w-11/12 mx-auto py-12">
        <Card bodyStyle={{ padding: 0 }} className="rounded-md shadow-xl bg-white">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start justify-between px-8 pt-8 gap-6 md:gap-4">
            <div className="flex items-center gap-8">
              <Avatar size={96} className="bg-gray-200 text-4xl">
                {brandData.name ? brandData.name[0] : "?"}
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <Title level={2} className="!mb-0 !font-bold">
                    {brandData.name}
                  </Title>
                  <Badge
                    status="success"
                    text={<span className="text-green-600 font-medium">Verified</span>}
                  />
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {industries.length > 0 ? (
                    industries.map((ind, i) => (
                      <Tag key={i} color="blue" className="text-[13px]">{ind}</Tag>
                    ))
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-6 text-gray-600 text-[15px] mt-3">
                  <span className="flex items-center gap-1"><EnvironmentOutlined /> {brandData.city}, {brandData.state}, {brandData.countryData?.name || "—"}</span>
                  <span className="flex items-center gap-1"><PhoneOutlined /> {brandData.brandPhoneNumber?.code} {brandData.brandPhoneNumber?.number}</span>
                  <a href={brandData.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline"><GlobalOutlined /> {brandData.website.replace(/^https?:\/\//, "")}</a>
                </div>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 whitespace-nowrap text-white bg-gradient-to-r from-primary to-secondary px-6 py-2 rounded text-sm font-medium shadow hover:from-blue-700 hover:to-blue-500 transition-colors"
              >
                <EditOutlined className="text-base" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>

          {/* Main Content: Display or Edit */}
          <div className="p-8 w-full">
            {isEditing ? (
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSave}
                initialValues={{ ...brandData, industry: industries }}
              >
                <Tabs
                  defaultActiveKey="general"
                  type="card"
                  style={{ marginBottom: 24 }}
                >
                  <Tabs.TabPane tab="General Info" key="general">
                    <Row gutter={32}>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name="name"
                          label="Brand Name"
                          rules={[
                            {
                              required: true,
                              message: "Please enter brand name",
                            },
                          ]}
                        >
                          {" "}
                          <Input />{" "}
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name="legalCompanyName"
                          label="Legal Company Name"
                          rules={[
                            {
                              required: true,
                              message: "Please enter legal company name",
                            },
                          ]}
                        >
                          {" "}
                          <Input />{" "}
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name="website"
                          label="Website"
                          rules={[
                            { required: true, message: "Please enter website" },
                          ]}
                        >
                          {" "}
                          <Input addonBefore="https://" />{" "}
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item name="businessType" label="Business Type">
                          {" "}
                          <Input />{" "}
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name="industry"
                          label="Industry"
                          rules={[
                            {
                              required: true,
                              message: "Please select industry",
                            },
                          ]}
                        >
                          {" "}
                          <Select
                            mode="tags"
                            style={{ width: "100%" }}
                            placeholder="Select or type industries"
                          >
                            {" "}
                            {industryOptions.map((opt) => (
                              <Option key={opt} value={opt}>
                                {opt}
                              </Option>
                            ))}{" "}
                          </Select>{" "}
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item name="companyType" label="Company Type">
                          {" "}
                          <Input />{" "}
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item name="companySize" label="Company Size">
                          {" "}
                          <Input />{" "}
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name="geographicalScopeOfOperations"
                          label="Geographical Scope"
                        >
                          {" "}
                          <Input />{" "}
                        </Form.Item>
                      </Col>
                    </Row>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Contact & Location" key="contact">
                    <Row gutter={32}>
                      <Col xs={24} md={12}>
                        <Form.Item name="address" label="Address">
                          {" "}
                          <Input />{" "}
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item name="city" label="City">
                          {" "}
                          <Input />{" "}
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item name="state" label="State">
                          {" "}
                          <Input />{" "}
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item name="zipCode" label="Zip Code">
                          {" "}
                          <Input />{" "}
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          label="Phone Number"
                          required
                          validateStatus={phoneError ? "error" : ""}
                          help={phoneError}
                        >
                          <Input
                            addonBefore={
                              <Form.Item
                                name="phoneCode"
                                noStyle
                                initialValue={
                                  brandData.brandPhoneNumber?.code || "+1"
                                }
                              >
                                <Select
                                  showSearch
                                  optionFilterProp="children"
                                  style={{ width: 180 }}
                                  filterOption={(input, option) =>
                                    option?.children
                                      ?.toLowerCase()
                                      .indexOf(input.toLowerCase()) >= 0
                                  }
                                >
                                  {phoneCodeOptions.map((opt) => (
                                    <Option key={opt.code} value={opt.code}>
                                      {opt.label}
                                    </Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            }
                            name="brandPhoneNumber"
                            onChange={(e) => {
                              const code =
                                form.getFieldValue("phoneCode") || "+1";
                              const val = e.target.value.replace(/\D/g, "");
                              const { length, regex } = getPhoneFormat(code);
                              let error = "";
                              if (val.length > length) {
                                error = `Phone number should be exactly ${length} digits for this country.`;
                              } else if (val && !regex.test(val)) {
                                error = `Invalid phone number format for this country.`;
                              }
                              setPhoneError(error);
                              form.setFieldsValue({ brandPhoneNumber: val });
                            }}
                            value={form.getFieldValue("brandPhoneNumber")}
                            placeholder={(() => {
                              const code =
                                form.getFieldValue("phoneCode") || "+1";
                              if (code === "+254") return "716743291";
                              if (code === "+1") return "4155552671";
                              if (code === "+44") return "7123456789";
                              if (code === "+91") return "9876543210";
                              return "Phone number";
                            })()}
                            className="w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all h-10"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Preferences" key="preferences">
                    <Row gutter={32}>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name={[
                            "preferences",
                            "preferredSocialMediaPlatforms",
                          ]}
                          label="Preferred Social Media Platforms"
                        >
                          <Select
                            mode="multiple"
                            allowClear
                            placeholder="Select platforms"
                          >
                            {socialMediaOptions.map((opt) => (
                              <Option key={opt} value={opt}>
                                {opt}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name={["preferences", "preferredInfluencerCountries"]}
                          label="Preferred Influencer Countries"
                        >
                          <Select
                            mode="multiple"
                            labelInValue
                            allowClear
                            placeholder="Select countries"
                            optionLabelProp="label"
                          >
                            {countryOptions.map((opt) => (
                              <Option
                                key={opt.code}
                                value={opt.code}
                                label={opt.name}
                              >
                                {opt.name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name={["preferences", "monthlyNumberOfInfluencers"]}
                          label="Monthly Number of Influencers"
                        >
                          <Input type="number" min={0} placeholder="e.g. 10" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name={[
                            "preferences",
                            "mostImportantCollaborationFactor",
                          ]}
                          label="Most Important Collaboration Factor"
                        >
                          <Input placeholder="e.g. Engagement Rate" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name={[
                            "preferences",
                            "preferredInfluencerMinimumFollowers",
                          ]}
                          label="Min Influencer Followers"
                        >
                          <Input
                            type="number"
                            min={0}
                            placeholder="e.g. 1000"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name={["preferences", "preferredInfluencerGenders"]}
                          label="Preferred Influencer Genders"
                        >
                          <Input placeholder="e.g. Male, Female" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name={[
                            "preferences",
                            "preferredInfluencerEthnicities",
                          ]}
                          label="Preferred Influencer Ethnicities"
                        >
                          <Input placeholder="e.g. Asian, African" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name={["preferences", "preferredInfluencerAgeGroups"]}
                          label="Preferred Influencer Age Groups"
                        >
                          <Input placeholder="e.g. 18-24, 25-34" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name={[
                            "preferences",
                            "preferredInfluencerCategories",
                          ]}
                          label="Preferred Influencer Categories"
                        >
                          <Input placeholder="e.g. Fashion, Tech" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name={["preferences", "preferredPaymentOption"]}
                          label="Preferred Payment Option"
                        >
                          <Input placeholder="e.g. PayPal, Bank Transfer" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name={["preferences", "preferredPaidMinimumPay"]}
                          label="Preferred Paid Minimum Pay"
                        >
                          <Input type="number" min={0} placeholder="e.g. 100" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name={["preferences", "preferredPaidMaximumPay"]}
                          label="Preferred Paid Maximum Pay"
                        >
                          <Input
                            type="number"
                            min={0}
                            placeholder="e.g. 1000"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name={["preferences", "campaignGoal"]}
                          label="Campaign Goal"
                        >
                          <Input placeholder="e.g. Brand Awareness" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name={["preferences", "preferredContentFormats"]}
                          label="Preferred Content Formats"
                        >
                          <Input placeholder="e.g. Video, Image" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name={["preferences", "preferredVideoType"]}
                          label="Preferred Video Type"
                        >
                          <Input placeholder="e.g. Testimonial, Unboxing" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Tabs.TabPane>
                </Tabs>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 16,
                    marginTop: 32,
                  }}
                >
                  <Button onClick={handleCancel}>Cancel</Button>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </div>
              </Form>
            ) : (
              <>
                <Row gutter={[32, 24]} style={{ marginBottom: 16 }}>
                  <Col xs={24} md={12}>
                    <Text strong>Legal Company Name:</Text> <br />
                    {showValue(brandData.legalCompanyName)}
                  </Col>
                  <Col xs={24} md={12}>
                    <Text strong>Business Type:</Text> <br />
                    {showValue(brandData.businessType)}
                  </Col>
                  <Col xs={24} md={12}>
                    <Text strong>Company Type:</Text> <br />
                    {showValue(brandData.companyType)}
                  </Col>
                  <Col xs={24} md={12}>
                    <Text strong>Company Size:</Text> <br />
                    {showValue(brandData.companySize)}
                  </Col>
                  <Col xs={24} md={12}>
                    <Text strong>Geographical Scope:</Text> <br />
                    {showValue(brandData.geographicalScopeOfOperations)}
                  </Col>
                  <Col xs={24} md={12}>
                    <Text strong>Address:</Text> <br />
                    {showValue(
                      `${brandData.address}, ${brandData.city}, ${brandData.state}, ${brandData.zipCode}`
                    )}
                  </Col>
                  <Col xs={24} md={12}>
                    <Text strong>Date Joined:</Text> <br />
                    {showValue(
                      dayjs(brandData.dateJoined).format("MMM D, YYYY")
                    )}
                  </Col>
                </Row>
                <Paragraph
                  style={{ fontSize: 16, color: "#444", marginBottom: 24 }}
                >
                  <InfoCircleOutlined
                    style={{ color: "#1677ff", marginRight: 8 }}
                  />
                  {showValue(brandData.description)}
                </Paragraph>
                <Collapse
                  bordered={false}
                  style={{ background: "#fafbfc", borderRadius: 8 }}
                >
                  <Panel
                    header={
                      <span style={{ fontWeight: 600 }}>Preferences</span>
                    }
                    key="1"
                  >
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 16,
                        marginBottom: 12,
                      }}
                    >
                      <div>
                        <Text strong>Preferred Platforms:</Text>
                        <br />
                        {prefPlatforms.length
                          ? prefPlatforms.map((p, i) => (
                              <Tag
                                key={i}
                                color="purple"
                                style={{ fontSize: 13 }}
                              >
                                {p}
                              </Tag>
                            ))
                          : showValue(null)}
                      </div>
                      <div>
                        <Text strong>Preferred Countries:</Text>
                        <br />
                        {prefCountries.length
                          ? prefCountries.map((c, i) => (
                              <Tag
                                key={i}
                                color="geekblue"
                                style={{ fontSize: 13 }}
                              >
                                {c.name}
                              </Tag>
                            ))
                          : showValue(null)}
                      </div>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                      <div>
                        <Text strong>Monthly Influencers:</Text>{" "}
                        {showValue(pref.monthlyNumberOfInfluencers)}
                      </div>
                      <div>
                        <Text strong>Collaboration Factor:</Text>{" "}
                        {showValue(pref.mostImportantCollaborationFactor)}
                      </div>
                      <div>
                        <Text strong>Min Followers:</Text>{" "}
                        {showValue(pref.preferredInfluencerMinimumFollowers)}
                      </div>
                      <div>
                        <Text strong>Genders:</Text>{" "}
                        {showValue(pref.preferredInfluencerGenders)}
                      </div>
                      <div>
                        <Text strong>Ethnicities:</Text>{" "}
                        {showValue(pref.preferredInfluencerEthnicities)}
                      </div>
                      <div>
                        <Text strong>Age Groups:</Text>{" "}
                        {showValue(pref.preferredInfluencerAgeGroups)}
                      </div>
                      <div>
                        <Text strong>Categories:</Text>{" "}
                        {showValue(pref.preferredInfluencerCategories)}
                      </div>
                      <div>
                        <Text strong>Payment Option:</Text>{" "}
                        {showValue(pref.preferredPaymentOption)}
                      </div>
                      <div>
                        <Text strong>Min Pay:</Text>{" "}
                        {showValue(pref.preferredPaidMinimumPay)}
                      </div>
                      <div>
                        <Text strong>Max Pay:</Text>{" "}
                        {showValue(pref.preferredPaidMaximumPay)}
                      </div>
                      <div>
                        <Text strong>Campaign Goal:</Text>{" "}
                        {showValue(pref.campaignGoal)}
                      </div>
                      <div>
                        <Text strong>Content Formats:</Text>{" "}
                        {showValue(pref.preferredContentFormats)}
                      </div>
                      <div>
                        <Text strong>Video Type:</Text>{" "}
                        {showValue(pref.preferredVideoType)}
                      </div>
                    </div>
                  </Panel>
                </Collapse>
              </>
            )}
          </div>
        </Card>
        <Divider style={{ margin: "40px 0 0 0", borderColor: "#e0e3ea" }} />
      </div>
    </div>
  );
};

export default BrandProfile;
