import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchMissions, fetchVisions } from "../../../Features/VisionAndMissionslice";

const MissionAndVision = () => {
 
  
  const dispatch = useDispatch();

  const { missions, visions, loading, error } = useSelector(state => state.VisionAndMissionData);


  useEffect(() => {
    dispatch(fetchMissions());
    dispatch(fetchVisions());
  }, [dispatch]);
  

   

  const handleReadMore = (e) => {
    e.preventDefault();
    // You can handle navigation programmatically here
    window.location.href = '/about/vision';
    // Or use your app's navigation method
    // navigation.navigate('/about/vision');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 text-center">
        <p>Error loading content: {error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-1 bg-transparent w-full rounded-lg shadow-lg text-sm sm:text-base lg:text-lg overflow-hidden">
      <div className="p-0 m-0">
        <div className="relative pt-[56.25%]">
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
            src="https://www.youtube.com/embed/gPfEJLt4nCc"
            title="Mission and Vision Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 text-center">
        Our Vision  
        </h2>
        <div className="text-gray-600 mt-2">
          {visions.length > 0 ? (
            visions.map((item, index) => (
              <li key={index} className="mb-2">
                {item.vision}
              </li>
            ))
          ) : (
            <li>No vision statement available</li>
          )}
        </div>
      </div>

      

      <div className="p-3 border-t border-gray-200">
        <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 text-center">
           Our Mission
        </h2>
        {missions.length > 0 ? (
          <ul className="list-disc pl-6 text-gray-600 mt-2">
            {missions.map((item, index) => (
              <li key={index} className="mb-2">
                {item.mission}
              </li>
            ))}
          </ul>
        ) : (
          <li className="text-gray-600 mt-2">No mission statement available</li>
        )}

        <div className="flex justify-center mt-4">
          <button 
            onClick={handleReadMore}
            className="align-left bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-2xl transition duration-300"
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissionAndVision;