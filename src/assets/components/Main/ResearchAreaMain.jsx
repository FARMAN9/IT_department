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





    <>
     <div className="min-h-auto flex lg:mr-10">
      <main className="flex-1 lg:ml-10 p-2 lg:p-4">
        <div className="max-w-6xl mx-auto p-0 pt-4 space-y-8">
          
          {/* Coordinator Section */}
          <div className="relative">
            <div className="mt-20 lg:mt-0 xl:mt-0 inline-flex items-center bg-teal-600 text-white px-5 py-2 rounded-full text-xl font-bold shadow-lg">
            Research Areas
            </div>
            <div className="mt-6 bg-white rounded-lg shadow-md p-6 border-l-4 border-teal-600">
              
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
          </div>
        </div>
      </main>
    </div>
   
    </>
  );
};

export default ResearchAreas;
