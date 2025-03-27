import React from "react";
import InputComponent from "../../SharedComponents/InputComponent";

const ExistingProducts = () => {
  return (
    <div className="mt-6 text-color">
      <InputComponent placeholder="Search product title" />
      <section className="space-y-4 mt-8">
        <div className="flex gap-8">
          <div className="w-4/12">
            <img className="h-24 object-cover rounded" src="/images/b3.png" alt="" />
          </div>
          <div className="w-8/12 space-y-2">
            <p className="text-sm font-bold">Product/Service Name</p>
            <p className="text-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
              laborum.
            </p>
            <button className="border border-primary text-color font-semibold rounded text-xs px-3 py-2">
              Save New Product
            </button>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="w-4/12">
            <img className="h-24 object-cover rounded" src="/images/b2.png" alt="" />
          </div>
          <div className="w-8/12 space-y-2">
            <p>Product/Service Name</p>
            <p className="text-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
              laborum.
            </p>
            <button className="border border-primary text-color font-semibold rounded text-xs px-3 py-2">
              Save New Product
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExistingProducts;
