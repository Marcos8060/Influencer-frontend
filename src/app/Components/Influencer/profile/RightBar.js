import React from "react";
import { MdEdit } from "react-icons/md";

const RightBar = () => {
  return (
    <section className="space-y-4">
      <div className="bg-white shadow-sm rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-secondary">Your Bio</h2>
          <div className="border border-secondary rounded-3xl px-3 py-1 flex items-center gap-2">
            <MdEdit className="text-secondary" />
            <small className="text-xs font-bold text-secondary">Edit</small>
          </div>
        </div>
        <p className="text-sm text-color">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, ipsa.
        </p>
      </div>
      <div className="bg-white shadow-sm rounded-lg p-4 space-y-3">
        <h2 className="font-bold text-color">Onboarding Information</h2>
        <p className="text-sm text-color">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, ipsa.
        </p>
      </div>
    </section>
  );
};

export default RightBar;
