"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  Input,
  Button,
  Badge,
  Skeleton,
  Pagination,
  Tooltip,
  Tag,
  Tabs,
  Badge as AntBadge,
  Modal,
  message,
} from "antd";
import { FiEye } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { useAuth } from "@/assets/hooks/use-auth";
import { fetchAllBrandCampaigns } from "@/redux/features/stepper/campaign-stepper";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { publishDraft } from "@/redux/services/campaign";
import toast from "react-hot-toast";
import AuthGuard from "@/assets/hooks/authGuard";

const { Search } = Input;

const CampaignsTable = () => {
  const { brandCampaigns } = useSelector((store) => store.campaign);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sorter, setSorter] = useState({});
  const [activeTab, setActiveTab] = useState("active");
  const itemsPerPage = 8;
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useAuth();
  const [publishingId, setPublishingId] = useState(null);
  const [publishModal, setPublishModal] = useState({
    visible: false,
    campaign: null,
  });

  useEffect(() => {
    if (auth) {
      fetchCampaigns();
    }
  }, [auth]);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      await dispatch(fetchAllBrandCampaigns(auth));
    } catch (error) {
      console.error("Failed to fetch campaigns:", error);
    } finally {
      setLoading(false);
    }
  };

  // Split campaigns by status and draft
  const activeCampaigns = useMemo(
    () =>
      brandCampaigns.filter(
        (c) => !c.isDraft && String(c.status).toLowerCase() === "live"
      ),
    [brandCampaigns]
  );
  const upcomingCampaigns = useMemo(
    () =>
      brandCampaigns.filter(
        (c) => !c.isDraft && String(c.status).toLowerCase() === "upcoming"
      ),
    [brandCampaigns]
  );
  const finishedCampaigns = useMemo(
    () =>
      brandCampaigns.filter(
        (c) => !c.isDraft && String(c.status).toLowerCase() === "finished"
      ),
    [brandCampaigns]
  );
  const draftCampaigns = useMemo(
    () => brandCampaigns.filter((c) => c.isDraft),
    [brandCampaigns]
  );

  // Filter and sort for the current tab
  const getProcessedCampaigns = (campaigns) => {
    let filtered = [...campaigns];
    if (searchTerm) {
      filtered = filtered.filter(
        (campaign) =>
          campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sorter && sorter.field) {
      filtered.sort((a, b) => {
        if (a[sorter.field] < b[sorter.field])
          return sorter.order === "ascend" ? -1 : 1;
        if (a[sorter.field] > b[sorter.field])
          return sorter.order === "ascend" ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  };

  const processedActive = useMemo(
    () => getProcessedCampaigns(activeCampaigns),
    [activeCampaigns, searchTerm, sorter]
  );
  const processedUpcoming = useMemo(
    () => getProcessedCampaigns(upcomingCampaigns),
    [upcomingCampaigns, searchTerm, sorter]
  );
  const processedFinished = useMemo(
    () => getProcessedCampaigns(finishedCampaigns),
    [finishedCampaigns, searchTerm, sorter]
  );
  const processedDrafts = useMemo(
    () => getProcessedCampaigns(draftCampaigns),
    [draftCampaigns, searchTerm, sorter]
  );

  const tabData = {
    active: processedActive,
    upcoming: processedUpcoming,
    finished: processedFinished,
    drafts: processedDrafts,
  };

  const currentData = tabData[activeTab].slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status) => {
    const lowerStatus = status?.toLowerCase();
    if (lowerStatus === "live") {
      return (
        <span className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-green shadow-green-glow animate-ping border-2 border-white"></span>
          <span className="text-green font-semibold">Live</span>
        </span>
      );
    }
    if (lowerStatus === "upcoming") {
      return (
        <span className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-blue-500 shadow-blue-glow animate-ping border-2 border-white"></span>
          <span className="text-blue-700 font-semibold">Upcoming</span>
        </span>
      );
    }
    if (lowerStatus === "finished") {
      return (
        <span className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-yellow shadow-yellow-400/40 animate-ping slow-ping border-2 border-white"></span>
          <span className="text-yellow font-semibold">Finished</span>
        </span>
      );
    }
    const colors = {
      active: "green",
      pending: "gold",
      completed: "blue",
      draft: "default",
      rejected: "red",
    };
    return (
      <Tag color={colors[lowerStatus] || "default"} className="capitalize">
        {status || "Unknown"}
      </Tag>
    );
  };

  // Handler to publish a draft campaign
  const handlePublishDraft = async (campaign) => {
    setPublishingId(campaign.id);
    try {
      // Call the API to publish (set isDraft to false)
      const payload = { ...campaign, isDraft: false };
      const response = await publishDraft(auth, payload);
      if (response.status === 200) {
        toast.success("Campaign published successfully!");
        setPublishModal({ visible: false, campaign: null });
        fetchCampaigns();
      } else {
        toast.error(
          response.response?.data?.errorMessage?.[0] ||
            "Failed to publish campaign."
        );
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.errorMessage?.[0] ||
          "Failed to publish campaign."
      );
    } finally {
      setPublishingId(null);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      sorter: true,
      render: (text) => (
        <span className="font-semibold text-color">{text}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: true,
      render: (status) => getStatusBadge(status),
    },
    {
      title: "Applications",
      dataIndex: "numberOfInfluencers",
      sorter: true,
      render: (num) => num || 0,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      sorter: true,
      render: (date) => format(new Date(date), "MMM d, yyyy"),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      sorter: true,
      render: (date) => format(new Date(date), "MMM d, yyyy"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <>
          <Button
            type="link"
            icon={<FiEye />}
            onClick={() => router.push(`/brand/campaign-report/${record.id}`)}
            className="text-primary font-semibold hover:underline"
          >
            View
          </Button>
          {activeTab === "drafts" && (
            <button
              className="bg-gradient-to-r from-primary to-secondary px-3 py-2 rounded-xl text-white text-xs"
              onClick={() =>
                setPublishModal({ visible: true, campaign: record })
              }
              style={{ marginLeft: 8 }}
            >
              Publish
            </button>
          )}
        </>
      ),
    },
  ];

  return (
    <AuthGuard>
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-primary mb-1">
              Campaigns
            </h2>
            <p className="text-color text-base">
              {brandCampaigns.length} campaigns found
            </p>
          </div>
          <Search
            placeholder="Search campaigns by title or description"
            onChange={(e) => setSearchTerm(e.target.value)}
            allowClear
            prefix={<FiSearch className="text-primary text-lg" />}
            style={{
              width: 340,
              fontSize: 16,
              borderRadius: 9999,
              background: "#f5f7f7",
              border: "1.5px solid #D1D5DB",
              boxShadow: "0 2px 8px 0 rgba(54,128,161,0.04)",
            }}
            className="rounded-full focus:ring-2 focus:ring-primary/60 focus:border-primary/80 transition-all placeholder:text-gray-400 shadow-md"
          />
        </div>
        <Tabs
          activeKey={activeTab}
          onChange={(key) => {
            setActiveTab(key);
            setCurrentPage(1);
          }}
          className="mb-4"
          items={[
            {
              label: (
                <span className="flex items-center gap-2">
                  Active
                  <AntBadge
                    count={processedActive.length}
                    style={{ backgroundColor: "#309F41" }}
                  />
                </span>
              ),
              key: "active",
              children: loading ? (
                <Skeleton active paragraph={{ rows: 6 }} />
              ) : (
                <>
                  <Table
                    columns={columns}
                    dataSource={currentData}
                    pagination={false}
                    rowKey="id"
                    onChange={(pagination, filters, sorter) => {
                      if (!Array.isArray(sorter)) {
                        setSorter(sorter);
                      }
                    }}
                    scroll={{ x: true }}
                    className="custom-campaign-table"
                    rowClassName={() => "hover:bg-green/10 transition-colors"}
                  />
                  <div className="mt-8 flex justify-end">
                    <Pagination
                      current={currentPage}
                      pageSize={itemsPerPage}
                      total={processedActive.length}
                      onChange={(page) => setCurrentPage(page)}
                      showSizeChanger={false}
                      className="custom-pagination"
                    />
                  </div>
                </>
              ),
            },
            {
              label: (
                <span className="flex items-center gap-2">
                  Upcoming
                  <AntBadge
                    count={processedUpcoming.length}
                    style={{ backgroundColor: "#5373d4" }}
                  />
                </span>
              ),
              key: "upcoming",
              children: loading ? (
                <Skeleton active paragraph={{ rows: 6 }} />
              ) : (
                <>
                  <Table
                    columns={columns}
                    dataSource={currentData}
                    pagination={false}
                    rowKey="id"
                    onChange={(pagination, filters, sorter) => {
                      if (!Array.isArray(sorter)) {
                        setSorter(sorter);
                      }
                    }}
                    scroll={{ x: true }}
                    className="custom-campaign-table"
                    rowClassName={() =>
                      "hover:bg-secondary/10 transition-colors"
                    }
                  />
                  <div className="mt-8 flex justify-end">
                    <Pagination
                      current={currentPage}
                      pageSize={itemsPerPage}
                      total={processedUpcoming.length}
                      onChange={(page) => setCurrentPage(page)}
                      showSizeChanger={false}
                      className="custom-pagination"
                    />
                  </div>
                </>
              ),
            },
            {
              label: (
                <span className="flex items-center gap-2">
                  Finished
                  <AntBadge
                    count={processedFinished.length}
                    style={{ backgroundColor: "#FFC250", color: "#404B52" }}
                  />
                </span>
              ),
              key: "finished",
              children: loading ? (
                <Skeleton active paragraph={{ rows: 6 }} />
              ) : (
                <>
                  <Table
                    columns={columns}
                    dataSource={currentData}
                    pagination={false}
                    rowKey="id"
                    onChange={(pagination, filters, sorter) => {
                      if (!Array.isArray(sorter)) {
                        setSorter(sorter);
                      }
                    }}
                    scroll={{ x: true }}
                    className="custom-campaign-table"
                    rowClassName={() => "hover:bg-yellow/10 transition-colors"}
                  />
                  <div className="mt-8 flex justify-end">
                    <Pagination
                      current={currentPage}
                      pageSize={itemsPerPage}
                      total={processedFinished.length}
                      onChange={(page) => setCurrentPage(page)}
                      showSizeChanger={false}
                      className="custom-pagination"
                    />
                  </div>
                </>
              ),
            },
            {
              label: (
                <span className="flex items-center gap-2">
                  Drafts
                  <AntBadge
                    count={processedDrafts.length}
                    style={{ backgroundColor: "#D1D5DB", color: "#404B52" }}
                  />
                </span>
              ),
              key: "drafts",
              children: loading ? (
                <Skeleton active paragraph={{ rows: 6 }} />
              ) : (
                <>
                  <Table
                    columns={columns}
                    dataSource={currentData}
                    pagination={false}
                    rowKey="id"
                    onChange={(pagination, filters, sorter) => {
                      if (!Array.isArray(sorter)) {
                        setSorter(sorter);
                      }
                    }}
                    scroll={{ x: true }}
                    className="custom-campaign-table"
                    rowClassName={() => "hover:bg-input/10 transition-colors"}
                  />
                  <div className="mt-8 flex justify-end">
                    <Pagination
                      current={currentPage}
                      pageSize={itemsPerPage}
                      total={processedDrafts.length}
                      onChange={(page) => setCurrentPage(page)}
                      showSizeChanger={false}
                      className="custom-pagination"
                    />
                  </div>
                  {/* Publish Confirmation Modal */}
                  <Modal
                    open={publishModal.visible}
                    onCancel={() =>
                      setPublishModal({ visible: false, campaign: null })
                    }
                    onOk={() => handlePublishDraft(publishModal.campaign)}
                    okText={
                      publishingId === publishModal.campaign?.id
                        ? "Publishing..."
                        : "Publish"
                    }
                    okButtonProps={{
                      loading: publishingId === publishModal.campaign?.id,
                    }}
                    cancelButtonProps={{
                      disabled: publishingId === publishModal.campaign?.id,
                    }}
                    title="Publish Campaign"
                    centered
                  >
                    <p className="text-center">
                      Are you sure you want to publish this draft campaign? It
                      will become visible to creators.
                    </p>
                  </Modal>
                </>
              ),
            },
          ]}
        />
      </div>
    </AuthGuard>
  );
};

export default CampaignsTable;
