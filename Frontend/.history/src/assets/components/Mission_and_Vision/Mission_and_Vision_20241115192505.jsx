import React, { useState } from "react";

function MissionAndVision() {
  return (
    <div className=" mx-auto mt-3 bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Video Section */}
      <div className="w-full mb-6">
        <iframe
          className="w-full h-64 sm:h-96 rounded-xl shadow-lg"
          src="https://www.youtube.com/embed/gPfEJLt4nCc" // Replace with your YouTube video link
          title="Mission and Vision Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen></iframe>
      </div>

      {/* Mission Section */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">Our Mission</h2>
        <p className="text-gray-600 mt-2">
          To attain global recognition in Information Technology education and
          research by producing “Creators of Innovative Technology”.
        </p>

        {/* Mission Description Section */}
      </div>

      {/* Vision Section */}
      <div className="p-4 border-t border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Our Vision</h2>
        <li className="text-gray-600 mt-2">
          Our vision is to become a global leader in the industry, known for
          excellence in our offerings.
        </li>
      </div>
    </div>
  );
}

export default MissionAndVision;
