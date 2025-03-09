import React from "react";
import NoDP from "../../assets/blankProfile.png";

function LabCard({ item }) {
  return (
    <div className="group relative w-full bg-white rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-3xl hover:-translate-y-2 overflow-hidden transform-style-preserve-3d hover:rotate-x-5 hover:rotate-y-2">
      {/* Image Container with Floating Effect */}
      <div className="relative h-72 overflow-hidden perspective-1000">
        <img
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={item.image || NoDP}
          alt={item.name}
        />

        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 shine" />
      </div>

      {/* Content Container with Glass Morphism */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-sm">
        <div className="space-y-2 text-white">
          <h2 className="text-2xl font-bold tracking-tight transition-transform duration-300 group-hover:translate-y-1">
            {item.name}
            <span className="block w-12 h-1 bg-blue-400 mt-2 rounded-full transition-all duration-500 group-hover:w-24" />
          </h2>

          {item.location && (
            <div className="flex items-center gap-2 text-sm font-medium opacity-90">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9l-1.414-1.414m0 0l-7.071-7.071m7.071 7.071L3 12m14 8h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              {item.location ? (
                <span>{item.location}</span>
              ) : (
                <span>Location Not Available</span>
              )}
              {item.Incharge && (
                <div className="flex items-center gap-2 text-sm font-medium opacity-90">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9l-1.414-1.414m0 0l-7.071-7.071m7.071 7.071L3 12m14 8h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>

                  {item.Incharge ? (
                    <span>{item.Incharge}</span>
                  ) : (
                    <span>Incarge Not Available</span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Hover Action Panel */}

      {/* Dynamic Color Accent */}
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-400/20 rounded-full group-hover:scale-150 transition-transform duration-500 -z-10" />
    </div>
  );
}

export default LabCard;
