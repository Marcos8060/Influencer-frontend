import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { LuFilter } from "react-icons/lu";
import InputComponent from "../../SharedComponents/InputComponent";
import FilterDropdown from "../../SharedComponents/FilterDropDownComponent";
import MultiSelectCheckBox from "../../SharedComponents/MultiSelectCheckBox";

export default function FiltersDrawer() {
  const [selectedGender, setSelectedGender] = useState("");
  const [visible, setVisible] = useState(false);

  const genders = ["Male", "Female", "Other"];

  return (
    <div className="card flex justify-content-center">
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        className="md:w-1/3 w-full"
      >
        <form className="my-4">
          <div className="space-y-8">
            <section className="flex items-center gap-2">
              <div className="w-3/12">
                <small>Location</small>
              </div>
              <div className="w-9/12 flex items-center gap-2">
                <InputComponent className="w-full" placeholder="Country" />
                <InputComponent className="w-full" placeholder="City" />
              </div>
            </section>
            <section className="flex items-center gap-2">
              <div className="w-3/12">
                <small>Followers</small>
              </div>
              <div className="w-9/12 flex items-center gap-2">
                <InputComponent
                  type="number"
                  className="w-full"
                  placeholder="From"
                />
                <InputComponent
                  type="number"
                  className="w-full"
                  placeholder="To"
                />
              </div>
            </section>
            <section className="flex items-center gap-2 w-full">
              <div className="w-3/12">
                <small>Engagement Rate</small>
              </div>
              <div className="w-9/12 flex items-center gap-2">
                <InputComponent type="number" className="w-full" />
                <InputComponent type="number" className="w-full" />
              </div>
            </section>
            <section className="flex items-center gap-2 w-full">
              <div className="w-3/12">
                <small>Category</small>
              </div>
              <div className="w-9/12">
                <FilterDropdown className="w-full" />
              </div>
            </section>
            <section className="flex items-center gap-2 w-full">
              <div className="w-3/12">
                <small>Age Range</small>
              </div>
              <div className="w-9/12 flex items-center gap-2">
                <InputComponent type="number" className="w-full" />
                <InputComponent type="number" className="w-full" />
              </div>
            </section>
            <section className="flex items-center gap-2 w-full">
              <div className="w-3/12">
                <small>Gender</small>
              </div>
              <div className="w-9/12">
                <MultiSelectCheckBox
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.value)}
                  options={genders.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                  optionLabel="label"
                  placeholder="Select Gender"
                />
              </div>
            </section>
            <section className="flex items-center gap-2 w-full">
              <div className="w-3/12">
                <small>More Filters</small>
              </div>
              <div className="w-9/12 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="cursor-pointer scale-150" />
                  <label className="ml-2 text-sm">Only Verified</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="cursor-pointer scale-150" />
                  <label className="ml-2 text-sm">Influencer Platform Verified</label>
                </div>
              </div>
            </section>
            <section className="flex justify-end">
                <button className="bg-primary text-white rounded px-8 py-2 text-sm">Search</button>
            </section>
          </div>
        </form>
      </Sidebar>
      <button
        onClick={() => setVisible(true)}
        className="border border-primary rounded text-xs px-3 py-2 flex items-center gap-2"
      >
        <LuFilter />
        Add Filters
      </button>
    </div>
  );
}
