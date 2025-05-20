"use client";
import { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Statistic,
  DatePicker,
  Tag,
  Typography,
  Upload,
  message,
  Skeleton,
} from "antd";
import {
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  InstagramOutlined,
  FacebookOutlined,
  TikTokOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import SocialMediaTabs from "@/app/Components/Influencer/profile/socialMediaTabs";
import { useSelector, useDispatch } from "react-redux";
import SuccessButtonComponent from "@/app/Components/SharedComponents/SuccessButtonComponent";
import { getInfluencerProfile } from "@/redux/features/socials";
import { useAuth } from "@/assets/hooks/use-auth";
import { useProtectedRoute } from "@/assets/hooks/authGuard";
import { updateInfluencerProfile } from "@/redux/services/socials";
import { countryOptions } from "@/assets/utils/countryData";
import moment from "moment";
// PrimeReact Components
import { Calendar } from "primereact/calendar";
import { InputMask } from "primereact/inputmask";
import { Chips } from "primereact/chips";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import toast from "react-hot-toast";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const InfluencerProfilePage = () => {
  const isAuthorized = useProtectedRoute();
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [countryCode, setCountryCode] = useState("+1");
  const [fileList, setFileList] = useState([]);
  const { posts } = useSelector((store) => store.campaign);
  const { influencerProfile } = useSelector((store) => store.socials);
  const dispatch = useDispatch();
  const auth = useAuth();

  // Create edit payload structure based on second object format
  // Update this function in your InfluencerProfilePage component
  const createEditPayload = (profile) => {
    if (!profile) return null;

    // Parse phone number
    let phoneNumberObj = { number: "", code: "" };
    if (profile.phoneNumber) {
      // Handle when phoneNumber is an object from API
      if (
        typeof profile.phoneNumber === "object" &&
        profile.phoneNumber.code &&
        profile.phoneNumber.number
      ) {
        phoneNumberObj = {
          code: profile.phoneNumber.code,
          number: profile.phoneNumber.number,
        };
        setPhoneNumber(profile.phoneNumber.number);
        setCountryCode(profile.phoneNumber.code);
      }
      // Handle when phoneNumber is a string like "+254(070) 285-4204"
      else if (typeof profile.phoneNumber === "string") {
        // Extract country code (everything before the parenthesis)
        const codeMatch = profile.phoneNumber.match(/^(\+\d+)/);
        const code = codeMatch ? codeMatch[1] : "+1";

        // Extract the actual phone number (everything inside and after parentheses)
        const numberMatch = profile.phoneNumber.match(/\(([^)]+)\)\s*([\d-]+)/);
        const number = numberMatch
          ? `(${numberMatch[1]}) ${numberMatch[2]}`
          : profile.phoneNumber.replace(/^\+\d+\s*/, "");

        phoneNumberObj = { code, number };
        setPhoneNumber(number);
        setCountryCode(code);
      }
    }

    // Rest of the function remains the same...
    let dob = null;
    if (profile.dateOfBirth) {
      // Try to parse the date using moment
      const parsedDate = moment(profile.dateOfBirth);
      if (parsedDate.isValid()) {
        dob = parsedDate.toDate();
        setDateOfBirth(dob);
      }
    } else if (profile.age) {
      // Fallback to calculating from age
      dob = moment().subtract(profile.age, "years").toDate();
      setDateOfBirth(dob);
    }

    // Parse country
    let countryObj = {
      name: profile.country || "",
      code: "", // You'll need to get this from somewhere
      flag: "", // You'll need to get this from somewhere
    };

    return {
      dateOfBirth: dateOfBirth,
      gender: profile.gender || "",
      bio: profile.bio || "",
      ethnicBackground: profile.ethnicBackground || [],
      addressLine1: profile.addressLine1 || "",
      addressLine2: profile.addressLine2 || "",
      city: profile.city || "",
      country: countryObj,
      zipCode: profile.zipCode || "",
      phoneNumber: phoneNumberObj,
      isAvailableForCollaboration: profile.isAvailableForCollaboration || false,
      languages: profile.languages || [],
      contentCategories: profile.contentCategories || [],
      keywords: profile.keywords || [],
      firstName: profile.fullName?.split(" ")[0] || "",
      lastName: profile.fullName?.split(" ").slice(-1)[0] || "",
      middleName:
        profile.fullName?.split(" ").length > 2
          ? profile.fullName?.split(" ").slice(1, -1).join(" ")
          : "",
      influencerPreference: profile.influencerPreference || {
        preferredBrands: [],
        preferredCollaborationContentFormat: [],
        preferredCompaniesType: [],
        preferredPaymentOption: [],
        preferredLeadTimeForProjectDays: 0,
        preferredPaidMinimumPay: "0",
        preferredPaidMaximumPay: "0",
      },
    };
  };

  const fetchInfluencerProfile = async () => {
    try {
      setLoading(true);
      await dispatch(getInfluencerProfile(auth));
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfluencerProfile();
  }, []);

  const handleEdit = () => {
    if (influencerProfile) {
      const editPayload = createEditPayload(influencerProfile);
      form.setFieldsValue(editPayload);
      setIsEditing(true);
    }
  };

  // Update the handleSave function to correctly format the phone number for the API
  const handleSave = async () => {
    setSubmitting(true);
    const values = await form.validateFields();

    const transformPaymentOptions = (options) => {
      if (!options) return [];

      if (options[0]?.label && options[0]?.description) {
        return options;
      }

      if (typeof options[0] === "string") {
        return options.map((option) => ({
          label: option,
          description: option,
        }));
      }

      return [];
    };

    // Make sure phone number is properly formatted for the API
    // The API expects: { code: "+254", number: "(070) 285-4204" }
    const payload = {
      ...values,
      dateOfBirth: dateOfBirth
        ? moment(dateOfBirth).format("YYYY-MM-DD")
        : null,
      phoneNumber: {
        code: countryCode || "+1", // Make sure this is just the country code like "+254"
        number: phoneNumber || "", // This should be in format "(070) 285-4204"
      },
      country: {
        name: values.country?.name || "",
        code: values.country?.code || "",
        flag: values.country?.flag || "",
      },
      influencerPreference: {
        ...values.influencerPreference,
        preferredPaymentOption: transformPaymentOptions(
          values.influencerPreference?.preferredPaymentOption
        ),
      },
    };

    try {
      console.log("Saving profile with payload:", payload);
      const response = await updateInfluencerProfile(auth, payload);
      console.log("UPDATE_RESPONSE ", response);
      if (response.status === 200) {
        toast("Profile updated successfully!");
        setIsEditing(false);
        // Refresh the profile data to show the updated values
        fetchInfluencerProfile();
      } else {
        // toast.error(response.data.errorMessage)
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error(
        error.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
    setFileList([]);
  };

  // ... (keep existing upload and other helper functions)
  const handleUploadChange = (info) => {
    let newFileList = [...info.fileList];

    // Limit to 1 file
    newFileList = newFileList.slice(-1);

    // Read from response and show file link
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(newFileList);

    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      form.setFieldsValue({
        profilePicture: info.file.response.url,
      });
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  const uploadProps = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    fileList,
    onChange: handleUploadChange,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files!");
      }
      return isImage;
    },
  };

  const parsePhoneNumber = (phoneString) => {
    if (!phoneString) return { code: "+1", number: "" };

    console.log("Parsing phone number:", phoneString);

    // Handle different formats of phone numbers from API
    // Format 1: "+254(070) 285-4204"
    const formatOne = phoneString.match(/^(\+\d+)\((\d+)\)\s*(.+)$/);
    if (formatOne) {
      const code = formatOne[1];
      const number = `(${formatOne[2]}) ${formatOne[3]}`;
      console.log("Format 1 parsed:", { code, number });
      return { code, number };
    }

    // Format 2: "+254 1234567890"
    const formatTwo = phoneString.match(/^(\+\d+)\s+(.+)$/);
    if (formatTwo) {
      const code = formatTwo[1];
      // Try to format the number if possible
      const digits = formatTwo[2].replace(/\D/g, "");
      let number = formatTwo[2];
      if (digits.length === 10) {
        // US format
        number = `(${digits.substring(0, 3)}) ${digits.substring(
          3,
          6
        )}-${digits.substring(6)}`;
      }
      console.log("Format 2 parsed:", { code, number });
      return { code, number };
    }

    // Default case: just a number, assume US format
    if (phoneString.startsWith("+")) {
      const code = phoneString.match(/^(\+\d+)/)[1] || "+1";
      const number = phoneString.replace(code, "").trim();
      console.log("Default format parsed:", { code, number });
      return { code, number };
    }

    // Just a number without code
    return { code: "+1", number: phoneString };
  };

  useEffect(() => {
    if (influencerProfile?.phoneNumber) {
      const { code, number } = parsePhoneNumber(influencerProfile.phoneNumber);
      setCountryCode(code);
      setPhoneNumber(number);
      console.log("Initialized phone with:", { code, number });
    }
  }, [influencerProfile]);

  if (loading && !influencerProfile) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!influencerProfile) {
    return <div>No data found</div>;
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <Skeleton active paragraph={{ rows: 15 }} />
      ) : (
        <>
          {isEditing ? (
            <Card
              title="Edit Profile"
              extra={
                <Space>
                  <button
                    type="button"
                    className="border border-primary rounded px-6 py-3 text-xs text-color"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <SuccessButtonComponent
                    onClick={handleSave}
                    type="submit"
                    label={
                      submitting ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Saving...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          Save Changes
                          <CheckCircleFilled className="ml-2" />
                        </span>
                      )
                    }
                    disabled={submitting}
                    className={`w-full py-3 px-4 rounded-lg font-medium bg-green/80 text-white transition-all`}
                  />
                </Space>
              }
              className="mb-6"
            >
              <Form form={form} layout="vertical" onFinish={handleSave}>
                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item label="Profile Picture">
                      <Upload
                        {...uploadProps}
                        listType="picture-card"
                        showUploadList={false}
                      >
                        {fileList.length >= 1 ? null : (
                          <Avatar
                            size={68}
                            src={influencerProfile.profilePicture}
                            className="cursor-pointer"
                          />
                        )}
                      </Upload>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={8}>
                    <Form.Item
                      label="First Name"
                      name="firstName"
                      rules={[
                        {
                          required: true,
                          message: "Please input your first name",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={8}>
                    <Form.Item label="Middle Name" name="middleName">
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={8}>
                    <Form.Item
                      label="Last Name"
                      name="lastName"
                      rules={[
                        {
                          required: true,
                          message: "Please input your last name",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item label="Date of Birth" name="dateOfBirth">
                      <div className="w-full">
                        <Calendar
                          value={dateOfBirth}
                          onChange={(e) => setDateOfBirth(e.value)}
                          dateFormat="yy-mm-dd"
                          showIcon
                          maxDate={new Date()}
                          className="w-full border border-input text-sm rounded p-1"
                          touchUI
                        />
                      </div>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Gender"
                      name="gender"
                      rules={[
                        {
                          required: true,
                          message: "Please select your gender",
                        },
                      ]}
                    >
                      <Select>
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                        <Option value="Non-binary">Non-binary</Option>
                        <Option value="Other">Other</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      label="Bio"
                      name="bio"
                      rules={[
                        { required: true, message: "Please input your bio" },
                      ]}
                    >
                      <Input.TextArea rows={4} />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item label="Phone Number" required>
                      <div className="flex">
                        <div className="w-1/3 mr-2">
                          <Dropdown
                            value={countryCode}
                            options={countryOptions}
                            onChange={(e) => setCountryCode(e.value)}
                            placeholder="Code"
                            className="w-full border border-input text-xs"
                          />
                        </div>
                        <div className="w-2/3">
                          <InputMask
                            mask="(999) 999-9999"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="(555) 555-5555"
                            className="w-full p-2 border border-input rounded"
                          />
                        </div>
                      </div>
                      {/* Add debug display to see current values */}
                      <div className="text-xs text-primary font-semibold mt-1">
                        Current: {countryCode} {phoneNumber}
                      </div>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Country"
                      name={["country", "name"]}
                      rules={[
                        {
                          required: true,
                          message: "Please select your country",
                        },
                      ]}
                    >
                      <Select showSearch>
                        <Option value="Kenya">Kenya</Option>
                        <Option value="United States">United States</Option>
                        <Option value="United Kingdom">United Kingdom</Option>
                      </Select>
                    </Form.Item>

                    {/* Add hidden fields for country code and flag if needed */}
                    <Form.Item name={["country", "code"]} noStyle hidden>
                      <Input />
                    </Form.Item>
                    <Form.Item name={["country", "flag"]} noStyle hidden>
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Address Line 1"
                      name="addressLine1"
                      rules={[
                        {
                          required: true,
                          message: "Please input your address",
                        },
                      ]}
                    >
                      <Input prefix={<EnvironmentOutlined />} />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item label="Address Line 2" name="addressLine2">
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={8}>
                    <Form.Item
                      label="City"
                      name="city"
                      rules={[
                        { required: true, message: "Please input your city" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={8}>
                    <Form.Item
                      label="Zip Code"
                      name="zipCode"
                      rules={[
                        {
                          required: true,
                          message: "Please input your zip code",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      label="Ethnic Background"
                      name="ethnicBackground"
                    >
                      <Select mode="multiple">
                        <Option value="Asian">Asian</Option>
                        <Option value="Black">Black</Option>
                        <Option value="Hispanic">Hispanic</Option>
                        <Option value="White">White</Option>
                        <Option value="Native American">Native American</Option>
                        <Option value="Other">Other</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item label="Languages" name="languages">
                      <Select mode="tags" tokenSeparators={[","]} />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      label="Content Categories"
                      name="contentCategories"
                      rules={[
                        {
                          required: true,
                          message: "Please select at least one category",
                        },
                      ]}
                    >
                      <Select mode="multiple">
                        <Option value="Technology">Technology</Option>
                        <Option value="Fitness">Fitness</Option>
                        <Option value="Travel">Travel</Option>
                        <Option value="Fashion">Fashion</Option>
                        <Option value="Food">Food</Option>
                        <Option value="Lifestyle">Lifestyle</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item label="Keywords" name="keywords">
                      <Select mode="tags" tokenSeparators={[","]} />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Available for Collaboration"
                      name="isAvailableForCollaboration"
                    >
                      <Select>
                        <Option value={true}>Yes</Option>
                        <Option value={false}>No</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Divider orientation="left">Influencer Preferences</Divider>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Preferred Brands"
                      name={["influencerPreference", "preferredBrands"]}
                    >
                      <Select mode="multiple">
                        <Option value="Technology">Technology</Option>
                        <Option value="Fitness Equipment">
                          Fitness Equipment
                        </Option>
                        <Option value="Travel Gear">Travel Gear</Option>
                        <Option value="Fashion">Fashion</Option>
                        <Option value="Beauty">Beauty</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Preferred Collaboration Format"
                      name={[
                        "influencerPreference",
                        "preferredCollaborationContentFormat",
                      ]}
                    >
                      <Select mode="multiple">
                        <Option value="Stories">Stories</Option>
                        <Option value="Posts">Posts</Option>
                        <Option value="Reels">Reels</Option>
                        <Option value="Videos">Videos</Option>
                        <Option value="Live">Live</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Minimum Pay ($)"
                      name={["influencerPreference", "preferredPaidMinimumPay"]}
                    >
                      <Input type="number" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Maximum Pay ($)"
                      name={["influencerPreference", "preferredPaidMaximumPay"]}
                    >
                      <Input type="number" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Lead Time (Days)"
                      name={[
                        "influencerPreference",
                        "preferredLeadTimeForProjectDays",
                      ]}
                    >
                      <Input type="number" min={0} />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Preferred Payment Options"
                      name={["influencerPreference", "preferredPaymentOption"]}
                    >
                      <Select mode="multiple">
                        <Option value="Bank Transfer">Bank Transfer</Option>
                        <Option value="PayPal">PayPal</Option>
                        <Option value="Cash">Cash</Option>
                        <Option value="Crypto">Crypto</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>
          ) : (
            <>
              <Card className="mb-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center">
                    <Avatar size={160} src={influencerProfile.profilePicture} />
                    <Button
                      type="link"
                      icon={<EditOutlined />}
                      onClick={handleEdit}
                      className="mt-4"
                    >
                      Edit Profile
                    </Button>
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <Title level={2} className="mb-0">
                          {influencerProfile.fullName}
                        </Title>
                        <Text type="secondary">
                          {influencerProfile.age} years •{" "}
                          {influencerProfile.gender}
                        </Text>
                        <Tag className="mx-2" color="blue">
                          {influencerProfile?.ethnicBackground?.[0]}
                        </Tag>
                      </div>

                      <Tag
                        color={
                          influencerProfile.isAvailableForCollaboration
                            ? "green"
                            : "red"
                        }
                      >
                        {influencerProfile.isAvailableForCollaboration ? (
                          <Space>
                            <CheckCircleOutlined /> Available for Collabs
                          </Space>
                        ) : (
                          <Space>
                            <CloseCircleOutlined /> Not Available
                          </Space>
                        )}
                      </Tag>
                    </div>

                    <Paragraph className="mt-4">
                      {influencerProfile.bio}
                    </Paragraph>

                    <Divider />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Text strong>Contact Information</Text>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center">
                            <MailOutlined className="mr-2" />
                            <Text>{influencerProfile.email}</Text>
                          </div>
                          <div className="flex items-center">
                            <PhoneOutlined className="mr-2" />
                            <Text>{influencerProfile.phoneNumber}</Text>
                          </div>
                          <div className="flex items-center">
                            <EnvironmentOutlined className="mr-2" />
                            <Text>
                              {influencerProfile.addressLine1},{" "}
                              {influencerProfile.addressLine2}
                              <br />
                              {influencerProfile.city},{" "}
                              {influencerProfile.country}{" "}
                              {influencerProfile.zipCode}
                            </Text>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Text strong>Content Categories</Text>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {influencerProfile?.contentCategories?.map(
                            (category) => (
                              <Tag key={category} color="blue">
                                {category}
                              </Tag>
                            )
                          )}
                        </div>

                        <Text strong className="mt-4 block">
                          Topics
                        </Text>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {influencerProfile?.keywords?.map((keyword) => (
                            <Tag key={keyword}>{keyword}</Tag>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Row gutter={16} className="mb-6">
                <Col xs={24} md={8}>
                  <Card title="Social Media Stats">
                    <Space direction="vertical" size="large" className="w-full">
                      <div className="flex items-center">
                        <Avatar
                          size={64}
                          src={influencerProfile?.instagram?.profilePictureUrl}
                          className="mr-4"
                        />
                        <div>
                          <Text strong>
                            @{influencerProfile.instagram?.username}
                          </Text>
                          <div className="flex items-center">
                            {influencerProfile.isInstagramConnected ? (
                              <CheckCircleOutlined className="text-green-500 mr-1" />
                            ) : (
                              <CloseCircleOutlined className="text-red-500 mr-1" />
                            )}
                            <Text type="secondary">Instagram</Text>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <Statistic
                          title="Followers"
                          value={influencerProfile.instagram?.followersCount}
                          className="text-center"
                        />
                        <Statistic
                          title="Following"
                          value={influencerProfile.instagram?.followsCount}
                          className="text-center"
                        />
                        <Statistic
                          title="Posts"
                          value={influencerProfile.instagram?.mediaCount}
                          className="text-center"
                        />
                        <Statistic
                          title="Engagement"
                          value="4.2%"
                          className="text-center"
                        />
                      </div>
                      <Divider />

                      <div className="flex items-center">
                        <Avatar
                          size={64}
                          src={influencerProfile.tiktok.avatarUrl}
                          className="mr-4"
                        />
                        <div>
                          <Text strong>
                            @{influencerProfile.tiktok.username}
                          </Text>
                          <div className="flex items-center">
                            {influencerProfile.isTiktokConnected ? (
                              <CheckCircleOutlined className="text-green-500 mr-1" />
                            ) : (
                              <CloseCircleOutlined className="text-red-500 mr-1" />
                            )}
                            <Text type="secondary">TikTok</Text>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <Statistic
                          title="Followers"
                          value={influencerProfile.tiktok?.followerCount}
                          className="text-center"
                        />
                        <Statistic
                          title="Videos"
                          value={influencerProfile.tiktok?.videoCount}
                          className="text-center"
                        />
                        <Statistic
                          title="Likes"
                          value={influencerProfile.tiktok?.likesCount}
                          className="text-center"
                        />
                      </div>
                      <Divider />

                      <div className="flex items-center">
                        <Avatar
                          size={64}
                          icon={<FacebookOutlined />}
                          className="mr-4 bg-blue-500"
                        />
                        <div>
                          <Text strong>Facebook</Text>
                          <div className="flex items-center">
                            {influencerProfile.isFacebookAccountConnected ? (
                              <CheckCircleOutlined className="text-green-500 mr-1" />
                            ) : (
                              <CloseCircleOutlined className="text-red-500 mr-1" />
                            )}
                            <Text type="secondary">Connected</Text>
                          </div>
                        </div>
                      </div>
                    </Space>
                  </Card>
                </Col>
                <SocialMediaTabs />
              </Row>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default InfluencerProfilePage;
