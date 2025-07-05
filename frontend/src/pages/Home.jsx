import React from "react";
import Navbar from "../compoents/Navbar";
import HeroSection from "../compoents/HeroSection";
import AboutUsImage2 from "../assets/AboutUsImage2.png";
import StarIcon from "../assets/StarIcon.png";
function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      {/* About Section */}
      <>
      <section id="about-section" className="bg-[#FAF9F6]e py-16 px-6">
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
                  <span className="font-semibold text-[#1e463c]">LexPort</span>,
                  we believe that legal support should be simple, affordable,
                  and accessible to all — not just big firms. Our platform
                  bridges the gap between individuals and professional legal
                  help by combining technology with expert knowledge.
                </p>

                <p className="text-lg">
                  With LexPort, users can generate legally sound documents in
                  minutes, receive smart AI-powered guidance, and even consult
                  real legal professionals — all from one secure platform.
                  Whether you're a freelancer, startup founder, or someone
                  facing a legal challenge, LexPort is here to make the process
                  seamless and stress-free.
                </p>
              </div>
            </div>

            {/* Image Section */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-64 h-64 rounded-xl overflow-hidden hidden md:block">
                  {/* Your image goes here */}
                  <img
                    src={AboutUsImage2}
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
    </>
  );
}

export default Home;
