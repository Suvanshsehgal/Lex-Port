import React, { useState } from 'react';
import { Star } from 'lucide-react';
import ConsultForm from './ConsultForm';

const LawyerCard = ({ lawyer }) => {
  const [showConsultForm, setShowConsultForm] = useState(false);

  return (

    <div className="relative w-full h-[400px] mx-auto rounded-lg overflow-hidden shadow-lg">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={lawyer.image} 
          alt={lawyer.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 p-6 text-white h-full pb-20">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Playfair Display' }}>
            {lawyer.name}
          </h2>
          <p className="text-green-100 text-lg" style={{ fontFamily: 'Playfair Display' }}>
            {lawyer.specialization}
          </p>
        </div>

        {/* Experience and Rating */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-green-100">
            <span className="font-semibold">Experience:</span> {lawyer.experience} years
          </p>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="text-white font-semibold">{lawyer.rating}/5</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-green-50 mb-6 leading-relaxed">
          {lawyer.description}
        </p>

        {/* Action Buttons */}
        <div className="absolute bottom-6 left-6 right-6">
          <button 
            onClick={() => setShowConsultForm(true)}
            className="w-full border-2 border-white text-white font-semibold py-3 px-4 rounded-lg hover:bg-white hover:text-green-800 transition-colors duration-200"
          >
            Book Consultancy
          </button>
        </div>
      </div>
      {showConsultForm && (
        <ConsultForm 
          lawyer={lawyer} 
          onClose={() => setShowConsultForm(false)} 
        />
      )}
    </div>
  );
};

const LawyerProfiles = ({ lawyers }) => {
  return (
    <div className="px-4 md:px-6 lg:px-8 py-8">
    <div className="min-h-screen bg-[#FAF9F6] py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lawyers.map((lawyer) => (
            <LawyerCard key={lawyer.id} lawyer={lawyer} />
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default LawyerProfiles;
