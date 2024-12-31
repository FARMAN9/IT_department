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
    const cardWidth = 100 / cardsToShow;
    return -(currentIndex * cardWidth);
  };

  return (
    <div className="border rounded-lg shadow-lg shadow-blue-200 py-8 sm:py-14">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="space-y-3 pb-8 sm:pb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center font-serif">
            Top Placements
          </h2>
          <p className="text-sm sm:text-base text-center text-gray-600 max-w-2xl mx-auto px-4">
            See our students' amazing achievements and opportunities for you.
          </p>
        </div>

        {/* Placement Slider */}
        <div className="relative max-w-4xl mx-auto z-1">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-6 p-1.5 sm:p-2 rounded-full bg-blue-200 hover:bg-blue-300 transition-colors z-10"
            aria-label="Previous placement">
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-6 p-1.5 sm:p-2 rounded-full bg-blue-200 hover:bg-blue-300 transition-colors z-10"
            aria-label="Next placement">
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>

          {/* Placement Cards */}
          <div className="overflow-hidden px-2 sm:px-4">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(${getTranslateValue()}%)`,
              }}>
              {placementData.map((placement, index) => (
                <div
                  key={index}
                  className={`px-2 ${
                    cardsToShow === 3
                      ? "w-1/3"
                      : cardsToShow === 2
                      ? "w-1/2"
                      : "w-full"
                  } flex-shrink-0`}>
                  <div
                    className={`card text-center p-4 sm:p-6 space-y-4 sm:space-y-6 ${
                      placement.name === "More Opportunities"
                        ? "bg-blue-50 border-2 border-blue-500"
                        : "bg-white"
                    } rounded-lg shadow-md h-full`}>
                    <div className="grid place-items-center">
                      <img
                        src={placement.image}
                        alt={placement.name}
                        className="rounded-full w-12 h-12 sm:w-16 sm:h-16"
                      />
                    </div>
                    <div className="space-y-2">
                      <p
                        className={`text-base sm:text-lg font-semibold ${
                          placement.name === "More Opportunities"
                            ? "text-blue-600"
                            : "text-gray-800"
                        }`}>
                        {placement.name}
                      </p>
                      <p className="text-sm sm:text-base text-gray-600">
                        {placement.company}
                      </p>
                      {placement.score && (
                        <p className="text-lg sm:text-xl font-bold text-gray-800">
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
          <div className="flex justify-center space-x-2 mt-4 sm:mt-6">
            {Array.from({
              length: placementData.length - (cardsToShow - 1),
            }).map((_, index) => (
              <button
                key={index}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-blue-500" : "bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to placement set ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementSlider;
