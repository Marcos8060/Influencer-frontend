"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Table, Input, Button, Badge, Skeleton, Pagination, Tooltip, Tag } from "antd";
import { FiEye } from "react-icons/fi";
import { useAuth } from "@/assets/hooks/use-auth";
import { fetchAllBrandCampaigns } from "@/redux/features/stepper/campaign-stepper";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

const { Search } = Input;

const CampaignsTable = () => {
  const { brandCampaigns } = useSelector((store) => store.campaign);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sorter, setSorter] = useState({});
  const itemsPerPage = 8;
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useAuth();

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

  const processedCampaigns = useMemo(() => {
    let filtered = [...brandCampaigns];

    if (searchTerm) {
      filtered = filtered.filter((campaign) =>
        campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sorter && sorter.field) {
      filtered.sort((a, b) => {
        if (a[sorter.field] < b[sorter.field]) return sorter.order === 'ascend' ? -1 : 1;
        if (a[sorter.field] > b[sorter.field]) return sorter.order === 'ascend' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [brandCampaigns, searchTerm, sorter]);

  const currentData = processedCampaigns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status) => {
    const colors = {
      active: "green",    // Custom green
      pending: "gold",      // Gold color
      completed: "blue",    // Blue color
      draft: "default",     // Default tag color
      rejected: "red",      // Red color
    };
    
    return (
      <Tag color={colors[status?.toLowerCase()] || "default"} className="capitalize">
        {status || "Unknown"}
      </Tag>
    );
  };  

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      sorter: true,
      render: (text) => <span className="font-semibold text-color">{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: true,
      render: (status) => getStatusBadge(status),
    },
    {
      title: "Description",
      dataIndex: "description",
      responsive: ["lg"],
      render: (desc) => (
        <Tooltip title={desc}>
          {desc.length > 50 ? `${desc.slice(0, 50)}...` : desc}
        </Tooltip>
      ),
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
        <Button
          type="link"
          icon={<FiEye />}
          onClick={() => router.push(`/brand/campaign-report/${record.id}`)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-color">Campaigns</h2>
          <p className="text-color">{processedCampaigns.length} campaigns found</p>
        </div>

        <Search
          placeholder="Search campaigns"
          onChange={(e) => setSearchTerm(e.target.value)}
          allowClear
          style={{ width: 300 }}
        />
      </div>

      {loading ? (
        <Skeleton active paragraph={{ rows: 6 }} />
      ) : (
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
        />
      )}

      {!loading && (
        <div className="mt-6 flex justify-end">
          <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={processedCampaigns.length}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
};

export default CampaignsTable;
