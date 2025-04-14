"use client";
import React, { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
// import ApplyJobModal from "./apply-job-modal";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Campaigns = () => {
  const { jobs } = useSelector((store) => store.socials);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleSelect = (job) => {
    setSelectedJob(job);
  };

//   useEffect(() => {
//     dispatch(fetchJobs())
//       .then(() => {
//         setLoading(false);
//       })
//       .catch(() => {
//         setLoading(false);
//       });
//   }, []);
  return (
    <div className="bg-background h-screen">
      <div className="bg-primary text-background rounded p-4">
        <h1 className="text-xl">Apply your first campaign today</h1>
        <small>Browse our latest campaign openings to view</small>
      </div>
      <section className="mx-auto flex gap-2 py-8 overflow-y-auto">
        <div className="w-4/12 space-y-3">
          {loading ? (
            <Skeleton
              baseColor="#c0c0c0"
              highlightColor="#f0f0f0"
              count={3}
              height={100}
            />
          ) : (
            <>
              {Array.isArray(jobs) &&
                jobs.map((job, index) => (
                  <section
                    onClick={() => handleSelect(job)}
                    key={index}
                    className="w-full bg-white shadow rounded-lg p-4 cursor-pointer"
                  >
                    <div>
                      <h1 className="font-bold text-primary">{job.title}</h1>
                      <p className="text-xs mt-2">{job.subTitle}</p>
                      <div className=" border-b border-dashed border-gray my-2"></div>
                      <footer className="flex items-center justify-between text-xs">
                        <div>
                          <small className="font-bold">{job.applications?.length} Applicannt(s)</small>
                        </div>
                        <div className="flex items-center gap-1">
                          <small className="font-bold">Company Verified</small>
                          <MdVerified className="text-primary" />
                        </div>
                      </footer>
                    </div>
                  </section>
                ))}
            </>
          )}
        </div>
        <div className="w-8/12">
          {loading ? (
            <Skeleton
              baseColor="#c0c0c0"
              highlightColor="#f0f0f0"
              count={4}
              height={100}
            />
          ) : (
            <section className="w-full bg-white shadow rounded p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-primary">
                    {selectedJob !== null ? selectedJob?.title : jobs[0]?.title}
                  </h1>
                  <p className="text-xs">
                    {selectedJob !== null
                      ? selectedJob?.subTitle
                      : jobs[0]?.subTitle}
                  </p>
                </div>
                <div>
                  {/* <ApplyJobModal {...{ jobs,selectedJob }} /> */}
                </div>
              </div>
              <hr className="text-gray my-4" />
              <div>
                <h1 className="font-bold mb-2 text-primary">Job Overview</h1>
                <p className="text-xs leading-6">
                  {selectedJob !== null
                    ? selectedJob?.description
                    : jobs[0]?.description}
                </p>
                <h1 className="font-bold my-4 text-primary">
                  What You Will Do
                </h1>
                <section className="space-y-2">
                  {selectedJob !== null
                    ? selectedJob?.task.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <GoDotFill className="text-primary" />
                          <small>{item}</small>
                        </div>
                      ))
                    : jobs[0]?.task.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <GoDotFill className="text-primary" />
                          <small>{item}</small>
                        </div>
                      ))}
                </section>
              </div>
            </section>
          )}
        </div>
      </section>
    </div>
  );
};

export default Campaigns;