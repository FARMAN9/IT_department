import React, { useState } from "react";

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
    "To contribute to the development of the national infrastructure and resources required for the successful implementation of technology",
    "To create a competitive and inclusive learning environment",
    "To support and empower students to develop their skills and capabilities",
    "To create a sense of belonging and pride in the students' achievements",
    "To create a culture of collaboration and mutual support among students and faculty",
    "To create a sense of community and camaraderie among students and faculty",
  ];
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
        <p className="text-gray-600 mt-2">{mission}</p>

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
