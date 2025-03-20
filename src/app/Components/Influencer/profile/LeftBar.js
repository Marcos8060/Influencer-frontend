"use client";
import React, { useContext } from "react";
import { authContext } from "@/assets/context/use-context";

const LeftBar = () => {
  const { user } = useContext(authContext);
  console.log(user);
  return (
    <section className="bg-white shadow-sm rounded-lg p-4 h-[70vh]">
      <div className="flex items-center justify-between text-xs text-secondary font-bold">
        <p>Active</p>
        <p>{user?.roleName}</p>
      </div>
      <section className="flex items-center justify-center h-[30vh]">
        <div>
          <img
            className="w-28 h-28 rounded-full object-cover"
            src="https://images.pexels.com/photos/3779676/pexels-photo-3779676.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt=""
          />
          <div className="flex items-center gap-1 my-4 text-color">
            <span>{user?.firstName}</span>
            <span>{user?.lastName}</span>
          </div>
        </div>
      </section>
    </section>
  );
};

export default LeftBar;
