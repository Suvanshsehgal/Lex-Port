import React, { useState } from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import { RiMenuLine, RiCloseLine } from "react-icons/ri"; // Import icons from react-icons

function Navbar(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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

          
          <div className="hidden md:flex space-x-8">
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
              offset={-70} 
              className="px-3 py-2 text-base font-medium transition-colors text-[#1e463c] hover:text-[#16382f] cursor-pointer"
            >
              About
            </Link>

            <NavLink
              to="/consult"
              className={({ isActive }) =>
                `px-3 py-2 text-base font-medium transition-colors ${
                  isActive
                    ? "text-[#1e463c] underline underline-offset-4"
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

        
          <NavLink
            onClick={props.showchat}
            className="hidden md:block bg-[#1e463c] text-white px-6 py-2 rounded-md text-base font-medium hover:opacity-90 transition-colors shadow-sm"
          >
            Get AI Assistance
          </NavLink>

          
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-[#1e463c] focus:outline-none">
              {isOpen ? (
                <RiCloseLine className="h-7 w-7" />
              ) : (
                <RiMenuLine className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#FAF9F6] pb-3 space-y-2 px-2 sm:px-3">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive
                  ? "text-[#1e463c] underline underline-offset-4"
                  : "text-[#1e463c] hover:text-[#16382f]"
              }`
            }
            onClick={toggleMenu} 
          >
            Home
          </NavLink>

          <Link
            to="about-section"
            smooth={true}
            duration={500}
            offset={-70}
            className="block px-3 py-2 rounded-md text-base font-medium transition-colors text-[#1e463c] hover:text-[#16382f] cursor-pointer"
            onClick={toggleMenu} 
          >
            About
          </Link>

          <NavLink
            to="/consult"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive
                  ? "text-[#1e463c] underline underline-offset-4"
                  : "text-[#1e463c] hover:text-[#16382f]"
              }`
            }
            onClick={toggleMenu}
          >
            Consult
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive
                  ? "text-[#1e463c] underline underline-offset-4"
                  : "text-[#1e463c] hover:text-[#16382f]"
              }`
            }
            onClick={toggleMenu} 
          >
            Profile
          </NavLink>
          <NavLink
            onClick={() => {
              props.showchat();
              toggleMenu(); 
            }}
            className="block bg-[#1e463c] text-white px-6 py-2 rounded-md text-base font-medium text-center hover:opacity-90 transition-colors shadow-sm mt-4"
          >
            Get AI Assistance
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default Navbar;