import React from "react";

const researchAreas = [
  {
    title: "ARTIFICIAL INTELLIGENCE",
    image: "path-to-your-ai-image.jpg",
  },
  {
    title: "BIG DATA ANALYTICS",
    image: "path-to-your-big-data-image.jpg",
  },
  {
    title: "BLOCKCHAIN",
    image: "path-to-your-blockchain-image.jpg",
  },
];

const ResearchAreas = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-teal-700 mb-6">
        Research Areas
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {researchAreas.map((area, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={area.image}
              alt={area.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-center text-lg font-medium">
                {area.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchAreas;
