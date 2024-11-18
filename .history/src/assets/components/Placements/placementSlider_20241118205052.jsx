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
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, cardsToShow]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % placementData.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + placementData.length) % placementData.length
    );
  };

  const getTranslateValue = () => {
    const cardWidth = 100 / cardsToShow;
    return -(currentIndex * cardWidth);
  };

  return (
    <div className="border shadow-md rounded-md shadow-blue-200 bg-slate-100 py-8 sm:py-14">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 pb-8 sm:pb-12">
          <p className="text-2xl sm:text-3xl font-semibold bg-blue-400 rounded-lg font-serif py-2 px-4">
            Top Placements
          </p>
          <p className="text-sm sm:text-base text-gray-600 px-4 sm:px-32">
            See our students' amazing achievements and opportunities for you.
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-200 hover:bg-blue-300 transition-colors z-10"
            aria-label="Previous slide">
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-200 hover:bg-blue-300 transition-colors z-10"
            aria-label="Next slide">
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Placement Cards */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(${getTranslateValue()}%)`,
                width: `${placementData.length * (100 / cardsToShow)}%`,
              }}>
              {placementData.map((placement, index) => (
                <div
                  key={index}
                  className={`px-2 flex-shrink-0 ${
                    cardsToShow === 3
                      ? "w-1/3"
                      : cardsToShow === 2
                      ? "w-1/2"
                      : "w-full"
                  }`}>
                  <div
                    className={`p-6 text-center rounded-lg shadow-md border ${
                      placement.name === "More Opportunities"
                        ? "bg-blue-50 border-blue-500"
                        : "bg-white"
                    }`}>
                    <img
                      src={placement.image}
                      alt={placement.name}
                      className="rounded-full w-16 h-16 mx-auto mb-4"
                    />
                    <p
                      className={`font-semibold text-lg ${
                        placement.name === "More Opportunities"
                          ? "text-blue-600"
                          : "text-gray-800"
                      }`}>
                      {placement.name}
                    </p>
                    <p className="text-gray-600">{placement.company}</p>
                    {placement.score && (
                      <p className="font-bold text-gray-800">
                        {placement.score}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {placementData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-blue-500" : "bg-gray-300"
                }`}
                aria-label={`Slide ${index + 1}`}></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementSlider;
