import React, { useEffect, useRef } from "react";

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
    {
      name: "Emily Davis",
      company: "CodeStream",
      score: "22 LPA",
      image: "/api/placeholder/300/300",
    },
    {
      name: "Michael Brown",
      company: "DevWorks",
      score: "21 LPA",
      image: "/api/placeholder/300/300",
    },
  ];

  const scrollContainer = useRef(null);
  const autoSlide = useRef(null);

  // Auto-slide logic
  useEffect(() => {
    autoSlide.current = setInterval(() => {
      if (scrollContainer.current) {
        scrollContainer.current.scrollBy({ left: 200, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(autoSlide.current);
  }, []);

  const stopAutoSlide = () => clearInterval(autoSlide.current);
  const startAutoSlide = () => {
    autoSlide.current = setInterval(() => {
      if (scrollContainer.current) {
        scrollContainer.current.scrollBy({ left: 200, behavior: "smooth" });
      }
    }, 3000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Current Top Placements
        </h2>
      </div>

      {/* Auto-scrolling horizontal container */}
      <div
        ref={scrollContainer}
        onMouseEnter={stopAutoSlide}
        onMouseLeave={startAutoSlide}
        className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {profiles.map((profile, index) => (
          <div
            key={index}
            className="flex-none w-80 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
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
