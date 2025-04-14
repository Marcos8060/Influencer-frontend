"use client";
import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { LuFilter } from "react-icons/lu";
import { useSelector } from "react-redux";

export default function InsightsDrawer({ handleSubmit, selectedPost }) {
  const [visible, setVisible] = useState(false);
  const { postInsights } = useSelector((store) => store.campaign);

  return (
    <div className="card flex justify-content-center">
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        className="md:w-5/12 w-full bg-background"
      >
        <section className="p-4">
          {Array.isArray(postInsights) && postInsights.map((post, index) => (
            <div className="flex items-center justify-between border-b border-input py-4 text-sm">
              <p>{post.metricName}</p>
              <p>{post.metricValue}</p>
            </div>
          ))}
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
