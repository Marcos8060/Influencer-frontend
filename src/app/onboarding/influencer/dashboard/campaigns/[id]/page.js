"use client";
import React, { useEffect, useState } from "react";
import { getAllCampaignDetails } from "@/redux/features/stepper/campaign-stepper";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@/assets/hooks/use-auth";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";

const CampaignDetails = () => {
  const [loading, setLoading] = useState(false);
  const { campaignDetails } = useSelector((store) => store.campaign);
  const dispatch = useDispatch();
  const auth = useAuth();
  const pathname = usePathname();

  const segments = pathname.split("/");
  const id = segments[segments.length - 1]; // Get last part of the URL

  const getCampaignDetails = async () => {
    try {
      setLoading(true);
      await dispatch(getAllCampaignDetails(auth, id));
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth) {
      getCampaignDetails();
    }
  }, [auth]);

  return (
    <>
      <section className="bg-primary p-4 text-white flex items-center justify-between md:w-7/12 w-full mx-auto">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">{campaignDetails.title}</h2>
          <p className="font-light text-sm">
            {campaignDetails.startDate} - {campaignDetails.endDate}
          </p>
          <p className="bg-green rounded-3xl text-white px-4 py-2 text-xs w-16 flex items-center justify-center">
            {campaignDetails.collaborators?.[0]?.status}
          </p>
        </div>
        <div className="bg-background rounded-lg p-4 text-color text-xs space-y-2">
          <p>{campaignDetails.products?.length} Product</p>
          <p>0 Services</p>
          <p>{campaignDetails.collaborators?.length} Collaborator</p>
        </div>
      </section>
      <section className="p-4 bg-white shadow-sm text-color space-y-3 md:w-7/12 w-full mx-auto">
        <img className="rounded-2xl h-40 w-full object-cover" src={campaignDetails.coverImage} alt="" />
        <div className="space-y-1">
          <h1 className="font-semibold">Campaign Description</h1>
          <div className="bg-background rounded p-3 text-sm">
            <p>{campaignDetails.description}</p>
          </div>
        </div>
        <div className="space-y-1">
          <h1 className="font-semibold">Brief Description</h1>
          <div className="bg-[#E0F2FE] rounded p-3 text-sm">
            <p>{campaignDetails.briefDescription}</p>
          </div>
        </div>
        <section className="">
          <div className="space-y-1">
            <h1 className="font-semibold">Video Link</h1>
            <div className="bg-[#E0F2FE] rounded p-3 text-sm">
              <a className="text-link" target="_blank" href={campaignDetails.exampleVideoUrl}>{campaignDetails.exampleVideoUrl}</a>
            </div>
          </div>
        </section>
        <div className="space-y-1">
          <h1 className="font-semibold">Featured Products</h1>
          <section className="">
            <div className="grid grid-cols-2 gap-4">
              {campaignDetails?.products?.map((item) => (
                <div
                  className="border border-input rounded p-3 text-sm"
                  key={item.id}
                >
                  {item.productImages.map((data, index) => (
                    <section className="relative space-y-3">
                      <img
                        key={index}
                        className="w-full h-24 rounded object-cover"
                        src={data.url}
                        alt=""
                      />
                      <div className="space-y-1">
                        <p className="font-bold">{item.name}</p>
                        <p className="font-light text-xs">{item.description}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="font-semibold">
                          Manual:{" "}
                          <span className="text-xs font-normal">
                            {item.productManualText}
                          </span>
                        </p>
                        <p className="font-semibold">
                          Manual Link:{" "}
                          <a
                            href={item.productManualUrl}
                            target="_blank"
                            className="text-xs text-link font-normal"
                          >
                            Link
                          </a>
                        </p>
                      </div>
                      {/* <div className="absolute bottom-2 right-1 flex gap-1 items-end justify-start">
                        <p>{item.currency}</p>
                        <p className="font-bold">{item.price}</p>
                      </div> */}
                    </section>
                  ))}
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default CampaignDetails;
