import React from "react";
import AcademicSidebar from "../Sidebar/Sidebar";
import ImageSlide from "../ImageSlide/ImageSlide";
import DepartmentOfItInfo from "../Department_of_It/Department_of_it_info";
import Mission_and_Vision from "../Mission_and_Vision/Mission_and_Vision";
import HodCard from "../Hod/HodCard";
import Card from "../Activites/Card";
import PlacementSlider from "../Placements/placementSlider";

const name = "Activities";
const name2 = "News & Highlights";

function Main() {
  return (
    <>
      <div className="min-h-auto flex flex-col lg:flex-row lg:mr-10">
        {/* Sidebar */}
        

        {/* Main Content */}
        <main className="flex-1 lg:ml-10 p-4 lg:p-6 ">
          {/* Image Slider */}
          <ImageSlide />
          <hr className="my-4" />

          {/* Department Info and Mission & Vision */}
          <div className="flex flex-col lg:flex-row gap-6">
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
              <Card title={name} />
            </div>
            <div className="hidden lg:block w-px bg-gray-300"></div>
            <div className="flex-1">
              <Card title={name2} />
            </div>
          </div>
          <hr className="my-4" />

          {/* HoD Card */}
          <HodCard />
          <hr className="my-4" />

          {/* Placement Slider */}
          <PlacementSlider />
        </main>
      </div>
    </>
  );
}

export default Main;
