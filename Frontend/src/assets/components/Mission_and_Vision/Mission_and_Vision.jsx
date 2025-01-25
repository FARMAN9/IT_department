import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchMissions,
  fetchVisions,
} from "../../../Features/VisionAndMissionslice";

const MissionAndVision = () => {
  const dispatch = useDispatch();

  const { missions, visions, loading, error } = useSelector(
    (state) => state.VisionAndMissionData
  );

  useEffect(() => {
    dispatch(fetchMissions());
    dispatch(fetchVisions());
  }, [dispatch]);

  const handleReadMore = (e) => {
    e.preventDefault();
    // You can handle navigation programmatically here
    window.location.href = "/about/vision";
    // Or use your app's navigation method
    // navigation.navigate('/about/vision');
  };

  if (loading) {
    return (
      <>
        <div className="card bg-base-100 w-full sm:w-auto  shadow-xl">
          <div className="flex w-52 flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div role="alert" className="alert ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{error}</span>
        <button
          onClick={() => window.location.reload()}
          className="btn btn-primary"
        >
          Reload
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="card  bg-base-100 w-full sm:w-auto  shadow-xl">
        <figure className="h-[40%]">
          <iframe
            className=" h-full w-full"
            src="https://www.youtube.com/embed/gPfEJLt4nCc"
            title="Mission and Vision Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </figure>
        <div className="card-body">
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
              <li className="text-gray-600 mt-2">
                No mission statement available
              </li>
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

          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </>
  );
};

export default MissionAndVision;
