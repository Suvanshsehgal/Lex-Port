import React from 'react'
import HeroSectionImage from '../assets/HeroSectionImage.png';
import { Link } from 'react-scroll';


function HeroSection(props) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage :`url(${HeroSectionImage})` }}>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
          Instant Legal Help
        </h1>
        
        {/* Subheading */}
        <p className="text-xl sm:text-2xl md:text-3xl mb-8 text-gray-200 font-light" style={{ fontFamily: 'Playfair Display, serif' }}>
          Anytime, Anywhere.
        </p>
        
        {/* Description */}
        <p className="text-lg sm:text-xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Expert legal counsel for businesses and individuals. Professional, trusted, and results-driven solutions for your most complex legal challenges.
        </p>
        
        {/* Buttons */}
       <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
    
    <Link  to="document-section"
              smooth={true}
              duration={500}
              className="bg-[#FAF9F6] text-[#1e463c] px-8 py-4 rounded-lg font-semibold text-lg transform transition-transform duration-300 hover:scale-105 shadow-lg w-full sm:w-auto min-w-[200px]">
    <button >
    Generate a Document
  </button>
    </Link>
  
  <button 
  onClick={props.showchat}
  className="border-2 border-[#FAF9F6] text-[#FAF9F6]  px-8 py-4 rounded-lg font-semibold text-lg transform transition-transform duration-300 hover:scale-105 shadow-lg w-full sm:w-auto min-w-[200px]">
    Get AI Assistance
  </button>
</div>
      </div>
    </div>
  )
}

export default HeroSection