import React, { useState } from "react";
import Navbar from "../compoents/Navbar";
import Footer from "../compoents/Footer";
import LawyerProfiles from "../compoents/LawyerCard";
import HeroSectionImage from "../assets/HeroSectionImage.png";
import HeroConsult1 from "../assets/HeroConsult1.png";

function Consult() {
  const [searchQuery, setSearchQuery] = useState("");

  const lawyersData = [
    {
      id: 1,
      name: "Sarah Johnson",
      specialization: "Corporate Law",
      experience: 12,
      rating: 4.9,
      description:
        "Specializing in mergers, acquisitions, and business compliance with extensive experience in corporate governance.",
      image: HeroSectionImage,
    },
    {
      id: 2,
      name: "Michael Smith",
      specialization: "Criminal Law",
      experience: 8,
      rating: 4.7,
      description:
        "Experienced in criminal defense, white-collar crimes, and legal investigations.",
      image: HeroSectionImage,
    },
    {
      id: 3,
      name: "Emily Brown",
      specialization: "Family Law",
      experience: 10,
      rating: 4.8,
      description:
        "Helping families through divorce, custody battles, and adoption cases.",
      image: HeroSectionImage,
    },
    {
      id: 4,
      name: "David Miller",
      specialization: "Property Law",
      experience: 15,
      rating: 4.6,
      description:
        "Expert in real estate transactions, property disputes, and land titles.",
      image: HeroSectionImage,
    },
    {
      id: 5,
      name: "Olivia Davis",
      specialization: "Tax Law",
      experience: 9,
      rating: 4.5,
      description:
        "Advises clients on tax strategies, disputes, and IRS compliance.",
      image: HeroSectionImage,
    },
  ];

  const filteredLawyers = lawyersData.filter(
    (lawyer) =>
      lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lawyer.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />

      {/* Hero Section with Search - Updated Design */}
      <div
        className="py-20 px-5 text-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${HeroConsult1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-5 text-white leading-tight drop-shadow-md" style={{ fontFamily: 'Playfair Display, serif' }}>
          Expert Legal Help, Just a Click Away
        </h1>

        <p className="text-lg text-gray-100 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
         Need legal clarity? Whether you're drafting an agreement, facing a dispute, or just unsure about the next step — book a private session with a certified lawyer. Fast, secure, and tailored to your situation.
        </p>

        <div className="relative max-w-lg mx-auto">

          <input
            type="text"
            placeholder="Search by lawyer name or legal domain..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-4 pl-12 pr-5 text-base rounded-xl border-2 border-gray-200 bg-white shadow-lg outline-none transition-all duration-300 ease-in-out focus:border-green-800 focus:bg-white hover:shadow-xl"
          />
        </div>
      </div>
      <div className="bg-[#FAF9F6] ">
        <LawyerProfiles lawyers={filteredLawyers} />
      </div>
      <Footer />
    </>
  );
}

export default Consult;
