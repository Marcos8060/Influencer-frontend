import React from "react";
import { FaStar } from "react-icons/fa";
import { testimonials } from "./testimonialdata";

const Testimonials = () => {
  return (
    <div className="md:h-screen py-8 md:space-y-0 space-y-3">
      <div className="md:w-5/12 mx-auto md:px-0 px-4">
        <h1 className="md:text-4xl text-3xl font-bold text-center">
          What are Brands and Influencers saying about us!
        </h1>
      </div>
      <section className="md:w-7/12 mx-auto md:flex items-center justify-center md:h-[90vh] gap-8 md:px-0 px-4 md:space-y-0 space-y-3">
        {testimonials.map((item, index) => (
          <div key={index} className="bg-background rounded-xl font-thin p-6 md:w-4/12">
            <p className="font-light text-color">
              {item.review}
            </p>
            <div className="flex items-center gap-4 mt-4">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src="https://images.pexels.com/photos/4584095/pexels-photo-4584095.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt=""
              />
              <div>
                <p className="font-medium">{item.name}</p>
                <div className="flex text-sm">
                  <FaStar className="text-yellow" />
                  <FaStar className="text-yellow" />
                  <FaStar className="text-yellow" />
                  <FaStar className="text-yellow" />
                  <FaStar className="text-yellow" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Testimonials;
