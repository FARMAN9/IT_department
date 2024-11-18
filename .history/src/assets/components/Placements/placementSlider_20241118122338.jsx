import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PlacementSlider = () => {
  const profiles = [
    {
      name: "Kanav Phull",
      company: "Rapidfort",
      score: "30 LPA",
      image: "/api/placeholder/80/80",
    },
    {
      name: "Anubhav Gupta",
      company: "Writesonic",
      score: "27 LPA",
      image: "/api/placeholder/80/80",
    },
    {
      name: "Anubhav Gupta",
      company: "Writesonic",
      score: "27 LPA",
      image: "/api/placeholder/80/80",
    },
    // Add more profiles as needed
  ];

  const scrollContainer = React.useRef();
  const autoSlide = React.useRef(null);

  React.useEffect(() => {
    autoSlide.current = setInterval(() => {
      scrollContainer.current.scrollBy({ left: 200, behavior: "smooth" });
    }, 3000);

    return () => clearInterval(autoSlide.current);
  }, []);

  const stopAutoSlide = () => clearInterval(autoSlide.current);
  const startAutoSlide = () => {
    autoSlide.current = setInterval(() => {
      scrollContainer.current.scrollBy({ left: 200, behavior: "smooth" });
    }, 3000);
  };

  const scrollLeft = () => {
    scrollContainer.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainer.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 border">
      <div className="mb-8">
        <h2 className="m-4 text-2xl font-bold text-white bg-blue-400 border rounded block p-2">
          Current Top Placements
        </h2>
      </div>

      <div className="relative">
        <div
          ref={scrollContainer}
          onMouseEnter={stopAutoSlide}
          onMouseLeave={startAutoSlide}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {profiles.map((profile, index) => (
            <div key={index} className="flex-none">
              <div className="w-64 bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden">
                    <img
                      src={profile.image}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-600">
                      {profile.name}
                    </h3>
                    <p className="text-gray-600">{profile.company}</p>
                    <p className="text-gray-800 font-medium mt-1">
                      {profile.score}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg">
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      <div className="mt-6 text-center">
        <button className="text-blue-500 hover:text-blue-700 font-medium">
          View More
        </button>
      </div>
    </div>
  );
};

export default PlacementSlider;
