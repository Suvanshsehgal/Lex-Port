import React from 'react'
import logo from '../assets/logo.png';

function NavbarLanding() {
  return (
<nav className="bg-[#FAF9F6] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Lex-Port Logo" className="h-10                                w-30 rounded-md" />
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          <button className="px-4 py-1 border border-[#1e463c] text-[#1e463c] rounded-md font-medium hover:bg-[#1e463c] hover:text-white transition">
            Login
          </button>
          <button className="px-4 py-1 bg-[#1e463c] text-white font-semibold rounded-md hover:opacity-90 transition">
            Get Started
          </button>
        </div>
      </div>
    </nav>  )
}

export default NavbarLanding