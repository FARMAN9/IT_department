import React, { useState } from "react";

function MissionAndVision() {
  const [expandedMission, setExpandedMission] = useState(false);
  const [expandedVision, setExpandedVision] = useState(false);

  const toggleMission = () => {
    setExpandedMission(!expandedMission);
  };

  const toggleVision = () => {
    setExpandedVision(!expandedVision);
  };

  return (
    <div className="max-w-4xl mx-auto mt-3 bg-white rounded-lg shadow-lg overflow-hidden">
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
          Our mission is to provide innovative solutions to help businesses
          achieve their full potential.
        </p>

        {/* Mission Description Section */}
        {expandedMission && (
          <p className="text-gray-600 mt-2">
            We are committed to delivering high-quality products and services
            that meet the needs of our clients, empowering them to succeed in a
            fast-paced, ever-changing world.
          </p>
        )}

        {/* Mission Toggle Button */}
        <button
          onClick={toggleMission}
          className="text-blue-500 mt-4 flex items-center focus:outline-none">
          {expandedMission ? "Show Less" : "Show More"}
        </button>
      </div>

      {/* Vision Section */}
      <div className="p-4 border-t border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Our Vision</h2>
        <p className="text-gray-600 mt-2">
          Our vision is to become a global leader in the industry, known for
          excellence in our offerings.
        </p>

        {/* Vision Description Section */}
        {expandedVision && (
          <p className="text-gray-600 mt-2">
            We aspire to create a positive impact on the world through
            sustainable practices and innovative technologies.
          </p>
        )}

        {/* Vision Toggle Button */}
        <button
          onClick={toggleVision}
          className="text-blue-500 mt-4 flex items-center focus:outline-none">
          {expandedVision ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
}

export default MissionAndVision;
