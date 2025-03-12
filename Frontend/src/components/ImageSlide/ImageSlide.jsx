import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMainData } from "../../Features/MainImages";
import { debounce } from "lodash";

const ImageSlider = () => {
  const dispatch = useDispatch();
  const { imageSlider, loading, error } = useSelector(
    (state) => state.MainImagesData
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(0);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(true);

  // Configuration
  const ASPECT_RATIO = 0;
  const MOBILE_BREAKPOINT = 768;
  const VISIBLE_ITEMS = 1;

  // Fetch data
  useEffect(() => {
    if (imageSlider.length === 0) {
      dispatch(fetchMainData());
    }
  }, [dispatch, imageSlider.length]);

  // Responsive checks
  const checkResponsive = useCallback(() => {
    setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
  }, []);

  useEffect(() => {
    checkResponsive();
    const debouncedResize = debounce(checkResponsive, 100);
    window.addEventListener("resize", debouncedResize);
    return () => window.removeEventListener("resize", debouncedResize);
  }, [checkResponsive]);

  // Duplicate images three times for seamless infinite scroll
  const allImages = useMemo(() => {
    return imageSlider.length
      ? [...imageSlider, ...imageSlider, ...imageSlider]
      : [];
  }, [imageSlider]);

  // Initialize slider index to start at the middle copy
  useEffect(() => {
    if (imageSlider.length) {
      setCurrentIndex(imageSlider.length);
      setIsAnimating(true);
    }
  }, [imageSlider.length]);

  // Handle continuous scroll: if index goes out of middle copy, reset it
  const handleContinuousScroll = useCallback(() => {
    if (!imageSlider.length) return;

    // Forward: if we have advanced past the middle copy
    if (currentIndex >= imageSlider.length * 2) {
      setIsAnimating(false);
      setTimeout(() => {
        setCurrentIndex(currentIndex - imageSlider.length);
        setTimeout(() => setIsAnimating(true), 50);
      }, 0);
    }
    // Backward: if we move before the middle copy
    else if (currentIndex < imageSlider.length) {
      setIsAnimating(false);
      setTimeout(() => {
        setCurrentIndex(currentIndex + imageSlider.length);
        setTimeout(() => setIsAnimating(true), 50);
      }, 0);
    }
  }, [currentIndex, imageSlider.length]);

  useEffect(() => {
    handleContinuousScroll();
  }, [currentIndex, handleContinuousScroll]);

  // Navigation: update currentIndex based on direction
  const navigateSlide = useCallback(
    (direction) => {
      setCurrentIndex((prev) => {
        const newIndex = direction === "next" ? prev + 1 : prev - 1;
        return (newIndex + allImages.length) % allImages.length;
      });
    },
    [allImages.length]
  );

  // Auto-slide management
  const startAutoSlide = useCallback(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => navigateSlide("next"), 3000);
    }
  }, [navigateSlide]);

  const stopAutoSlide = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  // Touch handling
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    stopAutoSlide();
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX.current - touchEndX;
    if (Math.abs(deltaX) > 50) {
      deltaX > 0 ? navigateSlide("next") : navigateSlide("prev");
    }
    startAutoSlide();
  };

  // Visibility observer to auto-start/stop when in/out of viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? startAutoSlide() : stopAutoSlide()),
      { threshold: 0.75 }
    );
    if (sliderRef.current) observer.observe(sliderRef.current);
    return () => observer.disconnect();
  }, [startAutoSlide, stopAutoSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") navigateSlide("prev");
      if (e.key === "ArrowRight") navigateSlide("next");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigateSlide]);

  if (loading) return <div className="aspect-video animate-pulse rounded-lg" />;
  if (error)
    return <div className="text-red-500 p-4">Error loading images</div>;

  return (
    <div className="flex w-full h-[40vh] overflow-hidden border-l-4 border-teal-600 rounded-xl">
      <div
        ref={sliderRef}
        className="relative "
        onMouseEnter={stopAutoSlide}
        onMouseLeave={startAutoSlide}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-label="Image reel"
      >
        {/* Slides container */}
        <div
          className="flex"
          style={{
            transform: `translateX(-${
              (currentIndex * 100) / (isMobile ? 1 : VISIBLE_ITEMS)
            }%)`,
            transition: isAnimating
              ? "transform 600ms cubic-bezier(0.4, 0, 0.2, 1)"
              : "none",
            willChange: "transform",
          }}
        >
          {allImages.map((slide, index) => {
            const realIndex = index % imageSlider.length;
            const isActive = currentIndex % imageSlider.length === realIndex;
            return (
              <div
                key={`${slide.id}-${index}`}
                className="relative flex-shrink-0"
                style={{
                  width: `calc(${100 / (isMobile ? 1 : VISIBLE_ITEMS)}%)`,
                  transition: "all 600ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                aria-hidden={!isActive}
              >
                <img
                  src={slide.image}
                  alt={`Slide ${realIndex + 1}`}
                  className="w-full h-full object-contain "
                  loading={index < VISIBLE_ITEMS ? "eager" : "lazy"}
                  decoding="async"
                />
                {slide.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-white text-center text-sm">
                    {slide.caption}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress indicators */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
          {imageSlider.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(imageSlider.length + index)}
              className={`h-1 rounded-full transition-all duration-300 ${
                currentIndex % imageSlider.length === index
                  ? "bg-white w-6"
                  : "bg-white/30 w-3"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ImageSlider);
