"use client";
import React, { useEffect, useState } from "react";
import FilterInfuencer from "./FilterInfuencer";
import { influencerData } from "./influencerData";
import { HiArrowLongLeft } from "react-icons/hi2";
import { HiArrowLongRight } from "react-icons/hi2";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import Link from "next/link";
import { useAuth } from "@/assets/hooks/use-auth";
import { useDispatch, useSelector } from "react-redux";
import { getAllInfluencers } from "@/redux/features/influencer/filter";

const InfluencerArchives = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const { influencers } = useSelector((store) => store.filterResults);

  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;

  useEffect(() => {
    if (auth) {
      dispatch(getAllInfluencers(auth));
    }
  }, [auth]);

  return (
    <div className="mt-16 md:px-12 px-4 mb-12 md:w-10/12 mx-auto">
      <h1 className="font-bold md:text-3xl text-2xl text-center">
        Influencers By Archives: Find Influencers
      </h1>
      <p className="text-center text-sm font-light">
        Make your data invisible by generating unlimited identities. The
        next-level in privacy protection for online and travel.
      </p>
      <FilterInfuencer />

      <div className="card">
        <DataTable
          value={influencers}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "50rem" }}
          headerClassName="bg-blue-500 text-white text-center font-thin"
        >
          <Column
            field="fullName"
            header="Name"
            className="border border-input text-sm"
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="email"
            header="Email"
            className="border border-input text-sm"
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="phoneNumber"
            header="Phone Number"
            className="border border-input text-sm"
            style={{ width: "15%" }}
          ></Column>
          <Column
            field="country"
            header="Country"
            className="border border-input text-sm"
            style={{ width: "15%" }}
          ></Column>
          <Column
            field="city"
            header="City"
            className="border border-input text-sm"
            style={{ width: "30%" }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default InfluencerArchives;
