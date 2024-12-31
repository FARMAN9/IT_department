import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function MissionAndVision() {
  const mission =
    "To attain global recognition in Information Technology education andresearch by producing “Creators of Innovative Technology" +
    ".";

  const vission = [
    "To be the premier provider of Information Technology education and research",
    "To contribute to the development of innovative technologies",
    "To inspire and empower students to pursue their passions and contribute to the global community",
    "To create a positive impact on the world through sustainable practices and innovative technologies",
    "To foster a culture of continuous learning and growth among students",
   
  ];
  return (
    <div className=" mx-auto mt-3 bg-white rounded-lg shadow-lg text-sm sm:text-base lg:text-lg   overflow-hidden">
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
        <h2 className=" text-sm sm:text-base lg:text-lg font-semibold text-gray-800">Our Mission</h2>
        <p className="text-gray-600 mt-2">{mission}</p>

        {/* Mission Description Section */}
      </div>

      {/* Vision Section */}
      <div className="p-4 border-t border-gray-200">
        <h2 className=" text-sm sm:text-base lg:text-lg font-semibold text-gray-800">Our Vision</h2>
        <ul className="list-disc pl-6 text-gray-600">
          {vission.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <div className="flex justify-center mt-4">
          <NavLink to="/about/vision">
            <button className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded-2xl item-left">
              Read More
            </button>
          </NavLink>
        </div>
        
          
        
      </div>
    </div>
  );
}

export default MissionAndVision;
