import React, { useEffect, useCallback, useState } from "react";
import { Heart, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGalleryData } from "../../Features/GallerySlice";
import MainCard from "../Activites/MainCard";
import Loading from "../UtilityCompoments/Loading";
import Errors from "../UtilityCompoments/Errors";

// GalleryItem Component: Reusable component for each gallery item
const GalleryItem = React.memo(({ photo, onLike, onClick }) => {
  return (
    <div className="break-inside-avoid mb-4 rounded-xl overflow-hidden relative group p-2 lg:p-4">
      <div 
        className="relative cursor-pointer"
        onClick={() => onClick(photo)}
      >
        <img
          src={photo.image}
          alt={`Photo ${photo.id}`}
          className="w-full rounded-xl object-cover transition-transform duration-200 group-hover:scale-[1.02]"
          loading="lazy"
        />
        {/* Hover overlay with buttons */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 rounded-xl">
          <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the image click
                onLike(photo.id);
              }}
              className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors duration-200"
              aria-label={photo.liked ? "Unlike photo" : "Like photo"}
            >
              <Heart
                size={20}
                className={`${
                  photo.liked ? "fill-red-500 text-red-500" : "text-gray-700"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

// For better component naming
GalleryItem.displayName = "GalleryItem";

// Main Gallery Component
function Gallery() {
  document.title = "Gallery";

  const dispatch = useDispatch();
  const { GalleryImage, loading, error } = useSelector(
    (state) => state.GalleryData
  );

  // State to manage the selected image for full-size view
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch gallery data on component mount
  useEffect(() => {
    dispatch(fetchGalleryData());
  }, [dispatch]);

  // Handle like functionality
  const handleLike = useCallback((photoId) => {
    console.log("Liked photo:", photoId);
    // Implement like functionality here
  }, []);

  // Handle image click to show full-size image
  const handleImageClick = useCallback((photo) => {
    console.log("Opening image:", photo.id);
    setSelectedImage(photo);
  }, []);

  // Close the full-size image view
  const closeFullSizeImage = useCallback(() => {
    setSelectedImage(null);
  }, []);

  // Handle escape key press to close modal
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape" && selectedImage) {
        closeFullSizeImage();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [selectedImage, closeFullSizeImage]);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedImage]);

  // Render loading state
  if (loading) {
    return (
      <MainCard title="Gallery">
        <Loading />
      </MainCard>
    );
  }

  // Render error state
  if (error) {
    return (
      <MainCard title="Gallery">
        <Errors error={error.error || "Please reload the page."} />
      </MainCard>
    );
  }

  // Show empty state
  if (!GalleryImage || GalleryImage.length === 0) {
    return (
      <MainCard title="Gallery">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="text-gray-400 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">No images found</h3>
          <p className="mt-1 text-sm text-gray-500">
            There are no images in the gallery at the moment.
          </p>
        </div>
      </MainCard>
    );
  }

  // Render gallery content
  return (
    <MainCard title="Gallery">
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 px-2 md:px-4">
        {GalleryImage.map((photo) => (
          <GalleryItem
            key={photo.id}
            photo={photo}
            onLike={handleLike}
            onClick={handleImageClick}
          />
        ))}
      </div>

      {/* Full-size image modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={closeFullSizeImage}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="relative max-w-5xl w-full max-h-full"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
          >
            <div className="relative">
              <img
                src={selectedImage.image}
                alt={`Full-size ${selectedImage.id}`}
                className="w-full max-h-[85vh] rounded-lg object-contain mx-auto"
                id="modal-title"
              />
              <button
                className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-200 shadow-lg"
                onClick={closeFullSizeImage}
                aria-label="Close image"
              >
                <X size={24} className="text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      )}
    </MainCard>
  );
}

export default React.memo(Gallery);