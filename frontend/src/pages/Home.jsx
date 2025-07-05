import React from "react";
import Navbar from "../compoents/Navbar";
import HeroSection from "../compoents/HeroSection";
import AboutUsImage3 from "../assets/AboutUsImage3.png";
import StarIcon from "../assets/StarIcon.png";
import ServiceIcon from "../assets/ServiceIcon.png";
import RentIcon from "../assets/RentIcon.png";
import NDAIcon from "../assets/NDAIcon.png";
import PartnerIcon from "../assets/PartnerIcon.png";
import FreelanceIcon from "../assets/FreelanceIcon.png";
import ConsultImage from "../assets/ConsultImage.jpg";
import HowImage from "../assets/HowImage.png";
import { NavLink } from "react-router-dom";
import Cards from "../compoents/Cards";
import Footer from "../compoents/Footer";


function Home() {
  const cardData = [
    {
      id: 1,
      image: RentIcon,
      title: "Rental Agreement",
      description:
        "A simple lease agreement between landlord and tenant — fully customizable for duration, rent, and terms.",
    },
    {
      id: 1,
      image: NDAIcon,
      title: "Non-Disclosure Agreement (NDA)",
      description:
        "Protect your sensitive information with an NDA. Ideal for business deals, freelance work, or startup discussions.",
    },
    {
      id: 1,
      image: FreelanceIcon,
      title: "Freelance Agreement",
      description:
        "A legally binding contract between a freelancer and client outlining services, deadlines, and payment terms.",
    },
    {
      id: 1,
      image: PartnerIcon,
      title: "Partnership Agreement",
      description:
        "Outline terms between partners, including equity, responsibilities, and profit sharing in your venture.",
    },
    {
      id: 1,
      image: ServiceIcon,
      title: "Service Agreement",
      description:
        "Set expectations between service provider and client — great for agencies, consultants, or freelancers.",
    },
  ];
  return (
    <>
      <Navbar />
      <HeroSection />
      {/* About Section */}
      <>
        <section id="about-section" className="bg-[#FAF9F6] py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Content Section */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center  gap-3">
                  {/* Star SVG placeholder - replace with your SVG */}
                  <div className="w-9 h-9 object-contain">
                    <img
                      src={StarIcon}
                      alt="Star Icon"
                      className="w-full h-full"
                    />
                  </div>
                  <h2
                    className="text-5xl lg:text-6xl font-bold text-[#1e463c]"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    About Us
                  </h2>
                </div>

                <div className="space-y-4 text-[#1e463c] leading-relaxed">
                  <p className="text-lg">
                    At{" "}
                    <span className="font-semibold text-[#1e463c]">
                      LexPort
                    </span>
                    , we believe that legal support should be simple,
                    affordable, and accessible to all — not just big firms. Our
                    platform bridges the gap between individuals and
                    professional legal help by combining technology with expert
                    knowledge.
                  </p>

                  <p className="text-lg">
                    With LexPort, users can generate legally sound documents in
                    minutes, receive smart AI-powered guidance, and even consult
                    real legal professionals — all from one secure platform.
                    Whether you're a freelancer, startup founder, or someone
                    facing a legal challenge, LexPort is here to make the
                    process seamless and stress-free.
                  </p>
                </div>
              </div>

              {/* Image Section */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-64 h-64 rounded-xl overflow-hidden hidden md:block">
                    {/* Your image goes here */}
                    <img
                      src={AboutUsImage3}
                      alt="About Us"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
      {/* Cards */}
      <>
      <section className="py-12 bg-[#FAF9F6] px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4">
            {/* Left SVG */}
            <div className="w-8 h-8">
              <img
                src={StarIcon}
                alt="Star Left"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Heading Text */}
            <h2
              className="text-4xl lg:text-5xl font-bold text-[#1e463c] text-center"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Select A Document
            </h2>

            {/* Right SVG */}
            <div className="w-8 h-8">
              <img
                src={StarIcon}
                alt="Star Right"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>
      <div className="=px-6 py-10 mx-auto bg-[#FAF9F6] ">
        <Cards data={cardData} />
      </div>
      </>
      {/* Book Consultancy */}
      <>
     <section className="relative py-20 px-6 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(${ConsultImage})`}}>
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Content container */}
      <div className="relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8 font-serif">
          Need Expert Legal Advice?
        </h2>
        
        <p className="text-lg lg:text-xl text-gray-100 mb-12 max-w-3xl mx-auto leading-relaxed">
          Talk to a verified legal professional for personalized guidance — fast, secure, and hassle-free.
        </p>
        <NavLink to="/consult">
        <button className="bg-[#1e463c] hover:bg-green-800 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-300 shadow-lg hover:shadow-xl">
          Get Consultation
        </button>
        </NavLink>
      </div>
      </div>
    </section>
      </>
      {/* How it works */}
      <>
        <section id="how-it-works" className="bg-[#FAF9F6] py-16 px-6">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Content Section */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-3">
            {/* Icon or step image */}
            <div className="w-9 h-9 object-contain">
              <img
                src={StarIcon}
                alt="Step Icon"
                className="w-full h-full"
              />
            </div>
            <h2
              className="text-5xl lg:text-6xl font-bold text-[#1e463c]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              How It Works
            </h2>
          </div>

          <div className="space-y-6 text-[#1e463c] leading-relaxed">
            <div className="text-lg">
              <strong>Step 1: Choose Your Document</strong><br />
              Select from a wide range of professional legal templates tailored for your needs.
            </div>

            <div className="text-lg">
              <strong>Step 2: Chat with Our AI Assistant</strong><br />
              Unsure how to proceed? Let our AI chatbot guide you through the document creation process.
            </div>

            <div className="text-lg">
              <strong>Step 3: Fill in the Details</strong><br />
              Answer simple, guided questions. No legal jargon — just clarity.
            </div>

            <div className="text-lg">
              <strong>Step 4: Download Your Document</strong><br />
              Instantly generate a professionally formatted PDF, ready to use.
            </div>

            <div className="text-lg">
              <strong>Step 5: Consult a Legal Expert (Optional)</strong><br />
              Book a quick session with a verified lawyer right through the platform if you need further assistance.
            </div>
          </div>
        </div>

        {/* Optional Image Section */}
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="w-96 h-96 rounded-xl overflow-hidden hidden md:block">
              <img
                src={HowImage}
                alt="How it works"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
      </>
      <Footer/>
    </>
  );
}

export default Home;
