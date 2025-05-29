import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "How does Grace Belgravia work?",
      answer: "Grace Belgravia is an all-in-one influencer marketing platform that connects brands with creators. Brands can create campaigns, find relevant creators, manage collaborations, and track performance. Creators can discover opportunities, showcase their work, and build lasting brand relationships."
    },
    {
      question: "What types of creators can join?",
      answer: "We welcome creators of all sizes and niches - from micro-influencers to global stars. Whether you're a dancer, DJ, lifestyle blogger, or tech reviewer, if you have an engaged audience and create quality content, you're welcome to join our platform."
    },
    {
      question: "How do brands find the right creators?",
      answer: "Our AI-powered matching system helps brands find creators based on multiple factors including niche, audience demographics, engagement rates, and past performance. You can also search manually using filters for location, platform, audience size, and more."
    },
    {
      question: "What are the platform fees?",
      answer: "Creators can join and apply to campaigns for free. Brands pay a platform fee based on their campaign budget and requirements. Contact our sales team for detailed pricing information tailored to your needs."
    },
    {
      question: "How are payments handled?",
      answer: "All payments are processed securely through our platform. Brands deposit campaign budgets in escrow, and creators are paid automatically once deliverables are approved. We support multiple payment methods and handle all invoicing."
    },
    {
      question: "What about content rights and usage?",
      answer: "All campaigns include clear terms for content usage rights. Brands can specify their requirements, and creators maintain their intellectual property while granting agreed-upon usage rights. Everything is documented in our automated contracts."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative py-24 bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] rounded-full blur-3xl -z-10 opacity-30" />
      
      <div className="max-w-4xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-light text-[#1A1A1A] mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray">
            Everything you need to know about Grace Belgravia and how it works.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-[30px] border border-gray/10 overflow-hidden transition-all hover:border-gray/20"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-[#F0FFFF]/20 transition-colors"
              >
                <h3 className="text-xl font-medium text-[#1A1A1A]">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="w-6 h-6 text-gray flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray flex-shrink-0" />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="p-6 pt-0 text-gray">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Support */}
        <div className="mt-16 text-center">
          <p className="text-gray mb-4">
            Still have questions? We're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@gracebelgravia.com"
              className="inline-block px-8 py-4 rounded-full bg-[#1A1A1A] text-white hover:bg-black transition-colors"
            >
              Contact Support
            </a>
            <a
              href="/docs"
              className="inline-block px-8 py-4 rounded-full border border-gray/20 text-[#1A1A1A] hover:border-gray/40 transition-colors"
            >
              View Documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 