import React from "react";
import { Link } from "react-router-dom";
import sproutLogo from '../assets/sprout.svg'; 
import { Github, Linkedin } from 'lucide-react';

const teamLinkedInLinks = [
  { name: "Kapil Gupta", url: "https://linkedin.com/in/kapilgupta20" },
  { name: "Sarthak Khandelwal", url: "https://linkedin.com/in/sarthak436" }
];

const FooterCmp = () => {
  return (
    <footer className="bg-[#2A2A2A] text-[#F1F1F1]">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-8 md:mb-0">
            <div className="mb-4 flex items-center">
              <img src={sproutLogo} alt="KisanMitra Logo" className="h-8 w-8 mr-2" />
              <h2 className="text-2xl font-bold text-[#F1F1F1]">KisanMitra</h2>
            </div>
            <p className="text-[#CCCCCC]">
              Empowering farmers with technology-driven solutions for a better tomorrow.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#F1F1F1]">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "About", "Contact", "FAQ"].map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="hover:text-[#A8CBB5] transition-colors text-[#CCCCCC]"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#F1F1F1]">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/terms"
                  className="hover:text-[#A8CBB5] transition-colors text-[#CCCCCC]"
                >
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-[#A8CBB5] transition-colors text-[#CCCCCC]"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* <div>
            <h3 className="text-lg font-semibold mb-4 text-[#F1F1F1]">Follow Us</h3>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                <a key={idx} href="#" className="hover:text-[#A8CBB5] transition-colors text-[#CCCCCC]">
                  <Icon size={24} />
                  <span className="sr-only">{Icon.name}</span>
                </a>
              ))}
            </div>
          </div> */}

<div>
  <h3 className="text-lg font-semibold mb-4 text-[#F1F1F1]">Follow</h3>

  {/* GitHub Icon Link */}
  <div className="flex space-x-4">
    <a
      href="https://github.com/your-username/your-repo"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-[#A8CBB5] transition-colors text-[#CCCCCC]"
    >
      <Github size={24} />
      <span className="sr-only">GitHub</span>
    </a>
  </div>

  {/* LinkedIn Team Links */}
  <div className="mt-4 space-y-2 text-sm text-[#CCCCCC]">
    {teamLinkedInLinks.map((member, idx) => (
      <div key={idx}>
        <a
          href={member.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#A8CBB5] transition-colors flex items-center space-x-2"
        >
          <Linkedin size={16} />
          <span>{member.name}</span>
        </a>
      </div>
    ))}
  </div>
</div>

        </div>

        <div className="border-t border-[#444] mt-4 pt-4 text-sm text-center text-[#999]">
          <p>
            &copy; {new Date().getFullYear()} KisanMitra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterCmp;
