import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="md:space-y-0 space-y-4 md:flex items-center justify-center md:justify-between bg-gradient-to-r from-primary to-secondary p-8 md:h-[30vh]">
      <div>
        <h1 className="md:text-5xl text-xl font-bold text-white text-center">Influencer</h1>
        <div className="flex items-center justify-center gap-2 text-white my-8">
          <FaLinkedin />
          <FaXTwitter />
        </div>
      </div>
      <div>
        <h2 className="text-white font-bold text-center">Product</h2>
        <ul className="text-white font-thin my-2 text-sm space-y-3 text-center">
            <li>Product</li>
            <li>Guide</li>
            <li>Changelog</li>
        </ul>
      </div>
      <div>
        <h2 className="text-white font-bold text-center">Company</h2>
        <ul className="text-white font-thin my-2 text-sm space-y-3 text-center">
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
            <li>Support</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
