import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../UtilityCompoments/Loading";
import Errors from "../UtilityCompoments/Errors";

import {
  fetchMissions,
  fetchVisions,
} from "../../Features/VisionAndMissionslice";
import { fetchMainDepartmentData } from "../../Features/MainDepartmentSlice";

const MissionAndVision = () => {
  const dispatch = useDispatch();

  const { missions, visions, loading, error } = useSelector(
    (state) => state.VisionAndMissionData
  );

  const { MainDepartmentInfo } = useSelector(
    (state) => state.MainDepartmentData
  );

  useEffect(() => {
    dispatch(fetchMissions());
    dispatch(fetchVisions());
    dispatch(fetchMainDepartmentData());
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
        <Loading />
      </>
    );
  }

  if (error) {
    return <Errors error={error.error} />;
  }

  return (
    <>
      <div className="card  bg-base-100 w-full sm:w-auto  shadow-xl">
        <figure className="h-[40%]">
          <iframe
            className=" h-full w-full"
            src={MainDepartmentInfo.Youtube_Link}
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
