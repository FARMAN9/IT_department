import React from "react";
import { FileText, Award, Quote, Users, MapPin, Trophy } from "lucide-react";

const AchievementCard = ({ icon: Icon, title, value, className = "" }) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-6 hover:shadow-lg transition-shadow">
    <div className="w-16 h-16 flex items-center justify-center">{Icon}</div>
    <div>
      <h3 className="text-gray-800 font-semibold text-lg">{title}</h3>
      <p className="text-blue-600 font-bold text-2xl">{value}</p>
    </div>
  </div>
);

function Main() {
  return (
    <>
      <div className="min-h-screen flex lg:mr-10">
        <main className="flex-1 lg:ml-10 p-2 lg:p-6">
          <div className=" mx-auto  space-y-0  bg-white">
            {/* Header */}
            <div className="mb-10 flex ">
              <div className="mt-20 lg:mt-0 xl:mt-0 inline-flex items-center bg-teal-600 text-white px-6 py-2 rounded-full text-xl font-bold shadow-lg">
                Achievements
              </div>
            </div>
            {/* Achievement Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AchievementCard
                icon={
                  <FileText
                    className="w-12 h-12 text-teal-600"
                    strokeWidth={1.5}
                  />
                }
                title="Publications"
                value="160"
              />

              <AchievementCard
                icon={
                  <Award
                    className="w-12 h-12 text-teal-600"
                    strokeWidth={1.5}
                  />
                }
                title="Patents"
                value="10"
              />

              <AchievementCard
                icon={
                  <Quote
                    className="w-12 h-12 text-teal-600"
                    strokeWidth={1.5}
                  />
                }
                title="Citations"
                value="10000+"
              />

              <AchievementCard
                icon={
                  <Users
                    className="w-12 h-12 text-teal-600"
                    strokeWidth={1.5}
                  />
                }
                title="Faculty Strength"
                value="9"
              />

              <AchievementCard
                icon={
                  <MapPin
                    className="w-12 h-12 text-teal-600"
                    strokeWidth={1.5}
                  />
                }
                title="Placements"
                value="98.3%"
              />

              <AchievementCard
                icon={
                  <Trophy
                    className="w-12 h-12 text-teal-600"
                    strokeWidth={1.5}
                  />
                }
                title="Highest Package"
                value="51 LPA"
              />
            </div>
          </div>

          {/* Placeholder content 
          <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
           
            <img
              src="https://giffiles.alphacoders.com/158/158667.gif"
              alt="Placeholder"
              className="mb-4 bg-white rounded-lg
               shadow-lg transform transition-transform hover:shadow-2xl hover:scale-105"
            />
              </div>
              */}
        </main>
      </div>
    </>
  );
}

export default Main;
