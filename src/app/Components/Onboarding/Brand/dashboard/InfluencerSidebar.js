"use client";
import InfluencerMenuChildren from "./InfluencerMenuChildren";

const InfluencerSidebar = ({ collapse, setCollapse, icon }) => {

  const toggleSidebar = () => {
    setCollapse(!collapse);
  }
  return (
    <section className="bg-white shadow-xl h-screen transition-all duration-500 px-2">
      <div className="h-[10vh] flex items-center justify-center relative">
        {!collapse && <h1 className="text-color font-bold text-2xl transition-opacity duration-500">Logo</h1> }
        <div className={`absolute transition-all duration-500 ${ collapse ? 'left-4' : 'left-60'}`}>
          <p className="" onClick={toggleSidebar}>{icon}</p>
        </div>
      </div>
      <div className="space-y-8 text-sm text-background my-4 pl-4 py-8">
        <InfluencerMenuChildren {...{ collapse }} />
      </div>
    </section>
  );
};

export default InfluencerSidebar;
