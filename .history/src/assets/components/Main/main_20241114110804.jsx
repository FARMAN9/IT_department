import React from "react";
import AcademicSidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import ImageSlide from "../ImageSlide/ImageSlide";
import DepartmentOfItInfo from "../Department_of_It/Department_of_it_info";
import Mission_and_Vision from "../Mission_and_Vision/Mission_and_Vision";

function Main() {
  return (
    <>
      <div className="min-h-auto flex wi">
        <AcademicSidebar />
        <main className="flex-1 lg:ml-10  sm:ml-2 p-4">
          <ImageSlide />
          <hr className="mt-2" />
          <div className="flex flex-col md:flex-row-2 lg:flex-row xl:flex-row p-3 gap-6">
            <div className="flex-1">
              <DepartmentOfItInfo />
            </div>
            <hr className="hidden md:block lg:block xl:block w-px bg-gray-300" />
            <div className="flex-1">
              <Mission_and_Vision />
            </div>
          </div>
          <hr />
          <div className="flex flex-col md:flex-row-2 lg:flex-row xl:flex-row p-3 gap-6">
            <div className="flex-1"></div>
            <hr className="hidden md:block lg:block xl:block w-px bg-gray-300" />
            <div className="flex-1">
              <Mission_and_Vision />
            </div>
          </div>

          {/* Your main content 
          <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
           
            <img
              src="https://giffiles.alphacoders.com/158/158667.gif"
              alt="Placeholder"
              className="mb-4 bg-white rounded-lg shadow-lg transform transition-transform hover:shadow-2xl hover:scale-105"
            />
              </div>
            */}
        </main>
      </div>
    </>
  );
}

export default Main;
