import React from "react";
import AcademicSidebar from "../Sidebar/Sidebar";
import ImageSlide from "../ImageSlide/ImageSlide";
import DepartmentOfItInfo from "../Department_of_It/Department_of_it_info";
import Mission_and_Vision from "../Mission_and_Vision/Mission_and_Vision";
import HodCard from "../Hod/HodCard";
import Card from "../Activites/Card";
import PlacementSlider from "../Placements/placementSlider";

const Main = () => {
  const activitiesTitle = "Activities";
  const newsTitle = "News & Highlights";

  return (
    <div className="min-h-auto flex lg:mr-10">
    

      {/* Main Content */}
      <main className="flex-2 lg:ml-10 p-4 lg:p-6">
        <div className="max-w-6xl mx-auto p-4 space-y-8 bg-white">
        {/* Image Slider */}
        <ImageSlide />
        <hr className="my-4" />

        {/* Department Info and Mission & Vision */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <DepartmentOfItInfo />
          </div>
          <div className="hidden lg:block w-px bg-gray-300"></div>
          <div className="flex-1">
            <Mission_and_Vision />
          </div>
        </div>
        <hr className="my-4" />

        {/* Activities and News */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <Card title={activitiesTitle} />
          </div>
          <div className="hidden lg:block w-px bg-gray-300"></div>
          <div className="flex-1">
            <Card title={newsTitle} />
          </div>
        </div>
        <hr className="my-4" />

        {/* HoD Card */}
        <HodCard />
        <hr className="my-4" />

        {/* Placement Slider */}
        <PlacementSlider />
        </div>
      </main>
    </div>
  );
};

export default Main;
