"use client";
import React, { useEffect, useState } from "react";
import BucketListInfluencers from "@/app/Components/Brand/BucketList/bucketListInfluencers";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { fetchAllInfluencersInBucket } from "@/redux/features/bucket-list";
import { useAuth } from "@/assets/hooks/use-auth";

const page = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const auth = useAuth();
  const segments = pathname.split("/");
  const id = segments[segments.length - 1]; // Get last part of the URL
  useEffect(() => {
    setLoading(true);
    if (auth) {
      dispatch(fetchAllInfluencersInBucket(auth, id))
        .then(() => {})
        .catch(() => {
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [auth]);
  return (
    <div>
      <BucketListInfluencers />
    </div>
  );
};

export default page;
