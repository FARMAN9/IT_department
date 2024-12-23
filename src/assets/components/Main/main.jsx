import React from "react";
import AcademicSidebar from "../Sidebar/Sidebar";
import ImageSlide from "../ImageSlide/ImageSlide";
import DepartmentOfItInfo from "../Department_of_It/Department_of_it_info";
import Mission_and_Vision from "../Mission_and_Vision/Mission_and_Vision";
import HodCard from "../Hod/HodCard";
import Card from "../Activites/Card";
import PlacementSlider from "../Placements/placementSlider";
import Wellcome from "../Wellcome/Wellcome";

const Main = () => {
  const activitiesTitle = "Activities";
  const newsTitle = "News & Highlights";

  return (
    <>
    <div className=" min-h-full flex flex-col lg:flex-row ">
    <main className="flex-1 lg:ml-10 p-2 lg:p-4">
      <div className="max-w-6xl mx-auto lg:p-0 pt-4 space-y-8">
        
        {/* Coordinator Section */}
        <div className="relative">
          <div className="mt-20 lg:mt-0 bg-white rounded-lg shadow-md lg:p-6 xl:p-6 border-l-4 ">
            <div className="mb-3 ">
            <ImageSlide />
            </div>
            <div className="mb-3">
            <Wellcome />
            </div>
             <div className="mb-3">
             <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <DepartmentOfItInfo />
            </div>
            <div className="flex-1">
              <Mission_and_Vision />
            </div>
          </div>
             </div>
             <div className="mb-3">
             <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <Card title={activitiesTitle} />
            </div>
           
            <div className="flex-1">
              <Card title={newsTitle} />
            </div>
          </div>
             </div>

           
          <div className="mb-3">
          <HodCard />
          </div>
          
          <PlacementSlider />
            </div>
         
        </div>
      </div>
    </main>
  </div>
 
  
    </>
  );
};

export default Main;
