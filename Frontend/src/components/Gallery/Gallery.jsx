import React, { useState, useEffect, useMemo } from "react";
import { Heart, Share2, Download } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { fetchGalleryData } from "../../Features/GallerySlice";
import MainCard from "../Activites/MainCard";
import Loading from "../UtilityCompoments/Loading";
import Errors from "../UtilityCompoments/Errors";

// Generate varied height placeholder images to create masonry effect

function Gallery() {
  document.title = "Gallery";

  const dispatch = useDispatch();
  const { GalleryImage, loading, error } = useSelector(
    (state) => state.GalleryData
  );

  useEffect(() => {
    dispatch(fetchGalleryData()); // Dispatch the API call on component mount
  }, [dispatch]);

  console.log("GalleryData->", GalleryImage);

  const handleLike = (photoId) => {
    // Implement like functionality here
  };
  if (loading) {
    return (
      <MainCard title="Gallery">
        <Loading />
      </MainCard>
    );
  }

  if (error) {
    console.log("error", error);
    return (
      <MainCard title="Gallery">
        <Errors error={error.error || "Please reload ..." || error} />
      </MainCard>
    );
  }
  return (
    <MainCard title="Gallery">
      <div className="flex flex-wrap -mx-4">
        {/* Render photos using masonry layout */}
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
          {GalleryImage.map((photo) => (
            <div
              key={photo.id}
              className="break-inside-avoid mb-4 rounded-xl overflow-hidden relative group"
            >
              <div className="relative">
                <img
                  src={photo.image}
                  alt={`Photo ${photo.id}`}
                  className="w-full object-cover rounded-xl"
                  loading="lazy"
                />

                {/* Save button 
                <button className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Save
                </button>*/}

                {/* Hover overlay with buttons */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 rounded-xl">
                  <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => handleLike(photo.id)}
                      className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors duration-200"
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          photo.liked
                            ? "fill-red-500 text-red-500"
                            : "text-gray-700"
                        }`}
                      />
                    </button>
                    {/* Share and Download buttons 
                    <button className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors duration-200">
                      <Share2 className="h-5 w-5 text-gray-700" />
                    </button>
                    <button className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors duration-200">
                      <Download className="h-5 w-5 text-gray-700" />
                    </button>*/}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Render photos using masonry layout */}
      </div>
    </MainCard>
  );
}

export default React.memo(Gallery); // Use React.memo to memoize Gallery;
