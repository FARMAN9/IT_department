import React, { useMemo } from "react";
import AcademicSidebar from "../Sidebar/Sidebar";
import { Lightbulb } from "lucide-react";

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
  // Memoizing the vision and missions data to prevent re-renders
  const vision = useMemo(
    () => [
      "To build a rich intellectual potential embedded with interdisciplinary knowledge, human values and professional ethics to make them globally competitive in education, industry, research and development and adapt with the changing technological environment.",
    ],
    [] // Empty dependency ensures this doesn't change unnecessarily
  );

  const missions = useMemo(
    () => [
      "To provide globally relevant, interdisciplinary and multifaceted knowledge in information technology.",
      "To build, provide knowledge, facilities, and support industrial internship programs and higher education.",
      "To nourish creativity, innovation and entrepreneurial spirit for solving real world problems using information technology.",
    ],
    [] // Empty dependency ensures this doesn't change unnecessarily
  );

  return (
    <>
      <div className="min-h-auto flex lg:mr-10">
        
        <main className="flex-1 lg:ml-10 p-2 lg:p-6">
          <div className="max-w-6xl mx-auto p-6 space-y-8">
            {/* Vision Section */}
            <div className="relative">
              <div className="mt-20 lg:mt-0 xl:mt-0 inline-flex items-center bg-teal-600 text-white px-6 py-2 rounded-full text-xl font-bold shadow-lg">
                Vision
              </div>

              <div className="mt-6 bg-white rounded-lg shadow-md p-6 border-l-4 border-teal-600">
                {vision.map((item, index) => (
                  <VisionItem key={index}>{item}</VisionItem>
                ))}
              </div>
            </div>

            {/* Missions Section */}
            <div className="relative">
              <div className="inline-flex items-center bg-teal-600 text-white px-6 py-2 rounded-full text-xl font-bold shadow-lg">
                Missions
              </div>

              <div className="mt-6 bg-white rounded-lg shadow-md p-6 space-y-4 border-l-4 border-teal-600">
                {missions.map((mission, index) => (
                  <MissionItem key={index}>{mission}</MissionItem>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Main;
