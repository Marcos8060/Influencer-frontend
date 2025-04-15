"use client";
import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function InsightsDrawer({
  handleSubmit,
  selectedPost,
  loading,
}) {
  const [visible, setVisible] = useState(false);
  const { postInsights } = useSelector((store) => store.campaign);

  return (
    <div className="card flex justify-content-center">
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        className="md:w-3/12 w-full bg-background"
      >
        <section className="p-4">
          {loading ? (
            <Skeleton
              baseColor="#c0c0c0"
              highlightColor="#f0f0f0"
              count={3}
              height={100}
            />
          ) : (
            <>
              {Array.isArray(postInsights) &&
                postInsights.map((post, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-input py-4 text-sm"
                  >
                    <p>{post.metricName}</p>
                    <p>{post.metricValue}</p>
                  </div>
                ))}
            </>
          )}
        </section>
      </Sidebar>

      <button onClick={() => setVisible(true)}>
        <p
          onClick={() => handleSubmit(selectedPost.id)}
          className="text-sm cursor-pointer text-link"
        >
          View Insights
        </p>
      </button>
    </div>
  );
}
