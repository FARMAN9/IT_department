import React from "react";
import NoDP from "../../assets/blankProfile.png";
import { FiMapPin, FiUser } from "react-icons/fi";

function LabCard({ item }) {
  return (
    <div className="group relative w-full bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 overflow-hidden transform-style-preserve-3d">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={item.image || NoDP}
          alt={item.name}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -rotate-45" />
      </div>

      {/* Content Container */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 space-y-2">
        {/* Title Section */}
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight transition-transform duration-300 group-hover:translate-y-1">
          {item.name}
          <span className="block w-12 h-1 bg-blue-400 mt-2 rounded-full transition-all duration-500 group-hover:w-24 group-hover:bg-blue-300" />
        </h2>

        {/* Details Container */}
        <div className="flex flex-col gap-2 text-sm sm:text-base">
          {/* Location */}
          {item.location && (
            <div className="flex items-center gap-2 text-white/90">
              <FiMapPin className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
              <span className="truncate">{item.location}</span>
            </div>
          )}

          {/* Incharge */}
          {item.Incharge && (
            <div className="flex items-center gap-2 text-white/90">
              <FiUser className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
              <span className="truncate">{item.Incharge || "Incharge Not Available"}</span>
            </div>
          )}
        </div>
      </div>

      {/* Floating Accent */}
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-400/10 rounded-full group-hover:scale-150 transition-transform duration-500 -z-10" />
    </div>
  );
}

export default LabCard;