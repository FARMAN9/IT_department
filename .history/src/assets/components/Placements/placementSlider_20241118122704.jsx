import React from "react";

const PlacementSlider = () => {
  const profiles = [
    {
      name: "Kanav Phull",
      company: "Rapidfort",
      score: "30 LPA",
      image: "/api/placeholder/300/300",
    },
    {
      name: "Anubhav Gupta",
      company: "Writesonic",
      score: "27 LPA",
      image: "/api/placeholder/300/300",
    },
    {
      name: "John Doe",
      company: "TechCorp",
      score: "25 LPA",
      image: "/api/placeholder/300/300",
    },
    {
      name: "Jane Smith",
      company: "Innovatech",
      score: "24 LPA",
      image: "/api/placeholder/300/300",
    },
    // Add more profiles as needed
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Current Top Placements
        </h2>
      </div>

      {/* Responsive Grid Layout */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {profiles.map((profile, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative w-full h-64">
              <img
                src={profile.image}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800">
                {profile.name}
              </h3>
              <p className="text-gray-600">{profile.company}</p>
              <p className="text-gray-800 font-semibold mt-2">
                {profile.score}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacementSlider;
