import React from 'react'
import { useNavigate } from 'react-router-dom';

function ProfileSection() {
    const navigate = useNavigate();
    const handlelogout =() =>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/")
    }
    const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
    <div className="bg-[#FAF9F6] py-8 px-4 md:px-12 flex flex-col md:flex-row items-center gap-6 border-b border-gray-200">
      {/* Profile Image */}
      <div className="flex-shrink-0">
        <img
          src="https://randomuser.me/api/portraits/men/75.jpg"
          alt="User"
          className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
        />
      </div>

      {/* User Info */}
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-3xl font-bold text-green-900" style={{ fontFamily: 'Playfair Display' }}>
         {user.Username}
        </h1>
        <p className="text-gray-600 text-lg">{user.email}</p>
      </div>

      {/* Logout Button */}
      <button
      onClick={handlelogout} 
      className="mt-4 md:mt-0 flex items-center gap-2 px-5 py-2 border-2 border-green-900 text-green-900 font-semibold rounded-md hover:bg-green-900 hover:text-white transition duration-200">
       Log-Out
      </button>
    </div>
    </>
  )
}

export default ProfileSection