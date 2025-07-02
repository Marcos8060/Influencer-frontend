"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getAllCampaigns } from "@/redux/features/stepper/campaign-stepper";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import { useAuth } from "@/assets/hooks/use-auth";
import { applyCampaign } from "@/redux/services/campaign";
import toast from "react-hot-toast";
import { 
  FaUsers, 
  FaBoxOpen, 
  FaFilter, 
  FaTimes,
  FaCalendarAlt,
  FaClock,
  FaVideo,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaEye,
  FaPlay,
  FaStar,
  FaMapMarkerAlt
} from "react-icons/fa";
import { AiOutlineShopping, AiOutlineClear } from "react-icons/ai";
import { MdCampaign, MdOutlineCategory } from "react-icons/md";
import { BiTime } from "react-icons/bi";
import AppliedCampaignsTable from "@/app/Components/Influencer/Applied-Campaigns";
import ApprovedCampaignsTable from "@/app/Components/Influencer/Approved-Campaigns";
import { useProtectedRoute } from "@/assets/hooks/authGuard";
import { motion, AnimatePresence } from "framer-motion";
import { Input, Select, Button, Tag, Checkbox, Space, Typography } from "antd";
import { SearchOutlined, FilterOutlined, ClearOutlined } from "@ant-design/icons";

const { Text } = Typography;

const Campaigns = () => {
  const { allCampaigns } = useSelector((store) => store.campaign);
  const dispatch = useDispatch();
  const auth = useAuth();

  console.log("Campaigns ",allCampaigns)

  const [loading, setLoading] = useState(true);
  const [applyLoading, setApplyLoading] = useState(false);
  const [applied, setApplied] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [currentTab, setCurrentTab] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    videoStyle: [],
    socialChannels: [],
    videoDuration: [],
    showFace: null,
    videoFormat: [],
    status: "Live"
  });

  const isAuthorized = useProtectedRoute();

  // Filter options
  const videoStyleOptions = ["Up to the creator", "How To", "Testimonials", "Unboxing", "Review", "Tutorial"];
  const socialChannelsOptions = ["Instagram Posts", "Tiktok Posts", "YouTube Videos", "Facebook Posts"];
  const videoDurationOptions = ["15s", "30s", "60s", "90s", "120s+"];
  const videoFormatOptions = ["vertical", "horizontal", "square"];

  useEffect(() => {
    if (auth) {
      fetchAllCampaigns();
    }
  }, [auth]);

  useEffect(() => {
    if (!selectedCampaign && filteredCampaigns.length > 0) {
      setSelectedCampaign(filteredCampaigns[0]);
    }
  }, [allCampaigns, filters]);

  const fetchAllCampaigns = async () => {
    try {
      setLoading(true);
      await dispatch(getAllCampaigns(auth));
    } catch (error) {
      toast.error("Failed to fetch campaigns");
    } finally {
      setLoading(false);
    }
  };

  // Filter campaigns based on active filters
  const filteredCampaigns = allCampaigns.filter(campaign => {
    // Search filter
    if (filters.search && !campaign.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !campaign.description.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    // Video style filter
    if (filters.videoStyle.length > 0 && !filters.videoStyle.some(style => 
      campaign.preferences.videoStyle.includes(style))) {
      return false;
    }

    // Social channels filter
    if (filters.socialChannels.length > 0 && !filters.socialChannels.some(channel => 
      campaign.preferences.socialChannels.includes(channel))) {
      return false;
    }

    // Video duration filter
    if (filters.videoDuration.length > 0 && !filters.videoDuration.includes(`${campaign.preferences.videoDuration}s`)) {
      return false;
    }

    // Show face filter
    if (filters.showFace !== null && campaign.preferences.showFace !== filters.showFace) {
      return false;
    }

    // Video format filter
    if (filters.videoFormat.length > 0 && !filters.videoFormat.includes(campaign.preferences.videoFormat)) {
      return false;
    }

    return true;
  });

  const handleApply = async (id) => {
    try {
      setApplyLoading(true);
      const response = await applyCampaign(auth, id);
      if (response.status === 200) {
        toast.success("Application sent successfully!");
        setApplied(true);
        fetchAllCampaigns();
      } else {
        toast.error(response.response.data.errorMessage[0]);
      }
    } catch (error) {
      toast.error("Application failed");
    } finally {
      setApplyLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilter = (key) => {
    setFilters(prev => ({ ...prev, [key]: Array.isArray(prev[key]) ? [] : null }));
  };

  const clearAllFilters = () => {
    setFilters({
      search: "",
      videoStyle: [],
      socialChannels: [],
      videoDuration: [],
      showFace: null,
      videoFormat: [],
      status: "Live"
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.videoStyle.length > 0) count++;
    if (filters.socialChannels.length > 0) count++;
    if (filters.videoDuration.length > 0) count++;
    if (filters.showFace !== null) count++;
    if (filters.videoFormat.length > 0) count++;
    return count;
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "Instagram Posts":
        return <FaInstagram className="text-pink-500" />;
      case "Tiktok Posts":
        return <FaTiktok className="text-black" />;
      case "YouTube Videos":
        return <FaYoutube className="text-red-500" />;
      case "Facebook Posts":
        return <FaInstagram className="text-blue-500" />;
      default:
        return <FaInstagram />;
    }
  };

  const renderTab = (tabId, Icon, label) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setCurrentTab(tabId)}
      className={`cursor-pointer flex items-center gap-3 px-6 py-3 rounded-xl transition-all ${
        currentTab === tabId
          ? "bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-lg"
          : "text-gray-500 hover:text-primary hover:bg-gray-50"
      }`}
    >
      {Icon ? <Icon className="text-xl" /> : null}
      <span className="text-sm md:text-base">{label}</span>
    </motion.div>
  );

  if (!isAuthorized) return null;

  return (
    <div className="p-4 md:p-6 lg:p-8 mx-auto text-color">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-color to-secondary text-transparent bg-clip-text">
          Campaign Dashboard
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          {currentTab === 1
            ? "Discover and apply to exciting campaigns"
            : currentTab === 2
            ? "Track your campaign applications"
            : "View your approved campaigns"}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto pb-1 scrollbar-hide mb-6">
        <div className="flex border-b border-input space-x-2">
          {renderTab(1, FaUsers, "All Campaigns")}
          {renderTab(2, AiOutlineShopping, "Applied Campaigns")}
          {renderTab(3, MdCampaign, "Approved Campaigns")}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="mt-6"
        >
          {currentTab === 1 && (
            <>
              {/* Filters Section */}
              <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <FilterOutlined className="text-primary text-xl" />
                    <Text strong className="text-lg">Filters</Text>
                    {getActiveFiltersCount() > 0 && (
                      <Tag color="primary" className="text-xs">
                        {getActiveFiltersCount()}
                      </Tag>
                    )}
                  </div>
                  {getActiveFiltersCount() > 0 && (
                    <Button
                      type="text"
                      icon={<ClearOutlined />}
                      onClick={clearAllFilters}
                      size="small"
                    >
                      Clear All
                    </Button>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Search */}
                  <div>
                    <Text strong className="block mb-2">Search</Text>
                    <Input
                      placeholder="Search campaigns..."
                      value={filters.search}
                      onChange={(e) => handleFilterChange("search", e.target.value)}
                      prefix={<SearchOutlined />}
                      allowClear
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Video Style */}
                    <div>
                      <Text strong className="block mb-2">Video Style</Text>
                      <Select
                        mode="multiple"
                        value={filters.videoStyle}
                        onChange={(values) => handleFilterChange("videoStyle", values)}
                        style={{ width: '100%' }}
                        placeholder="Select video style"
                        allowClear
                        options={videoStyleOptions.map(style => ({
                          label: style,
                          value: style
                        }))}
                      />
                    </div>

                    {/* Social Channels */}
                    <div>
                      <Text strong className="block mb-2">Platforms</Text>
                      <Select
                        mode="multiple"
                        value={filters.socialChannels}
                        onChange={(values) => handleFilterChange("socialChannels", values)}
                        style={{ width: '100%' }}
                        placeholder="Select platforms"
                        allowClear
                        options={socialChannelsOptions.map(channel => ({
                          label: channel,
                          value: channel
                        }))}
                      />
                    </div>

                    {/* Video Duration */}
                    <div>
                      <Text strong className="block mb-2">Duration</Text>
                      <Select
                        mode="multiple"
                        value={filters.videoDuration}
                        onChange={(values) => handleFilterChange("videoDuration", values)}
                        style={{ width: '100%' }}
                        placeholder="Select duration"
                        allowClear
                        options={videoDurationOptions.map(duration => ({
                          label: duration,
                          value: duration
                        }))}
                      />
                    </div>

                    {/* Show Face */}
                    <div>
                      <Text strong className="block mb-2">Show Face</Text>
                      <Select
                        value={filters.showFace === null ? undefined : filters.showFace}
                        onChange={(value) => handleFilterChange("showFace", value)}
                        style={{ width: '100%' }}
                        placeholder="Select show face"
                        allowClear
                        options={[
                          { label: "Required", value: true },
                          { label: "Not Required", value: false }
                        ]}
                      />
                    </div>
                  </div>

                  {/* Active Filters */}
                  {getActiveFiltersCount() > 0 && (
                    <div className="pt-4 border-t border-input">
                      <Text strong className="block mb-3">Active Filters:</Text>
                      <Space wrap>
                        {filters.search && (
                          <Tag
                            closable
                            onClose={() => clearFilter("search")}
                            color="blue"
                          >
                            Search: {filters.search}
                          </Tag>
                        )}
                        {filters.videoStyle.map(style => (
                          <Tag
                            key={style}
                            closable
                            onClose={() => {
                              const newStyles = filters.videoStyle.filter(s => s !== style);
                              handleFilterChange("videoStyle", newStyles);
                            }}
                            color="green"
                          >
                            Style: {style}
                          </Tag>
                        ))}
                        {filters.socialChannels.map(channel => (
                          <Tag
                            key={channel}
                            closable
                            onClose={() => {
                              const newChannels = filters.socialChannels.filter(c => c !== channel);
                              handleFilterChange("socialChannels", newChannels);
                            }}
                            color="purple"
                          >
                            {channel}
                          </Tag>
                        ))}
                        {filters.videoDuration.map(duration => (
                          <Tag
                            key={duration}
                            closable
                            onClose={() => {
                              const newDurations = filters.videoDuration.filter(d => d !== duration);
                              handleFilterChange("videoDuration", newDurations);
                            }}
                            color="orange"
                          >
                            {duration}
                          </Tag>
                        ))}
                        {filters.showFace !== null && (
                          <Tag
                            closable
                            onClose={() => clearFilter("showFace")}
                            color={filters.showFace ? "green" : "red"}
                          >
                            Face: {filters.showFace ? "Required" : "Not Required"}
                          </Tag>
                        )}
                      </Space>
                    </div>
                  )}
                </div>
              </div>

              {filteredCampaigns.length === 0 && !loading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-[60vh] flex flex-col items-center justify-center text-center text-gray-400 space-y-4"
                >
                  <FaBoxOpen className="text-7xl opacity-60" />
                  <p className="text-lg font-light">No Campaigns Found</p>
                  <p className="text-sm max-w-md">
                    {getActiveFiltersCount() > 0 
                      ? "Try adjusting your filters to see more campaigns."
                      : "Check back later for new campaign opportunities."
                    }
                  </p>
                  {getActiveFiltersCount() > 0 && (
                    <Button
                      type="primary"
                      onClick={clearAllFilters}
                      className="bg-gradient-to-r from-primary to-secondary"
                    >
                      Clear All Filters
                    </Button>
                  )}
                </motion.div>
              ) : (
                <div className="md:flex gap-6">
                  {/* Campaign List */}
                  <div className="md:w-5/12 space-y-4 overflow-auto max-h-[80vh] pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {loading ? (
                      Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton key={index} height={120} className="rounded-xl mb-3" />
                      ))
                    ) : (
                      filteredCampaigns.map((campaign) => (
                        <motion.div
                          key={campaign.id}
                          onClick={() => {
                            setSelectedCampaign(campaign);
                            setApplied(false);
                          }}
                          className={`cursor-pointer p-4 rounded-xl shadow-sm transition-all border ${
                            selectedCampaign?.id === campaign.id
                              ? "border-2 border-primary bg-gradient-to-r from-primary/5 to-white shadow-lg"
                              : "border-input hover:border-primary/30 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex gap-3">
                            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={campaign.coverImageUrl}
                                alt={campaign.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = "/placeholder-campaign.jpg";
                                }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 line-clamp-1">
                                {campaign.title}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                {campaign.description}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                                  {campaign.preferences.videosPerCreator} videos
                                </span>
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                  {campaign.preferences.videoDuration}s
                                </span>
                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                  {campaign.preferences.videoFormat}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>

                  {/* Campaign Details */}
                  <div className="md:w-7/12 mt-6 md:mt-0">
                    {applied ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-[60vh] flex items-center justify-center bg-white rounded-2xl shadow-sm p-6 text-center border border-input"
                      >
                        <div className="space-y-4 max-w-md mx-auto">
                          <div className="relative">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <IoMdCheckmark className="w-12 h-12 text-green-500" />
                            </div>
                          </div>
                          <h2 className="text-2xl font-semibold text-gray-800">
                            Application Sent!
                          </h2>
                          <p className="text-gray-500">
                            Your application is now pending approval. You'll receive a notification
                            once it's reviewed.
                          </p>
                          <button
                            onClick={() => setApplied(false)}
                            className="mt-4 bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            Back to Campaign
                          </button>
                        </div>
                      </motion.div>
                    ) : selectedCampaign ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white rounded-2xl shadow-sm p-6 space-y-6 border border-input"
                      >
                        {/* Campaign Header */}
                        <div className="space-y-4">
                          <div className="relative rounded-xl overflow-hidden bg-gray-100 aspect-video">
                            <img
                              src={selectedCampaign.coverImageUrl}
                              alt="Campaign cover"
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                              <h1 className="text-2xl font-bold text-white mb-2">
                                {selectedCampaign.title}
                              </h1>
                              <div className="flex flex-wrap gap-2">
                                <span className="bg-primary text-white text-xs px-3 py-1 rounded-full">
                                  {selectedCampaign.preferences.videosPerCreator} videos
                                </span>
                                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">
                                  {selectedCampaign.preferences.videoDuration}s duration
                                </span>
                                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">
                                  {selectedCampaign.preferences.videoFormat}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Campaign Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Description */}
                          <div className="md:col-span-2">
                            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                              <FaEye className="text-primary" />
                              Campaign Description
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                              {selectedCampaign.description}
                            </p>
                          </div>

                          {/* Timeline */}
                          <div className="bg-gray-50 p-4 rounded-xl">
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <FaCalendarAlt className="text-primary" />
                              Timeline
                            </h4>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-500">Start:</span>
                                <span className="font-medium">{selectedCampaign.startDate}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">End:</span>
                                <span className="font-medium">{selectedCampaign.endDate}</span>
                              </div>
                            </div>
                          </div>

                          {/* Requirements */}
                          <div className="bg-gray-50 p-4 rounded-xl">
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <FaVideo className="text-primary" />
                              Requirements
                            </h4>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-500">Show Face:</span>
                                <span className="font-medium">
                                  {selectedCampaign.preferences.showFace ? "Required" : "Not Required"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Format:</span>
                                <span className="font-medium capitalize">
                                  {selectedCampaign.preferences.videoFormat}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Social Channels & Video Styles */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gray-50 p-4 rounded-xl">
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <FaInstagram className="text-primary" />
                              Platforms
                            </h4>
                            <div className="space-y-2">
                              {selectedCampaign.preferences.socialChannels.map((channel, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm">
                                  {getPlatformIcon(channel)}
                                  <span>{channel}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="bg-gray-50 p-4 rounded-xl">
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <MdOutlineCategory className="text-primary" />
                              Video Styles
                            </h4>
                            <div className="space-y-2">
                              {selectedCampaign.preferences.videoStyle.map((style, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm">
                                  <IoMdCheckmark className="text-green-500" />
                                  <span>{style}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Example Video */}
                        {selectedCampaign.exampleVideoUrl && (
                          <div className="bg-gray-50 p-4 rounded-xl">
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <FaPlay className="text-primary" />
                              Example Video
                            </h4>
                            <a
                              href={selectedCampaign.exampleVideoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
                            >
                              <FaPlay className="text-sm" />
                              Watch example video
                            </a>
                          </div>
                        )}

                        {/* Products */}
                        {selectedCampaign.products && selectedCampaign.products.length > 0 && (
                          <div className="bg-gray-50 p-4 rounded-xl">
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <FaBoxOpen className="text-primary" />
                              Featured Products
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {selectedCampaign.products.map((product) => (
                                <div key={product.id} className="bg-white p-3 rounded-lg">
                                  <div className="flex gap-3">
                                    <img
                                      src={product.productImages[0]?.url}
                                      alt={product.name}
                                      className="w-12 h-12 rounded-lg object-cover"
                                    />
                                    <div className="flex-1">
                                      <h5 className="font-medium text-sm">{product.name}</h5>
                                      <p className="text-xs text-gray-500">${product.price}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Apply Button */}
                        <div className="flex justify-end pt-4 border-t border-input">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleApply(selectedCampaign.id)}
                            disabled={applyLoading}
                            className={`px-8 py-3 rounded-xl font-medium text-white transition-all ${
                              applyLoading
                                ? "bg-primary/70 cursor-not-allowed"
                                : "bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark shadow-lg"
                            }`}
                          >
                            {applyLoading ? (
                              <div className="flex items-center">
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
                                Processing...
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <FaStar />
                                Apply to Campaign
                              </div>
                            )}
                          </motion.button>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="bg-white rounded-2xl shadow-sm p-6 border border-input">
                        <Skeleton height={400} className="rounded-lg" />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {currentTab === 2 && <AppliedCampaignsTable />}
          {currentTab === 3 && <ApprovedCampaignsTable />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Campaigns;