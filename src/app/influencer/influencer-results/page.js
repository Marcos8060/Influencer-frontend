"use client";
import React, { useState } from "react";
import FilterDropdown from "@/app/Components/SharedComponents/FilterDropDownComponent";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoLogoTiktok } from "react-icons/io5";
import { FaRegEnvelope } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { datum } from "./influencersData";
import Footer from "@/app/Components/Footer";
import Filters from "./filters";

const CreateCampaign = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const niches = [
    { name: "Fashion and Beauty" },
    { name: "Travel and Adventure" },
    { name: "Sports and Entertainment" },
  ];

  return (
    <>
      <section className="bg-primary md:px-12 px-4 py-12 md:h-[40vh] flex items-center justify-center space-y-4">
        <div className="w-full space-y-4">
          <div className="md:w-1/2 w-full mx-auto">
            <section className="mx-auto">
              <div className="flex md:flex-row flex-col gap-4 items-center justify-center">
                <div className="w-full">
                  <FilterDropdown
                    options={niches}
                    value={selectedCountry}
                    onChange={setSelectedCountry}
                    placeholder="Platform"
                    className="bg-primary"
                  />
                </div>
                <div className="w-full">
                  <FilterDropdown
                    options={niches}
                    value={selectedCountry}
                    onChange={setSelectedCountry}
                    placeholder="Category"
                    className="bg-primary"
                  />
                </div>
              </div>
            </section>
          </div>
          <Filters />
        </div>
      </section>
      <section className="md:px-12 px-4 py-12 bg-background">
        <h1 className="font-bold text-2xl text-color mb-8">
          Beauty TikTok Influencers in the United Kingdom
        </h1>
        <section className="grid md:grid-cols-5 grid-cols-1 gap-4">
          {datum.map((data, index) => (
            <div key={index} className="bg-white shadow-xl rounded-lg p-4">
              <img
                className=" h-[180px] object-cover rounded-md mb-1"
                src="/images/b18.png"
                alt=""
              />
              <section className="border-b border-input flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-bold">Orkun Işıtmak</p>
                  <small className="text-color text-xs">Istanbul, TR</small>
                </div>
                <div>
                  <p className="text-sm font-bold">10M</p>
                  <small className="text-color text-xs">Followers</small>
                </div>
              </section>
              <div className="space-y-2">
                <section className="flex items-center justify-between">
                  <div className="flex items-center justify-between gap-4 text-xs">
                    <FaYoutube className="text-red" />
                    <FaInstagram />
                    <IoLogoTiktok />
                  </div>
                  <div>
                    <small className="text-[10px] bg-background rounded-3xl py-1 px-2">
                      Entertainment
                    </small>
                  </div>
                </section>
                <section className="flex items-center justify-between">
                  <div className="flex items-center justify-between gap-4 text-xs">
                    <small className="text-[11px]">Advertising Price</small>
                  </div>
                  <div>
                    <small className="text-xs font-bold">$5000</small>
                  </div>
                </section>
                <section className="flex items-center justify-between">
                  <div className="flex items-center justify-between gap-4 text-xs">
                    <FaRegEnvelope />
                    <FaHeart />
                  </div>
                  <div>
                    <small className="text-[10px] bg-background rounded py-2 px-2">
                      Send Message
                    </small>
                  </div>
                </section>
              </div>
            </div>
          ))}
        </section>
      </section>
      <Footer />
    </>
  );
};

export default CreateCampaign;
