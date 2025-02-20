import React from "react";

import ImageSlide from "../ImageSlide/ImageSlide";
import DepartmentOfItInfo from "../Department_of_It/Department_of_it_info";
import Mission_and_Vision from "../Mission_and_Vision/Mission_and_Vision";
import HodCard from "../Hod/HodCard";
import Card from "../Activites/Card";
import PlacementSlider from "../Placements/placementSlider";
import Wellcome from "../Wellcome/Wellcome";

const Main = () => {
  document.title = "Wellcome to Department of IT nit Srinagar";
  const activitiesTitle = "Activities";
  const newsTitle = "News & Highlights";

  return (
    <>
      <div className="min-h-auto flex lg:mr-0">
        <main className="flex-1 lg:ml-0 p-2 lg:p-3">
          <div className="">
            {/* Coordinator Section */}
            <div className="relative">
              <div className="rounded-lg  ">
                <div className="">
                  <div className="h-full w-full mb-8">
                    <ImageSlide />
                  
                    <div className="top-0  left-0 w-full h-full">
                  <Wellcome />
                  </div>
                  </div>
                 
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                    <DepartmentOfItInfo />

                    <Mission_and_Vision />
                  </div>
                  <div className="flex-1 flex-row-reverse flex-wrap pt-1 pb-2">
                    <Card title={activitiesTitle} />

                    <Card title={newsTitle} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    <HodCard />
                    <PlacementSlider />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Main;
