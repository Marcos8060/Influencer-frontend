"use client";
import React, { useEffect } from "react";
import BucketList from "@/app/Components/Brand/BucketList";
import { useDispatch } from "react-redux";
import { fetchAllBuckets } from "@/redux/features/bucket-list";
import { useAuth } from "@/assets/hooks/use-auth";
import { useProtectedRoute } from "@/assets/hooks/authGuard";

const BucketsPage = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const isAuthorized = useProtectedRoute();

  useEffect(() => {
    if (auth) {
      dispatch(fetchAllBuckets(auth));
    }
  }, [auth]);

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="max-w-8xl mx-auto">
      <div className="flex flex-col items-center justify-center mb-4">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-extrabold text-primary tracking-tight">
            My Buckets
          </h1>
        </div>
        <p className="text-gray-500 text-base text-center max-w-xl">
          Organize and manage your influencer buckets for easy access and
          collaboration. Create, edit, and view all your buckets in one place.
        </p>
      </div>
      <BucketList />
    </div>
  );
};

export default BucketsPage;
