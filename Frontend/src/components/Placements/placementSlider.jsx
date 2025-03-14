import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import NoDP from "../../assets/blankProfile.png";

import { fetchCurrentTopPlacementsData } from "../../Features/TopplacementSlice";
import { Link } from "react-router-dom";

const PlacementSlider = () => {
  const dispatch = useDispatch();
  const { CurrentTopPlacements, loading, error } = useSelector(
    (state) => state.CurrentTopPlacementsData
  );

  useEffect(() => {
    dispatch(fetchCurrentTopPlacementsData());
  }, [dispatch]);

  const placementData = useMemo(
    () => CurrentTopPlacements,
    [CurrentTopPlacements]
  );
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
    <div className="border shadow-md rounded-md shadow-blue-200 py-8 sm:py-14">
      <div className="flex-col mx-auto px-4 ">
        {/* Header */}
        <div className="space-y-4 pb-8 sm:pb-12">
          <p className="text-2xl lg:text-3xl  text-center text-white bg-blue-400 block rounded-lg  ">
            Top Placements
          </p>
          <p className="text-lg lg:text-xl  text-center px-4 sm:px-44 text-gray-600">
            See our students' amazing achievements and opportunities for you.
          </p>
        </div>

        {/* Placement Slider */}
        <div className="relative ">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-200 hover:bg-blue-300 transition-colors z-10"
            aria-label="Previous placement"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-200 hover:bg-blue-300 transition-colors z-10"
            aria-label="Next placement"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Placement Cards */}
          <div className="overflow-hidden w-[320px]   h-auto md:w-full lg:w-full ">
            <div
              className="flex  m-5 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(${getTranslateValue()}%)`,
              }}
            >
              {placementData.map((placement, index) => (
                <div
                  key={index}
                  className={`p-4 inline ${
                    cardsToShow === 3
                      ? "w-1/3 "
                      : cardsToShow === 4
                      ? "w-1/2 h-full"
                      : "w-full"
                  } flex-shrink-0`}
                >
                  <div
                    className={` text-center space-y-4 sm:space-y-6 p-4 sm:p-6 ${
                      placement.name === "More Opportunities"
                        ? "bg-blue-50 border-2 border-blue-500"
                        : "bg-white"
                    } rounded-lg shadow-lg h-full`}
                  >
                    <div className="grid place-items-center">
                      <img
                        src={placement.image === "" ? NoDP : placement.image}
                        alt={placement.name}
                        className="mask mask-circle w-40 h-40 object-cover border bg-blue-800 shadow-xl shadow-blue-500 hover:rotate-6"
                      />
                    </div>
                    <div className="space-y-2">
                      <p
                        className={`text-base sm:text-lg font-semibold ${
                          placement.name === "More Opportunities"
                            ? "text-blue-600"
                            : "text-gray-800"
                        }`}
                      >
                        {placement.name}
                      </p>
                      <p className="text-sm sm:text-base text-gray-600">
                        {placement.company}
                      </p>
                      {placement.lpa && (
                        <p className="text-lg sm:text-xl font-bold text-gray-800">
                          {placement.lpa}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <p className="text-sm sm:text-base text-gray-600"></p>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-2">
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
          <div>
            <div className="flex justify-center mt-6">
              <Link to="/placements/top-placements">
                <button className="btn btn-active lg:text-lg md:text-base text-white btn-info">
                  View All
                </button>
              </Link>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default PlacementSlider;
