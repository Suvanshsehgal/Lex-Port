import React from "react";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";
import logo2 from "../assets/logo2.png";

const Footer = () => {
  return (
    <footer className="bg-[#1e463c] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo & Description */}
        <div className="space-y-4">
          <img
            src={logo2}
            alt="LexPort Logo"
            className="h-10 w-auto object-contain"
          />
          <p className="text-sm leading-relaxed">
            Premier legal consulting services with over 25 years of experience.
            Trusted by businesses and individuals for comprehensive legal
            solutions.
          </p>
        </div>

        {/* Generate a Document */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Generate a Document</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#card-1" className="hover:underline">
                Rent Agreement
              </a>
            </li>
            <li>
              <a href="#card-2" className="hover:underline">
                Non-Disclosure Agreement (NDA)
              </a>
            </li>
            <li>
              <a href="#card-3" className="hover:underline">
                Freelance Agreement
              </a>
            </li>
            <li>
              <a href="#card-5" className="hover:underline">
                Service Agreement
              </a>
            </li>
            <li>
              <a href="#card-4" className="hover:underline">
                Partnership Agreement
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <NavLink to="/home" className="hover:underline">
                Home
              </NavLink>
            </li>
            <li>
              <Link
                to="about-section"
                smooth={true}
                duration={500}
                offset={-70} // adjust based on your navbar height
                className="hover:underline"
              >
                About
              </Link>
            </li>
            <li>
              <NavLink to="/consult" className="hover:underline">
                Consult
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className="hover:underline">
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/ai" className="hover:underline">
                AI Assistance
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider Line */}
      <div className="border-t border-white/30 mt-10 pt-6 text-sm flex flex-col md:flex-row justify-between items-center">
        <p>© 2025 Lex-Port Legal Consulting. All rights reserved.</p>
        <div className="flex gap-4 mt-3 md:mt-0">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Attorney Advertising
          </a>
          <a href="#" className="hover:underline">
            Disclaimer
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
