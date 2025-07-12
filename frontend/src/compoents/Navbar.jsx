import React from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
function Navbar(props) {
  return (
    <nav className="bg-[#FAF9F6] shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 py-2">
          {/* Logo */}
          <NavLink to="/home" className="hover:opacity-80 transition-opacity">
            <img
              src={logo}
              alt="Lex-Port Logo"
              className="h-10 w-auto object-contain"
            />
          </NavLink>

          {/* Navigation Links */}
          <div className="flex space-x-8">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `px-3 py-2 text-base font-medium transition-colors ${
                  isActive
                    ? "text-[#1e463c] underline underline-offset-4"
                    : "text-[#1e463c] hover:text-[#16382f]"
                }`
              }
            >
              Home
            </NavLink>

            <Link
              to="about-section"
              smooth={true}
              duration={500}
              offset={-70} // adjust if you have a fixed navbar
              className="px-3 py-2 text-base font-medium transition-colors text-[#1e463c] hover:text-[#16382f] cursor-pointer"
            >
              About
            </Link>

            <NavLink
              to="/consult"
              className={({ isActive }) =>
                `px-3 py-2 text-base font-medium transition-colors ${
                  isActive
                    ? "text-[#1etext-lg463c] underline underline-offset-4"
                    : "text-[#1e463c] hover:text-[#16382f]"
                }`
              }
            >
              Consult
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `px-3 py-2 text-base font-medium transition-colors ${
                  isActive
                    ? "text-[#1e463c] underline underline-offset-4"
                    : "text-[#1e463c] hover:text-[#16382f]"
                }`
              }
            >
              Profile
            </NavLink>
          </div>

          {/* Free Consultation Button */}
          <NavLink
            onClick={props.showchat}
            className="bg-[#1e463c] text-white px-6 py-2 rounded-md text-base font-medium hover:opacity-90 transition-colors shadow-sm"
          >
            Get AI Assistance
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
