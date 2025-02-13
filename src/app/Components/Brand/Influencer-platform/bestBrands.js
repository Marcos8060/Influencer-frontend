import React from "react";

const BestBrands = () => {
  return (
    <section className="md:px-12 p-4 my-12 md:flex gap-8 items-center justify-between md:space-y-0 space-y-6">
      <div className="md:w-4/12 w-full">
        <h1 className="mb-4">
          <span className="font-bold text-5xl">vm</span>
          <span className="text-4xl font-medium">ware.</span>
        </h1>
        <q className="font-light">
          When the pandemic hit, those of us who thrive on in-person
          collaboration were worried that our creativity and productivity would
          suffer. Influencer Platform was the perfect tool to help us with
          collaboration, whiteboarding, and retrospectives while remote
        </q>
        <div className="flex items-center gap-4 my-4">
          <img
            className="w-12 h-12 object-cover rounded-full"
            src="https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
          <div className="font-light text-sm">
            <p>Roxane Mustafa</p>
            <p>Design Team Lead at VMware</p>
          </div>
        </div>
      </div>
      <div className="md:w-4/12 w-full">
        <h1 className="text-4xl font-bold mb-4">
          Docu<span className="text-5xl">S</span>ign
        </h1>
        <q className="font-light">
          Influencer Platform helps solve one of the major gaps in product
          design: how to manage tasks across product designers whose projects
          are in different tools
        </q>
        <div className="flex items-center gap-4 my-4">
          <img
            className="w-12 h-12 object-cover rounded-full"
            src="https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
          <div className="font-light text-sm">
            <p>Roxane Mustafa</p>
            <p>Design Team Lead at VMware</p>
          </div>
        </div>
      </div>
      <div className="md:w-4/12 w-full">
        <h1 className="text-4xl font-bold mb-4">frog</h1>
        <q className="font-light">
          As we used Influencer Platform we moved from skepticism to belief to
          innovation, and now we have a tool that’s at the core of what we do
          and will continue to extend into the future
        </q>
        <div className="flex items-center gap-4 my-4">
          <img
            className="w-12 h-12 object-cover rounded-full"
            src="https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
          <div className="font-light text-sm">
            <p>Roxane Mustafa</p>
            <p>Design Team Lead at VMware</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestBrands;
