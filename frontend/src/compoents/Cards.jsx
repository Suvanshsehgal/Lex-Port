import React from 'react';
import { NavLink } from 'react-router-dom';
const Cards = ({ data }) => {
  const handleLearnMore = (title) => {
    console.log(`Learn more about ${title}`);
  };


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center px-6 py-10 max-w-7xl mx-auto">
      {data.map((card,index) => (
        <div
          key={card.id}
          id={`card-${index + 1}`}
          className="scroll-mt-24 bg-[#FAF9F6] rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-105 group"
        >
          {/* Header with Icon and Title */}
          <div className="flex items-center mb-4">
            <div className="border-2 border-green-800 rounded-lg p-2 mr-4 w-14 h-14 overflow-hidden">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-contain group-hover:scale-105 transition-all duration-300"
              />
            </div>
            <h2 className="text-xl font-serif font-semibold text-green-900">
              {card.title}
            </h2>
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-4">{card.description}</p>

          {/* Button */}
          <NavLink to = {card.link} className ="block">
          <button
            onClick={() => handleLearnMore(card.title)}
            className="w-full bg-[#FAF9F6] border-2 border-green-800 text-green-800 py-2 rounded-lg font-medium transition-all duration-300 group-hover:bg-green-800 group-hover:text-white"
          >
            Generate Document
          </button>
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default Cards;
