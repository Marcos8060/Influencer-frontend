import React from "react";
import EditBioModal from "./edit-bio";

const RightBar = () => {
  return (
    <section className="space-y-4">
      <div className="bg-white shadow-sm rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-secondary">Your Bio</h2>
          <EditBioModal />
        </div>
        <p className="text-xs text-color">
          Hi there! 👋 I am [Your Name], a passionate content creator and
          influencer dedicated to inspiring and connecting with my amazing
          audience. 🌟 Through my platforms, I share a blend of [your
          niche—e.g., fashion, travel, fitness, tech, lifestyle], bringing fresh
          perspectives, creative ideas, and authentic experiences to the table.
          My journey is fueled by a commitment to storytelling, building
          meaningful relationships, and creating value for my followers and
          collaborators alike.
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
