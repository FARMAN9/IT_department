import React, { useMemo, useState, useEffect } from "react";

import { Lightbulb } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../UtilityCompoments/Loading";
import Errors from "../UtilityCompoments/Errors";

import MainCard from "../Activites/MainCard";

import {
  fetchMissions,
  fetchVisions,
} from "../../Features/VisionAndMissionslice";

// Memoized Vision Item for optimization
const VisionItem = React.memo(({ children }) => (
  <div className="flex gap-4 items-start">
    <Lightbulb className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
    <p className="text-gray-700 leading-relaxed">{children}</p>
  </div>
));

const MissionItem = React.memo(({ children }) => (
  <div className="flex gap-4 items-start">
    <Lightbulb className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
    <p className="text-gray-700 leading-relaxed">{children}</p>
  </div>
));

function Main() {
  document.title = "Vision and Mission";
  // Memoizing the vision and missions data to prevent re-renders
  const dispatch = useDispatch();

  const { missions, visions, loading, error } = useSelector(
    (state) => state.VisionAndMissionData
  );

  useEffect(() => {
    dispatch(fetchMissions());
    dispatch(fetchVisions());
  }, [dispatch]);

  const vision = useMemo(() => visions, [visions]);
  const mission = useMemo(() => missions, [missions]);

  if (loading) {
    return (
      <MainCard title="Vision and Mission">
        <Loading />
      </MainCard>
    );
  }

  if (error) {
    return (
      <MainCard>
        <Errors error={error} />
      </MainCard>
    );
  }

  return (
    <>
      <MainCard title="Vision and Mission">
        <div className="relative  p-1">
          <div className="mt-0 sm:mt-0 lg:mt-0 xl:mt-0 inline-flex items-center bg-teal-600 text-white px-6 py-1 rounded-full text-lg font-medium shadow-lg">
            Vision
          </div>
          <div className="mt-3 bg-white rounded-lg shadow-md p-3 border-l-4 border-teal-600">
            {vision.map((item, index) => (
              <VisionItem key={index}>{item.vision}</VisionItem>
            ))}
          </div>
        </div>

        {/* Missions Section */}
        <div className="relative  p-1">
          <div className="mt-1 sm:mt-0 lg:mt-0 xl:mt-0 inline-flex items-center bg-teal-600 text-white px-6 py-1 rounded-full text-lg font-medium shadow-lg">
            Missions
          </div>

          <div className="mt-3 bg-white rounded-lg shadow-md p-3 space-y-0 border-l-4 border-teal-600">
            {mission.map((mission, index) => (
              <MissionItem key={index}>{mission.mission}</MissionItem>
            ))}
          </div>
        </div>
      </MainCard>
    </>
  );
}

export default React.memo(Main);
