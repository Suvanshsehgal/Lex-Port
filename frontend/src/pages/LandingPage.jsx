import React ,{useState} from "react";
import landingimage from "../assets/LandingPagePhoto.png";
import NavbarLanding from '../compoents/NavbarLanding'

const LegalLandingPage = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };
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
               onClick={handleButtonClick}
                className="bg-[#1e463c] text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition duration-200"
              >
                Generate a Document
              </button>
              <button
               onClick={handleButtonClick}
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
    {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-2xl text-center relative max-w-sm mx-auto"
               style={{ backgroundColor: "#FAF9F6", color: "#1e463c" }}>
            <button
              onClick={closePopup}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
              aria-label="Close popup"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Login or Register</h2>
            <p className="text-lg">
              Please log in or register to access this feature.
            </p>
            {/* You can add actual login/register buttons here later */}
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={closePopup}
                className="bg-[#1e463c] text-white px-6 py-2 rounded-md font-semibold hover:opacity-90 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LegalLandingPage;
