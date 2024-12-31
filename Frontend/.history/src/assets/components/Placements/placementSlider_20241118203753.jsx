import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const placementData = [
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
    name: "Ravi Kumar",
    company: "Google",
    score: "40 LPA",
    image: "/api/placeholder/80/80",
  },
  {
    name: "Priya Sharma",
    company: "Microsoft",
    score: "35 LPA",
    image: "/api/placeholder/80/80",
  },
  {
    name: "More Opportunities",
    company: "Join Us",
    score: "",
    image: "/api/placeholder/80/80",
  },
];

const PlacementSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setCardsToShow(3);
      } else if (window.innerWidth >= 768) {
        setCardsToShow(2);
      } else {
        setCardsToShow(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex >= placementData.length - cardsToShow ? 0 : nextIndex;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [cardsToShow]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= placementData.length - cardsToShow ? 0 : nextIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      return nextIndex < 0 ? placementData.length - cardsToShow : nextIndex;
    });
  };

  const getTranslateValue = () => {
    return -(currentIndex * (100 / cardsToShow));
  };

  return (
    <div className="bg-gray-100 py-10">
      {/* Header */}
      <div className="text-center space-y-4 pb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Top Placements
        </h2>
        <p className="text-gray-600 px-4 md:px-16">
          Explore the achievements of our students and envision the
          possibilities for you.
        </p>
      </div>

      {/* Slider */}
      <div className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-full shadow-md z-10">
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-full shadow-md z-10">
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Cards */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(${getTranslateValue()}%)` }}>
            {placementData.map((placement, index) => (
              <div
                key={index}
                className={`flex ${
                  cardsToShow === 3
                    ? "w-1/3"
                    : cardsToShow === 2
                    ? "w-1/2"
                    : "w-full"
                } px-3`}>
                <div className="bg-white hover:shadow-lg transition-shadow p-4 sm:p-6 rounded-lg border border-gray-200">
                  <div className="text-center">
                    <img
                      src={placement.image}
                      alt={placement.name}
                      className="mx-auto rounded-full w-14 h-14 sm:w-16 sm:h-16 mb-4"
                    />
                    <h3 className="text-lg font-semibold text-gray-800">
                      {placement.name}
                    </h3>
                    <p className="text-sm text-gray-600">{placement.company}</p>
                    {placement.score && (
                      <p className="text-xl font-bold text-gray-700 mt-2">
                        {placement.score}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: placementData.length - (cardsToShow - 1) }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-gray-800" : "bg-gray-400"
                }`}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default PlacementSlider;
