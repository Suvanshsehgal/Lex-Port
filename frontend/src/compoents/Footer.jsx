import React from "react";
import { Link } from "react-router-dom";
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
              <Link to="/#rent-agreement" className="hover:underline">
                Rent Agreement
              </Link>
            </li>
            <li>
              <Link to="/#nda" className="hover:underline">
                Non-Disclosure Agreement (NDA)
              </Link>
            </li>
            <li>
              <Link to="/#freelance" className="hover:underline">
                Freelance Agreement
              </Link>
            </li>
            <li>
              <Link to="/#service" className="hover:underline">
                Service Agreement
              </Link>
            </li>
            <li>
              <Link to="/#partnership" className="hover:underline">
                Partnership Agreement
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <NavLink to="/" className="hover:underline">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:underline">
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" className="hover:underline">
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:underline">
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/case-studies" className="hover:underline">
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
