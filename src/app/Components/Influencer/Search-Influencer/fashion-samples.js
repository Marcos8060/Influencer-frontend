import React from "react";
import { FaInstagram } from "react-icons/fa";
import { sampleData } from "./sampleData";

const FashionSamples = () => {
  return (
    <section className="md:w-9/12 mx-auto">
      {sampleData.map((sample, index) => (
        <div
          key={index}
          className="border border-[#FF0000] p-4 rounded-xl md:w-9/12 my-4"
        >
          <h1 className="text-xl font-bold">
            {sample.name} | {sample.category}
          </h1>
          <section className="flex flex-wrap md:space-y-0 space-y-2 items-center justify-between">
            <div>
              <img src="/images/sample1.png" alt="" />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-bold">{sample.followers}k</p>
              <p className="text-sm">Followers</p>
              <div className="flex items-center">
                <FaInstagram />
                <p className="text-xs">{sample.username}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-lg font-bold">{sample.percentage}%</p>
              <p className="text-sm">Engagement</p>
            </div>
            <div>
              <button className="border border-primary rounded px-4 py-2 text-sm">
                Collaborate Now
              </button>
            </div>
          </section>
          <section className="my-2">
            <div className="flex flex-wrap items-center gap-2 text-xs text-white">
              <p className="bg-[#6F6C90] py-1 px-3 rounded">White</p>
              <p className="bg-[#6F6C90] py-1 px-3 rounded">Female</p>
              <p className="bg-[#6F6C90] py-1 px-3 rounded">Everyone</p>
              <p className="bg-[#6F6C90] py-1 px-3 rounded">Women 16-24</p>
              <p className="bg-[#6F6C90] py-1 px-3 rounded">Men 16-24</p>
            </div>
            <p className="font-medium text-xs my-2">{sample.description}</p>
            <div className="grid grid-cols-4 items-center gap-2">
              {sample.images.map((img, index) => (
                <img key={index} src={img} alt="" />
              ))}
            </div>
          </section>
        </div>
      ))}
    </section>
  );
};

export default FashionSamples;
