import React, { useState , useEffect,useMemo} from 'react';
import { Heart, Share2, Download } from 'lucide-react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchGalleryData } from '../../../Features/GallerySlice';

// Generate varied height placeholder images to create masonry effect


function Gallery() {

  const dispatch = useDispatch();
  const { GalleryImage, loading, error } = useSelector((state) => state.GalleryData);

  useEffect(() => {
    dispatch(fetchGalleryData()); // Dispatch the API call on component mount
  }, [dispatch]);


  console.log("GalleryData->",GalleryImage)

  return (

<>
    <>
    <div className="min-h-auto flex lg:mr-10">
  <main className="flex-1 lg:ml-10 p-2 lg:p-4">
    <div className="max-w-9xl mx-auto p-0 pt-4 space-y-8">
      
      {/* Coordinator Section */}
      <div className="relative">
        <div className="mt-20 lg:mt-0 xl:mt-0 inline-flex items-center bg-teal-600 text-white px-5 py-2 rounded-full text-xl font-bold shadow-lg">
        Gallery
        </div>
        <div className="mt-6 bg-white rounded-lg shadow-md p-6 border-l-4 border-teal-600">
        
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
                        className={`h-5 w-5 ${photo.liked ? 'fill-red-500 text-red-500' : 'text-gray-700'}`}
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
      
        </div>
      </div>
    </div>
  </main>
</div>


</>

</>
  );
}

export default React.memo(Gallery); // Use React.memo to memoize Gallery;