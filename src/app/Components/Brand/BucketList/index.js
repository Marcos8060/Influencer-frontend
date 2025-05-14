"use client";
import React, { useEffect, useState } from "react";
import { Table, Empty, Button, Pagination, Tag, Space, Card } from "antd";
import { 
  HiArrowLongLeft, 
  HiArrowLongRight, 
  HiPlus 
} from "react-icons/hi2";
import { TiEye } from "react-icons/ti";
import { FaBoxOpen } from "react-icons/fa";
import BucketListDialog from "./bucket-list-dialog";
import { fetchAllBuckets } from "@/redux/features/bucket-list";
import { useAuth } from "@/assets/hooks/use-auth";
import { useSelector, useDispatch } from "react-redux";
import ConfirmDialog from "./confirmDialog";
import EditBucketListDialog from "./edit-bucket-list";
import Link from "next/link";
import dayjs from "dayjs";

const BucketList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { bucketList } = useSelector((store) => store.bucket);
  const dispatch = useDispatch();

  const itemsPerPage = 8;
  const totalPages = Math.ceil(bucketList.length / itemsPerPage);
  const auth = useAuth();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = Array.isArray(bucketList) && bucketList.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (auth && bucketList.length === 0) {
      setLoading(true);
      dispatch(fetchAllBuckets(auth)).finally(() => setLoading(false));
    }
  }, [auth, bucketList.length]);

  const columns = [
    {
      title: 'Bucket Name',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      render: (text) => <span className="font-medium">{text}</span>,
    },
    // {
    //   title: 'Description',
    //   dataIndex: 'description',
    //   key: 'description',
    //   width: 200,
    //   ellipsis: true,
    // },
    {
      title: 'No. Of Influencers',
      dataIndex: 'influencers',
      key: 'influencers',
      width: 150,
      render: (influencers) => (
        <Tag color="blue" className="text-xs">
          {influencers.length}
        </Tag>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      render: (date) => dayjs(date).format('MMM D, YYYY'),
    },
    {
      title: 'View',
      key: 'view',
      width: 150,
      align: 'left',
      render: (_, record) => (
        <Link href={`/brand/influencer-discovery/influencerBuckets/${record.id}`}>
          <Button 
            type="text" 
            icon={<TiEye className="text-lg" />} 
            className="flex items-center justify-center"
          />
        </Link>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <EditBucketListDialog data={record} />
          <ConfirmDialog data={record} />
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="Bucket List"
      extra={
        <Space>
          {/* <Button className="flex items-center">
            Add to Campaign
          </Button> */}
          <BucketListDialog />
        </Space>
      }
      className="shadow-sm"
    >
      {loading ? (
        <Table
          columns={columns}
          dataSource={[]}
          loading={loading}
          pagination={false}
        />
      ) : (
        <>
          {currentData.length > 0 ? (
            <div className="w-full">
              <Table
                columns={columns}
                dataSource={currentData}
                pagination={false}
                scroll={{ x: 'max-content', y: '55vh' }}
                className="custom-table"
                rowKey="id"
              />
              
              <div className="flex justify-center mt-6">
                <Pagination
                  current={currentPage}
                  total={bucketList.length}
                  pageSize={itemsPerPage}
                  onChange={setCurrentPage}
                  showSizeChanger={false}
                  prevIcon={<HiArrowLongLeft />}
                  nextIcon={<HiArrowLongRight />}
                  className="ant-pagination-custom"
                />
              </div>
            </div>
          ) : (
            <Empty
              image={<FaBoxOpen className="text-6xl text-gray-400" />}
              imageStyle={{ height: 80, fontSize: '4rem' }}
              description={
                <span className="text-gray-500">
                  No Buckets available in your Repository
                </span>
              }
              className="flex flex-col items-center justify-center h-[60vh]"
            >
              <BucketListDialog />
            </Empty>
          )}
        </>
      )}
    </Card>
  );
};

export default BucketList;