import React, { useState, useEffect, useRef } from "react";

const images = [
  "https://images.pexels.com/photos/16689050/pexels-photo-16689050/free-photo-of-woman-hand-on-koran.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/8489005/pexels-photo-8489005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/2432394/pexels-photo-2432394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/8075987/pexels-photo-8075987.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  // Function to handle moving to the next image
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to handle moving to the previous image
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
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
      className="relative flex mt-3 justify-center items-center w-full h-[400px] perspective-[1000px]"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}>
      {/* Slider Wrapper */}
      <div className="relative w-full h-full overflow-hidden">
        <div
          className="absolute inset-0 flex transition-transform duration-700"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}>
          {images.map((src, index) => (
            <div
              key={index}
              className="min-w-full h-full transform transition-all duration-700"
              style={{
                transform: `rotateY(${(index - currentIndex) * 30}deg) scale(${
                  index === currentIndex ? 1 : 0.9
                })`,
                zIndex: index === currentIndex ? 10 : 5,
              }}>
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2">
        ‹
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2">
        ›
      </button>
    </div>
  );
}
