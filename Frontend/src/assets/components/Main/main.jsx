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
      <div className="min-h-auto flex lg:mr-10">
        <main className="flex-1 lg:ml-10 p-2 lg:p-4">
          <div className="max-w-9xl mx-auto p-0 pt-4 space-y-8">

            {/* Coordinator Section */}
            <div className="relative">
              <div className="mt-o bg-white rounded-lg shadow-md p-0 border-l-4-">

                <div className="flex flex-wrap ">

                  <div className="h-full w-full">
                    <ImageSlide  />
                  </div>
                  <div className="flex-1 items-center justify-center">
                    <Wellcome />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    < DepartmentOfItInfo /> 
                    
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
