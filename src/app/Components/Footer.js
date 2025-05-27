import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-primary text-white px-8 py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Logo and Address Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-16 mb-12">
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">B</span>
              </div>
              <span className="text-lg font-semibold">Grace Belgravia</span>
            </div>
            <address className="not-italic text-white/60 text-sm space-y-1">
              <p>20619 Torrence Chapel Rd</p>
              <p>Suite 116 #1040</p>
              <p>London, UK</p>
              <p>United Kingdom</p>
            </address>
            <div className="mt-8 space-y-2">
              <div className="text-sm text-white/60">
                <span className="block text-white/80">Phone number</span>
                <a href="tel:+44-800-201-1019" className="hover:text-white transition-colors">+44 800 201 1019</a>
              </div>
              <div className="text-sm text-white/60">
                <span className="block text-white/80">Email</span>
                <a href="mailto:support@gracebelgravia.com" className="hover:text-white transition-colors">
                  support@gracebelgravia.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="col-span-1">
            <h3 className="text-white/80 font-medium mb-4">Quick links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/pricing" className="text-white/60 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-white/60 hover:text-white transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/60 hover:text-white transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-white/60 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/60 hover:text-white transition-colors">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div className="col-span-1">
            <h3 className="text-white/80 font-medium mb-4">Social</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                  Youtube
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="col-span-1">
            <h3 className="text-white/80 font-medium mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/terms" className="text-white/60 hover:text-white transition-colors">
                  Terms of service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white/60 hover:text-white transition-colors">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-white/60 hover:text-white transition-colors">
                  Cookie policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Grace Belgravia. All rights reserved.
          </p>
        </div>
      </div>

      {/* World Map Overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            {Array.from({ length: 100 }).map((_, i) => {
              const x = Math.random() * 800;
              const y = Math.random() * 400;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="1.5"
                  fill="currentColor"
                  className="text-white"
                />
              );
            })}
          </g>
        </svg>
      </div>
    </footer>
  );
};

export default Footer;
