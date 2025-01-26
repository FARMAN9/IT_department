import React, { useState, useEffect, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMainData } from "../../Features/MainImages";

function ImageSlider() {
  const dispatch = useDispatch();
  const { imageSlider, loading, error } = useSelector(
    (state) => state.MainImagesData
  );

  useEffect(() => {
    if (imageSlider.length === 0) {
      dispatch(fetchMainData()); // Dispatch the API call on component mount if data is not present
    }
  }, [dispatch, imageSlider]);

  const value = useMemo(() => imageSlider, [imageSlider]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  // Function to handle moving to the next image
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % value.length);
  };

  // Function to handle moving to the previous image
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? value.length - 1 : prevIndex - 1
    );
  };

  // Start auto-slide interval
  const startAutoSlide = () => {
    intervalRef.current = setInterval(handleNext, 2000); // Slide every 2 seconds
  };

  // Stop auto-slide interval
  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Start auto-slide on mount
  useEffect(() => {
    startAutoSlide();

    return () => stopAutoSlide(); // Cleanup interval on unmount
  }, []);

  return (
    <div
      className="relative justify-center items-center w-full h-[300px] perspective-[50px] border  rounded-md shadow-lg "
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      {/* Slider Wrapper */}
      <div className="relative w-full h-full overflow-hidden">
        <div
          className="absolute inset-0 flex transition-transform duration-700"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {value.map((src, index) => (
            <div
              key={index}
              className="min-w-full h-full transform transition-all duration-700  rounded-md shadow-lg"
              style={{
                transform: `rotateY(${(index - currentIndex) * 30}deg) scale(${
                  index === currentIndex ? 1 : 0.9
                })`,
                zIndex: index === currentIndex ? 10 : 5,
              }}
            >
              <img
                src={src.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover rounded-md shadow-lg bg-blue-200 "
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2"
      >
        ‹
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2"
      >
        ›
      </button>
    </div>
  );
}

export default React.memo(ImageSlider);
