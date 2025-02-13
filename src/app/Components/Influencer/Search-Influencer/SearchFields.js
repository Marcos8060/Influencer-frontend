import React from "react";
import FilterDropDownComponent from "../../SharedComponents/FilterDropDownComponent";

const SearchFields = () => {
  return (
    <>
      <div className="space-y-4 my-24">
        <section className="md:w-9/12 mx-auto grid md:grid-cols-3 grid-cols-2 gap-4">
          <div className="">
            <FilterDropDownComponent />
          </div>
          <div className="">
            <FilterDropDownComponent />
          </div>
          <div className="">
            <FilterDropDownComponent />
          </div>
          <div className="">
            <FilterDropDownComponent />
          </div>
          <div className="">
            <FilterDropDownComponent />
          </div>
          <div className="">
            <FilterDropDownComponent />
          </div>
        </section>
        <div className="flex items-center justify-center mt-8">
          <button className="bg-primary text-white rounded-sm px-4 py-2 text-sm font-light">
            Find Influencers
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchFields;
