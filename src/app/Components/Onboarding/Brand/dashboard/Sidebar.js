"use client";
import MenuChildren from "./MenuChildren";

const Sidebar = ({ collapse, setCollapse, icon }) => {

  const toggleSidebar = () => {
    setCollapse(!collapse);
  }
  return (
    <section className="bg-primary shadow h-screen transition-all duration-500">
      <div className="h-[10vh] flex items-center justify-center relative">
        {!collapse && <h1 className="text-background transition-opacity duration-500">Logo</h1> }
        <div className={`absolute transition-all duration-500 ${ collapse ? 'left-4' : 'left-60'}`}>
          <p onClick={toggleSidebar}>{icon}</p>
        </div>
      </div>
      <div className="space-y-6 text-sm text-background my-4 pl-4 py-8">
        <MenuChildren {...{ collapse }} />
      </div>
    </section>
  );
};

export default Sidebar;
