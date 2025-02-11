import React from "react";
import { ImArrowUpRight2 } from "react-icons/im";
import { IoIosArrowForward } from "react-icons/io";

const Slider = () => {
  return (
    <div className="my-4">
      <section className="md:px-12 px-4 space-y-8">
        <h1 className="text-5xl font-bold text-center">
          You could be one of them
        </h1>
        <section className="flex items-center gap-4 text-xs heroSection">
          <img
            className="h-56 w-[30vw] object-cover rounded-3xl"
            src="/images/b1.png"
            alt=""
          />
          <img
            className="h-56 w-[30vw] object-cover rounded-3xl"
            src="/images/b2.png"
            alt=""
          />
          <img
            className="h-56 w-[30vw] object-cover rounded-3xl"
            src="/images/b3.png"
            alt=""
          />
          <img
            className="h-56 w-[30vw] object-cover rounded-3xl"
            src="/images/b4.png"
            alt=""
          />
        </section>
      </section>
      <div className="flex items-center justify-center">
        <button className="px-6 py-3 text-sm text-white bg-primary mt-8 flex items-center gap-2">
          I aspire to be like them
          <ImArrowUpRight2 />
        </button>
      </div>
      <section className="mt-12">
        <h1 className="text-2xl font-bold text-center">
          Join thousands of inspiring creatives.
        </h1>
        <div className="flex items-center justify-center my-3 gap-4">
          <img
            className="h-16 w-16 rounded-full object-cover"
            src="/images/b3.png"
            alt=""
          />
          <img
            className="h-16 w-16 rounded-full object-cover"
            src="/images/b11.png"
            alt=""
          />
          <img
            className="h-16 w-16 rounded-full object-cover"
            src="/images/b4.png"
            alt=""
          />
          <img
            className="h-16 w-16 rounded-full object-cover"
            src="/images/b8.png"
            alt=""
          />
          <img
            className="h-16 w-16 rounded-full object-cover"
            src="/images/b3.png"
            alt=""
          />
          <img
            className="h-16 w-16 rounded-full object-cover"
            src="/images/b1.png"
            alt=""
          />
          <img
            className="h-16 w-16 rounded-full object-cover"
            src="/images/b18.png"
            alt=""
          />
        </div>
        <div className="flex items-center justify-center">
          <button className="px-5 py-3 rounded text-sm bg-background mt-8 flex items-center gap-2">
            Explore the most creative Bentos
            <IoIosArrowForward />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Slider;
