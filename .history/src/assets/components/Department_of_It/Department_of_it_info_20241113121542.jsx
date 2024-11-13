import React, { useState } from "react";

function DepartmentOfItInfo() {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="w-100 mx-auto mt-3 bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Card Image */}
      <img
        src="https://via.placeholder.com/300x200"
        alt="Department of IT"
        className="w-full h-48 object-cover"
      />

      {/* Card Content */}
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-blue-800 text-cen">
          Department of IT
        </h2>
        <p className="text-gray-600 mt-2">
          The Department of IT provides an array of educational and technical
          resources to equip students for a career in the tech industry.
        </p>

        {/* Description Section */}
        {expanded && (
          <p className="text-gray-600 mt-2">
            Our department offers advanced courses in computer science, software
            development, cybersecurity, and more, with hands-on labs and
            internship opportunities.
          </p>
        )}

        {/* Toggle Button */}
        <button
          onClick={toggleExpanded}
          className="text-blue-500 mt-4 flex items-center focus:outline-none">
          {expanded ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
}

export default DepartmentOfItInfo;
