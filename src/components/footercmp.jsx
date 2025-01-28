import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import sproutLogo from '../assets/sprout.svg'; 

const FooterCmp = () => {
  return (
    <footer className="bg-[#D1E8D0] text-[#2A2A2A]">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-8 md:mb-0">

          <div className="mb-8 md:mb-0 flex items-center">
            <img src={sproutLogo} alt="KisanMitra Logo" className="h-8 w-8 mr-2" />
            <h2 className="text-2xl font-bold text-[#2A2A2A]">KisanMitra</h2>
          </div>

            <p className="text-[#555]">
              A brief description of your company or website.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#2A2A2A]">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="hover:text-[#A8CBB5] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-[#A8CBB5] transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-[#A8CBB5] transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-[#A8CBB5] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#2A2A2A]">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/terms"
                  className="hover:text-[#A8CBB5] transition-colors"
                >
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-[#A8CBB5] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#2A2A2A]">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#A8CBB5] transition-colors">
                <Facebook size={24} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="hover:text-[#A8CBB5] transition-colors">
                <Twitter size={24} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="hover:text-[#A8CBB5] transition-colors">
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="hover:text-[#A8CBB5] transition-colors">
                <Linkedin size={24} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#A8CBB5] mt-8 pt-8 text-sm text-center text-[#555]">
          <p>
            &copy; {new Date().getFullYear()} Your Company Name. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterCmp;
