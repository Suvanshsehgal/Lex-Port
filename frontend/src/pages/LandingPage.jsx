import React from "react";
import landingimage from "../assets/LandingPagePhoto.png";
import NavbarLanding from '../compoents/NavbarLanding'

const LegalLandingPage = () => {
  return (
    <>
    <NavbarLanding/>
    <div className="min-h-screen" style={{ backgroundColor: "#FAF9F6" }}>
      {/* Main Content Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-120px)]">
          {/* Left Content */}
          <div className="space-y-6 lg:pr-8">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                Simplify Legal Help
              </h1>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                style={{ color: "#1e463c" }}
              >
                with One Click
              </h1>
            </div>

            <div className="space-y-4 text-gray-600 text-lg">
              <p>
                LexPort is your personal legal assistant — built for
                freelancers, startups, and individuals who need fast, reliable
                legal documents without the complexity. Choose your document,
                get AI-guided support, and even connect with real lawyers, all
                in minutes.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
               
                className="bg-[#1e463c] text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition duration-200"
              >
                Generate a Document
              </button>
              <button
               
                className="border-2 border-[#1e463c] text-[#1e463c] px-8 py-3 rounded-lg font-semibold hover:bg-[#1e463c] hover:text-white transition duration-200"
              >
                Get AI Assistance
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:pl-8">
            <div className="relative h-auto  w-full overflow-hidden">
              <img
                src={landingimage}
                alt="Supreme Court Building at Sunset"
                className="w-50px h-50px object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default LegalLandingPage;
