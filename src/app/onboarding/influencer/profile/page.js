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
  Tag,
  Typography,
  Upload,
  message,
  Skeleton,
  Tabs,
  DatePicker,
  Progress,
} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  PhoneOutlined as PhoneIcon,
  BriefcaseOutlined as BriefcaseIcon,
} from "@ant-design/icons";
import { FaFacebook } from "react-icons/fa";
import SocialMediaTabs from "@/app/Components/Influencer/profile/socialMediaTabs";
import { useSelector, useDispatch } from "react-redux";
import { getInfluencerProfile } from "@/redux/features/socials";
import { useAuth } from "@/assets/hooks/use-auth";
import { useProtectedRoute } from "@/assets/hooks/authGuard";
import { updateInfluencerProfile } from "@/redux/services/socials";
import { countryOptions } from "@/assets/utils/countryData";
import moment from "moment";
import dayjs from "dayjs";
// PrimeReact Components
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import toast from "react-hot-toast";
// MUI Components
import {
  FiUser,
  FiPhone,
  FiBriefcase,
  FiSettings,
  FiEdit,
  FiCheck,
  FiMail,
  FiMapPin,
} from "react-icons/fi";
import ImageUploadInline from "@/app/Components/SharedComponents/ImageUploadModal";
import { editProfilePhoto } from "@/redux/services/influencer/profile";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const formatPhoneNumber = (value) => {
  if (!value) return "";
  const cleaned = value.replace(/\D/g, "");
  let formatted = cleaned;

  if (cleaned.length > 0) {
    if (cleaned.length <= 3) {
      formatted = cleaned;
    } else if (cleaned.length <= 6) {
      formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    } else {
      formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(
        3,
        6
      )} ${cleaned.slice(6, 10)}`;
    }
  }
  return formatted;
};

// Helper to calculate profile completion
const getProfileCompletion = (profile) => {
  if (!profile) return { percent: 0, missing: [] };
  // Define required fields for completion
  const requiredFields = [
    { key: "profilePicture", label: "Profile Picture" },
    { key: "fullName", label: "Full Name" },
    { key: "dateOfBirth", label: "Date of Birth" },
    { key: "gender", label: "Gender" },
    { key: "bio", label: "Bio" },
    { key: "ethnicBackground", label: "Ethnic Background" },
    { key: "addressLine1", label: "Address Line 1" },
    { key: "city", label: "City" },
    { key: "country", label: "Country" },
    { key: "zipCode", label: "Zip Code" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "languages", label: "Languages" },
    { key: "contentCategories", label: "Content Categories" },
    { key: "keywords", label: "Keywords" },
    { key: "isAvailableForCollaboration", label: "Collaboration Status" },
    { key: "influencerPreference", label: "Collaboration Preferences" },
    { key: "instagram", label: "Instagram Connected" },
    { key: "tiktok", label: "TikTok Connected" },
  ];
  let filled = 0;
  let missing = [];
  requiredFields.forEach((field) => {
    let value = profile[field.key];
    if (field.key === "phoneNumber") {
      value = value && value.number && value.code;
    }
    if (field.key === "country") {
      value = profile.country && profile.country.name;
    }
    if (field.key === "instagram") {
      value = profile.isInstagramConnected;
    }
    if (field.key === "tiktok") {
      value = profile.isTiktokConnected;
    }
    if (Array.isArray(value)) {
      if (value.length > 0) filled++;
      else missing.push(field.label);
    } else if (typeof value === "object" && value !== null) {
      if (Object.keys(value).length > 0) filled++;
      else missing.push(field.label);
    } else if (value) {
      filled++;
    } else {
      missing.push(field.label);
    }
  });
  const percent = Math.round((filled / requiredFields.length) * 100);
  return { percent, missing };
};

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
  // const createEditPayload = (profile) => {
  //   if (!profile) return null;

  //   // Parse phone number
  //   let phoneNumberObj = { number: "", code: "" };
  //   if (profile.phoneNumber) {
  //     // Handle when phoneNumber is an object from API
  //     if (
  //       typeof profile.phoneNumber === "object" &&
  //       profile.phoneNumber.code &&
  //       profile.phoneNumber.number
  //     ) {
  //       phoneNumberObj = {
  //         code: profile.phoneNumber.code,
  //         number: profile.phoneNumber.number,
  //       };
  //       setPhoneNumber(profile.phoneNumber.number);
  //       setCountryCode(profile.phoneNumber.code);
  //     }
  //     // Handle when phoneNumber is a string like "+254(070) 285-4204"
  //     else if (typeof profile.phoneNumber === "string") {
  //       // Extract country code (everything before the parenthesis)
  //       const codeMatch = profile.phoneNumber.match(/^(\+\d+)/);
  //       const code = codeMatch ? codeMatch[1] : "+1";

  //       // Extract the actual phone number (everything inside and after parentheses)
  //       const numberMatch = profile.phoneNumber.match(/\(([^)]+)\)\s*([\d-]+)/);
  //       const number = numberMatch
  //         ? `(${numberMatch[1]}) ${numberMatch[2]}`
  //         : profile.phoneNumber.replace(/^\+\d+\s*/, "");

  //       phoneNumberObj = { code, number };
  //       setPhoneNumber(number);
  //       setCountryCode(code);
  //     }
  //   }

  //   // Rest of the function remains the same...
  //   let dob = null;
  //   if (profile.dateOfBirth) {
  //     // Try to parse the date using moment
  //     const parsedDate = moment(profile.dateOfBirth);
  //     if (parsedDate.isValid()) {
  //       dob = parsedDate.toDate();
  //       setDateOfBirth(dob);
  //     }
  //   } else if (profile.age) {
  //     // Fallback to calculating from age
  //     dob = moment().subtract(profile.age, "years").toDate();
  //     setDateOfBirth(dob);
  //   }

  //   // Parse country
  //   let countryObj = {
  //     name: profile?.country.name || "",
  //     code: "", // You'll need to get this from somewhere
  //     flag: "", // You'll need to get this from somewhere
  //   };

  //   return {
  //     dateOfBirth: dateOfBirth,
  //     gender: profile.gender || "",
  //     bio: profile.bio || "",
  //     ethnicBackground: profile.ethnicBackground || [],
  //     addressLine1: profile.addressLine1 || "",
  //     addressLine2: profile.addressLine2 || "",
  //     city: profile.city || "",
  //     country: countryObj,
  //     zipCode: profile.zipCode || "",
  //     phoneNumber: phoneNumberObj,
  //     isAvailableForCollaboration: profile.isAvailableForCollaboration || false,
  //     languages: profile.languages || [],
  //     contentCategories: profile.contentCategories || [],
  //     keywords: profile.keywords || [],
  //     firstName: profile.fullName?.split(" ")[0] || "",
  //     lastName: profile.fullName?.split(" ").slice(-1)[0] || "",
  //     middleName:
  //       profile.fullName?.split(" ").length > 2
  //         ? profile.fullName?.split(" ").slice(1, -1).join(" ")
  //         : "",
  //     influencerPreference: profile.influencerPreference || {
  //       preferredBrands: [],
  //       preferredCollaborationContentFormat: [],
  //       preferredCompaniesType: [],
  //       preferredPaymentOption: [],
  //       preferredLeadTimeForProjectDays: 0,
  //       preferredPaidMinimumPay: "0",
  //       preferredPaidMaximumPay: "0",
  //     },
  //   };
  // };

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
  const fetchUpdateProfile = async () => {
    try {
      await dispatch(getInfluencerProfile(auth));
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const uploadPhoto = async (auth, payload) => {
    try {
      await editProfilePhoto(auth, payload);
      fetchInfluencerProfile();
      toast.success('Photo uploaded successfully')
    } catch (err) {}
  };

  useEffect(() => {
    fetchInfluencerProfile();
  }, []);

  const handleEdit = () => {
    if (influencerProfile) {
      // Map all fields from API to form fields
      const {
        dateOfBirth,
        gender,
        bio,
        ethnicBackground,
        addressLine1,
        addressLine2,
        city,
        country,
        zipCode,
        phoneNumber,
        isAvailableForCollaboration,
        languages,
        contentCategories,
        keywords,
        fullName,
        influencerPreference,
      } = influencerProfile;

      // Split fullName
      const nameParts = (fullName || "").split(" ");
      const firstName = nameParts[0] || "";
      const lastName =
        nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";
      const middleName =
        nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "";

      // Prepare form values
      const formValues = {
        dateOfBirth: dateOfBirth ? moment(dateOfBirth) : null,
        gender: gender || "",
        bio: bio || "",
        ethnicBackground: ethnicBackground || [],
        addressLine1: addressLine1 || "",
        addressLine2: addressLine2 || "",
        city: city || "",
        country: {
          name: country?.name || "",
          code: country?.code || "",
          flag: country?.flag || "",
        },
        zipCode: zipCode || "",
        countryCode: phoneNumber?.code || "",
        phoneNumber: phoneNumber.number || "",
        isAvailableForCollaboration:
          typeof isAvailableForCollaboration === "boolean"
            ? isAvailableForCollaboration
            : false,
        languages: languages || [],
        contentCategories: contentCategories || [],
        keywords: keywords || [],
        firstName,
        lastName,
        middleName,
        influencerPreference: {
          preferredBrands: influencerPreference?.preferredBrands || [],
          preferredCollaborationContentFormat:
            influencerPreference?.preferredCollaborationContentFormat || [],
          preferredCompaniesType:
            influencerPreference?.preferredCompaniesType || [],
          preferredPaymentOption:
            influencerPreference?.preferredPaymentOption || [],
          preferredLeadTimeForProjectDays:
            influencerPreference?.preferredLeadTimeForProjectDays || 0,
          preferredPaidMinimumPay:
            influencerPreference?.preferredPaidMinimumPay || "0",
          preferredPaidMaximumPay:
            influencerPreference?.preferredPaidMaximumPay || "0",
        },
      };

      form.setFieldsValue(formValues);
      setCountryCode(phoneNumber?.code || "");
      setPhoneNumber(phoneNumber?.number || "");
      setDateOfBirth(dateOfBirth ? moment(dateOfBirth).toDate() : null);
      setIsEditing(true);
    }
  };

  // Update the handleSave function
  const handleSave = async () => {
    const base = JSON.parse(JSON.stringify(influencerProfile));
    setSubmitting(true);
    try {
      const values = await form.validateFields();
      // Start with a deep clone of the API object

      // Overwrite with new form values
      // Handle name fields
      base.firstName = values.firstName ?? base.firstName ?? "";
      base.middleName = values.middleName ?? base.middleName ?? "";
      base.lastName = values.lastName ?? base.lastName ?? "";
      // Optionally update fullName
      base.fullName = [base.firstName, base.middleName, base.lastName]
        .filter(Boolean)
        .join(" ");

      // Handle dateOfBirth
      base.dateOfBirth = values.dateOfBirth
        ? moment(values.dateOfBirth).format("YYYY-MM-DD")
        : base.dateOfBirth ?? null;

      // Handle other direct fields
      base.gender = values.gender ?? base.gender ?? "";
      base.bio = values.bio ?? base.bio ?? "";
      base.ethnicBackground =
        values.ethnicBackground ?? base.ethnicBackground ?? [];
      base.addressLine1 = values.addressLine1 ?? base.addressLine1 ?? "";
      base.addressLine2 = values.addressLine2 ?? base.addressLine2 ?? "";
      base.city = values.city ?? base.city ?? "";
      base.zipCode = values.zipCode ?? base.zipCode ?? "";
      base.isAvailableForCollaboration =
        typeof values.isAvailableForCollaboration === "boolean"
          ? values.isAvailableForCollaboration
          : base.isAvailableForCollaboration ?? false;
      base.languages = values.languages ?? base.languages ?? [];
      base.contentCategories =
        values.contentCategories ?? base.contentCategories ?? [];
      base.keywords = values.keywords ?? base.keywords ?? [];

      // Handle nested country
      base.country = {
        name: values.country?.name ?? base.country?.name ?? "",
        code: values.country?.code ?? base.country?.code ?? "",
        flag: values.country?.flag ?? base.country?.flag ?? "",
      };

      // Handle nested phoneNumber
      base.phoneNumber = {
        number: values.phoneNumber ?? base.phoneNumber?.number ?? "",
        code: values.countryCode ?? base.phoneNumber?.code ?? "",
      };

      // Handle influencerPreference
      base.influencerPreference = {
        preferredBrands:
          values.influencerPreference?.preferredBrands ??
          base.influencerPreference?.preferredBrands ??
          [],
        preferredCollaborationContentFormat:
          values.influencerPreference?.preferredCollaborationContentFormat ??
          base.influencerPreference?.preferredCollaborationContentFormat ??
          [],
        preferredCompaniesType:
          values.influencerPreference?.preferredCompaniesType ??
          base.influencerPreference?.preferredCompaniesType ??
          [],
        preferredPaymentOption:
          values.influencerPreference?.preferredPaymentOption ??
          base.influencerPreference?.preferredPaymentOption ??
          [],
        preferredLeadTimeForProjectDays:
          values.influencerPreference?.preferredLeadTimeForProjectDays ??
          base.influencerPreference?.preferredLeadTimeForProjectDays ??
          0,
        preferredPaidMinimumPay:
          values.influencerPreference?.preferredPaidMinimumPay ??
          base.influencerPreference?.preferredPaidMinimumPay ??
          "0",
        preferredPaidMaximumPay:
          values.influencerPreference?.preferredPaidMaximumPay ??
          base.influencerPreference?.preferredPaidMaximumPay ??
          "0",
      };

      // Remove any fields you don't want to send (like id, email, etc.) if needed

      // Now send the payload
      const response = await updateInfluencerProfile(auth, base);
      if (response.status === 200) {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
        fetchUpdateProfile();
      }
    } catch (error) {
      console.error("Error updating profile:", error.errorFields[0].errors[0]);
      toast.error(error.errorFields[0].errors[0] || "Failed to update profile");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
    setFileList([]);
  };

  // Update the useEffect for phone number initialization
  useEffect(() => {
    if (influencerProfile?.phoneNumber) {
      let phoneData = influencerProfile.phoneNumber;

      // Handle when phoneNumber is a string (e.g. "+44(070) 285-4204")
      if (typeof phoneData === "string") {
        const match = phoneData.match(/^\+(\d+)\((.+)\)(.+)$/);
        if (match) {
          const countryCode = "+" + match[1];
          const number = `(${match[2]})${match[3]}`;
          setCountryCode(countryCode);
          setPhoneNumber(number);
          // Set initial form values
          form.setFieldValue("countryCode", countryCode);
          form.setFieldValue("phoneNumber", number);
        }
      }
      // Handle when phoneNumber is an object
      else if (
        typeof phoneData === "object" &&
        phoneData.code &&
        phoneData.number
      ) {
        setCountryCode(phoneData.code);
        setPhoneNumber(phoneData.number);
        // Set initial form values
        form.setFieldValue("countryCode", phoneData.code);
        form.setFieldValue("phoneNumber", phoneData.number);
      }
    }
  }, [influencerProfile, form]);

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

  const completion = getProfileCompletion(influencerProfile);
  let progressColor = "#f5222d";
  let progressText = "Let's get started! Complete your profile for better discovery.";
  if (completion.percent >= 80) {
    progressColor = "#52c41a";
    progressText = "Awesome! Your profile is almost complete. You're more likely to get collaborations.";
  } else if (completion.percent >= 60) {
    progressColor = "#faad14";
    progressText = "Great progress! Complete a few more sections for better results.";
  } else if (completion.percent >= 40) {
    progressColor = "#1890ff";
    progressText = "Keep going! The more complete your profile, the more you'll be discovered.";
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex flex-col items-center justify-center p-4 bg-white/80 rounded-lg shadow border border-primary/10">
          <div className="w-full flex items-center gap-4">
            <Progress
              percent={completion.percent}
              showInfo={false}
              strokeColor={progressColor}
              trailColor="#f0f0f0"
              style={{ flex: 1 }}
              size="default"
            />
            <span className="font-semibold text-lg" style={{ color: progressColor }}>{completion.percent}%</span>
          </div>
          <div className="mt-2 text-sm text-gray-700 text-center font-medium">{progressText}</div>
          {completion.percent < 100 && (
            <div className="mt-1 text-xs text-gray text-center">Missing: {completion.missing.join(", ")}</div>
          )}
        </div>
      </div>
      {loading ? (
        <Skeleton active paragraph={{ rows: 15 }} />
      ) : (
        <>
          {isEditing ? (
            <Card
              className="mb-6 shadow-sm"
              title={
                <div className="flex items-center gap-2">
                  <FiEdit className="text-primary" />
                  <span className="text-xl font-semibold">Edit Profile</span>
                </div>
              }
              extra={
                <Space>
                  <button
                    type="button"
                    className="px-6 py-2 border border-input rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors duration-200"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={submitting}
                    className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4"
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
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Saving Changes...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Save Changes
                        <FiCheck />
                      </span>
                    )}
                  </button>
                </Space>
              }
            >
              <div className="flex justify-center mb-8">
                <ImageUploadInline
                  initialImage={
                    fileList[0]?.url || influencerProfile.profilePicture
                  }
                  buttonLabel="Upload Profile Picture"
                  shape="circle"
                  onUploadSuccess={(url) => {
                    form.setFieldValue("profilePicture", url);
                    setFileList([{ url }]);
                  }}
                  onUpload={async (file) => {
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append("file_section", "profilePicture");
                    const res = await uploadPhoto(auth, formData);
                    if (res && res.status === 200 && res.data && res.data.url) {
                      return res.data.url;
                    } else {
                      throw new Error("Failed to upload profile picture");
                    }
                  }}
                />
              </div>

              <Form
                form={form}
                layout="vertical"
                onFinish={handleSave}
                className="max-w-5xl mx-auto"
                requiredMark={false}
              >
                <Tabs
                  defaultActiveKey="personal"
                  className="profile-edit-tabs"
                  items={[
                    {
                      key: "personal",
                      label: (
                        <span className="flex items-center gap-2">
                          <FiUser className="w-4 h-4" />
                          Personal Information
                        </span>
                      ),
                      children: (
                        <div className="bg-gray-50/50 p-6 rounded-xl border border-input">
                          <Row gutter={24}>
                            <Col xs={24} md={8}>
                              <Form.Item
                                label="First Name"
                                name="firstName"
                                rules={[{ required: true }]}
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
                              <Form.Item
                                label="Date of Birth"
                                name="dateOfBirth"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please select your date of birth!",
                                  },
                                ]}
                              >
                                <DatePicker
                                  className="w-full"
                                  placeholder="Select date of birth"
                                  value={dateOfBirth ? dayjs(dateOfBirth) : null}
                                  onChange={(date, dateString) => {
                                    setDateOfBirth(date ? date.toDate() : null);
                                    form.setFieldValue("dateOfBirth", dateString);
                                  }}
                                  format="YYYY-MM-DD"
                                  disabledDate={(current) => current && current > dayjs().endOf("day")}
                                />
                                {dateOfBirth && (
                                  <div className="text-xs text-primary mt-1">
                                    Age: {dayjs().diff(dayjs(dateOfBirth), "years")} years old
                                  </div>
                                )}
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
                                  {
                                    required: true,
                                    message: "Please input your bio",
                                  },
                                ]}
                              >
                                <Input.TextArea rows={4} />
                              </Form.Item>
                            </Col>
                          </Row>
                        </div>
                      ),
                    },
                    {
                      key: "contact",
                      label: (
                        <span className="flex items-center gap-2">
                          <FiPhone className="w-4 h-4" />
                          Contact Information
                        </span>
                      ),
                      children: (
                        <div className="bg-gray-50/50 p-6 rounded-xl border border-input">
                          <Row gutter={24}>
                            <Col xs={24} md={12}>
                              <Form.Item
                                label="Phone Number"
                                required
                                className="mb-6"
                              >
                                <div className="space-y-2">
                                  <Form.Item
                                    name="countryCode"
                                    noStyle
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please select country code!",
                                      },
                                    ]}
                                  >
                                    <Select
                                      style={{ width: "100%" }}
                                      options={countryOptions}
                                      onChange={(value) =>
                                        setCountryCode(value)
                                      }
                                      placeholder="Select country"
                                      showSearch
                                      filterOption={(input, option) =>
                                        option?.label
                                          .toLowerCase()
                                          .includes(input.toLowerCase())
                                      }
                                    />
                                  </Form.Item>

                                  <Form.Item
                                    name="phoneNumber"
                                    noStyle
                                    // rules={[
                                    //   { required: true, message: 'Please input your phone number!' },
                                    //   {
                                    //     pattern: /^\d{3}\s\d{3}\s\d{4}$/,
                                    //     message: 'Please enter a valid phone number'
                                    //   }
                                    // ]}
                                  >
                                    <Input
                                      prefix={
                                        <FiPhone className="text-gray-400" />
                                      }
                                      placeholder="123 456 7890"
                                      className="w-full"
                                      onChange={(e) => {
                                        const formatted = formatPhoneNumber(
                                          e.target.value
                                        );
                                        setPhoneNumber(e.target.value);
                                        form.setFieldValue(
                                          "phoneNumber",
                                          formatted
                                        );
                                      }}
                                      maxLength={12}
                                    />
                                  </Form.Item>

                                  {phoneNumber && (
                                    <div className="text-xs text-primary">
                                      Your phone number:{" "}
                                      <span className="font-medium">
                                        {phoneNumber}
                                      </span>
                                    </div>
                                  )}
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
                                  <Option value="United States">
                                    United States
                                  </Option>
                                  <Option value="United Kingdom">
                                    United Kingdom
                                  </Option>
                                </Select>
                              </Form.Item>
                              <Form.Item
                                name={["country", "code"]}
                                noStyle
                                hidden
                              >
                                <Input />
                              </Form.Item>
                              <Form.Item
                                name={["country", "flag"]}
                                noStyle
                                hidden
                              >
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
                                <Input
                                  prefix={
                                    <FiMapPin className="text-gray-400" />
                                  }
                                />
                              </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                              <Form.Item
                                label="Address Line 2"
                                name="addressLine2"
                              >
                                <Input />
                              </Form.Item>
                            </Col>
                            <Col xs={24} md={8}>
                              <Form.Item
                                label="City"
                                name="city"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your city",
                                  },
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
                          </Row>
                        </div>
                      ),
                    },
                    {
                      key: "professional",
                      label: (
                        <span className="flex items-center gap-2">
                          <FiBriefcase className="w-4 h-4" />
                          Professional Details
                        </span>
                      ),
                      children: (
                        <div className="bg-gray-50/50 p-6 rounded-xl border border-input">
                          <Row gutter={24}>
                            <Col span={24}>
                              <Form.Item
                                label="Ethnic Background"
                                name="ethnicBackground"
                              >
                                <Select mode="tags" tokenSeparators={[',']} placeholder="Select or type to add">
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
                                <Select mode="tags" tokenSeparators={[',']} placeholder="Select or type to add">
                                  <Option value="English">English</Option>
                                  <Option value="French">French</Option>
                                  <Option value="German">German</Option>
                                  <Option value="Russian">Russian</Option>
                                  <Option value="Chinese">Chinese</Option>
                                  <Option value="Korean">Korean</Option>
                                  <Option value="Spanish">Spanish</Option>
                                  <Option value="Swahili">Swahili</Option>
                                  <Option value="Arabic">Arabic</Option>
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col span={24}>
                              <Form.Item
                                label="Content Categories"
                                name="contentCategories"
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      "Please select at least one category",
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
                          </Row>
                        </div>
                      ),
                    },
                    {
                      key: "preferences",
                      label: (
                        <span className="flex items-center gap-2">
                          <FiSettings className="w-4 h-4" />
                          Collaboration Preferences
                        </span>
                      ),
                      children: (
                        <div className="bg-gray-50/50 p-6 rounded-xl border border-input">
                          <Row gutter={24}>
                            <Col xs={24} md={12}>
                              <Form.Item
                                label="Preferred Brands"
                                name={[
                                  "influencerPreference",
                                  "preferredBrands",
                                ]}
                              >
                                <Select mode="multiple">
                                  <Option value="Technology">Technology</Option>
                                  <Option value="Fitness Equipment">
                                    Fitness Equipment
                                  </Option>
                                  <Option value="Travel Gear">
                                    Travel Gear
                                  </Option>
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
                                name={[
                                  "influencerPreference",
                                  "preferredPaidMinimumPay",
                                ]}
                              >
                                <Input type="number" />
                              </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                              <Form.Item
                                label="Maximum Pay ($)"
                                name={[
                                  "influencerPreference",
                                  "preferredPaidMaximumPay",
                                ]}
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
                                name={[
                                  "influencerPreference",
                                  "preferredPaymentOption",
                                ]}
                              >
                                <Select mode="multiple">
                                  <Option value="Bank Transfer">
                                    Bank Transfer
                                  </Option>
                                  <Option value="PayPal">PayPal</Option>
                                  <Option value="Cash">Cash</Option>
                                  <Option value="Crypto">Crypto</Option>
                                </Select>
                              </Form.Item>
                            </Col>
                          </Row>
                        </div>
                      ),
                    },
                  ]}
                />
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
                      icon={<FiEdit />}
                      onClick={handleEdit}
                      className="mt-4"
                    >
                      Edit Profile
                    </Button>
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0 text-center sm:text-left">
                      <div className="flex flex-col items-center sm:items-start w-full sm:w-auto">
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
                        className="mt-2 sm:mt-0"
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
                            <FiMail className="mr-2" />
                            <Text>{influencerProfile.email}</Text>
                          </div>
                          <div className="flex items-center">
                            <FiPhone className="mr-2" />
                            <Text>
                              {influencerProfile.phoneNumber.code}{" "}
                              {influencerProfile.phoneNumber.number}
                            </Text>
                          </div>
                          <div className="flex items-center">
                            <FiMapPin className="mr-2" />
                            <Text>
                              {influencerProfile.addressLine1},{" "}
                              {influencerProfile.addressLine2}
                              <br />
                              {influencerProfile.city},{" "}
                              {influencerProfile?.country?.name}{" "}
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
                          src={influencerProfile.tiktok?.avatarUrl}
                          className="mr-4"
                        />
                        <div>
                          <Text strong>
                            @{influencerProfile.tiktok?.username}
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
                          icon={<FaFacebook />}
                          className="mr-4 bg-blue-500 flex items-center justify-center"
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

<style jsx global>{`
  .profile-edit-tabs {
    .ant-tabs-nav {
      margin-bottom: 1.5rem;
      position: sticky;
      top: 0;
      background: white;
      z-index: 10;
      padding: 1rem 0;
      border-bottom: 1px solid #f0f0f0;
    }
    .ant-tabs-tab {
      padding: 12px 24px;
      margin: 0 8px;
      border-radius: 8px;
      transition: all 0.3s ease;

      &:hover {
        color: var(--primary-color);
        background: rgba(var(--primary-rgb), 0.05);
      }

      &.ant-tabs-tab-active {
        background: rgba(var(--primary-rgb), 0.1);
        .ant-tabs-tab-btn {
          color: var(--primary-color);
        }
      }
    }
    .ant-tabs-ink-bar {
      background: linear-gradient(
        to right,
        var(--primary-color),
        var(--secondary-color)
      );
      height: 3px;
      border-radius: 3px;
    }
  }
`}</style>;
