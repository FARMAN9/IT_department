import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const placementData = [
  {
    name: "Kanav Phull",
    company: "Rapidfort",
    score: "30 LPA",
    image: "https://via.placeholder.com/80",
  },
  {
    name: "Anubhav Gupta",
    company: "Writesonic",
    score: "27 LPA",
    image: "https://via.placeholder.com/80",
  },
  {
    name: "Ravi Kumar",
    company: "Google",
    score: "40 LPA",
    image: "https://via.placeholder.com/80",
  },
  {
    name: "Priya Sharma",
    company: "Microsoft",
    score: "35 LPA",
    image: "https://via.placeholder.com/80",
  },
  {
    name: "More Opportunities",
    company: "Join Us",
    score: "",
    image: "https://via.placeholder.com/80",
  },
];

const PlacementSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);

  // Handle resize and set cards to show
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

    // Initial call
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto slide functionality
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
    <div className="border shadow-md rounded-md shadow-blue-200 md:flex text-gray-900 py-14 sm:pb-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="space-y-4 pb-12">
          <p className="text-3xl font-semibold text-center sm:text-4xl font-serif">
            Top Placements
          </p>
          <p className="text-center sm:px-44">
            See our students' amazing achievements and opportunities for you.
          </p>
        </div>

        {/* Placement Slider */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute md:left-0 left-8 top-1/2 -translate-y-1/2 -translate-x-12 p-2 rounded-full bg-blue-200 hover:bg-blue-300 transition-colors z-10"
            aria-label="Previous placement">
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute md:right-0 right-8 top-1/2 -translate-y-1/2 translate-x-12 p-2 rounded-full bg-blue-200 hover:bg-blue-300 transition-colors z-10"
            aria-label="Next placement">
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Placement Cards */}
          <div className="overflow-hidden relative px-4">
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
                    className={`card text-center space-y-6 p-6 ${
                      placement.name === "More Opportunities"
                        ? "bg-blue-50 border-2 border-blue-500"
                        : "bg-white"
                    } rounded-lg shadow-lg h-full`}>
                    <div className="grid place-items-center">
                      <img
                        src={placement.image}
                        alt={placement.name}
                        className="rounded-full w-16 h-16"
                      />
                    </div>
                    <p
                      className={`text-lg font-semibold ${
                        placement.name === "More Opportunities"
                          ? "text-blue-600"
                          : "text-gray-800"
                      }`}>
                      {placement.name}
                    </p>
                    <p className="text-gray-600">{placement.company}</p>
                    {placement.score && (
                      <p className="text-xl font-bold text-gray-800">
                        {placement.score}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {Array.from({
              length: placementData.length - (cardsToShow - 1),
            }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-blue-500" : "bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to placement set ${index + 1}`}></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementSlider;
