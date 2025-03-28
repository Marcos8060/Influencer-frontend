import React, { useState } from "react";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { faqsData } from "./faqsdata";

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState(0); 

  const toggleShow = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index)); 
  };

  return (
    <div className="md:h-[80vh] py-8 bg-background">
      <section className="md:w-8/12 mx-auto">
        <h1 className="uppercase md:text-3xl text-2xl font-bold text-center">FAQs</h1>
        <div className="rounded p-4 space-y-4">
          {faqsData.map((item, index) => (
            <div key={index} className="bg-white shadow rounded p-4">
              <div className="flex items-center justify-between">
                <h1 className="text-primary font-semibold">{item.title}</h1>
                {openIndex === index ? (
                  <IoIosArrowDown
                    onClick={() => toggleShow(index)}
                    className="bg-primary text-white rounded-full text-3xl p-2 cursor-pointer"
                  />
                ) : (
                  <IoIosArrowForward
                    onClick={() => toggleShow(index)}
                    className="bg-primary text-white rounded-full text-3xl p-2 cursor-pointer"
                  />
                )}
              </div>
              {openIndex === index && (
                <div className="w-10/12">
                  <p className="font-normal mt-2 text-sm text-color">{item.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
