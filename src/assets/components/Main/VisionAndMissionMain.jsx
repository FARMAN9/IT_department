import React from "react";
import AcademicSidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import ImageSlide from "../ImageSlide/ImageSlide";
import DepartmentOfItInfo from "../Department_of_It/Department_of_it_info";
import Mission_and_Vision from "../Mission_and_Vision/Mission_and_Vision";
import { Lightbulb } from 'lucide-react';

import HodCard from "../Hod/HodCard";

import Card from "../Activites/Card";
const name = "Activities";
const name2 = "News & Highlights";
import PlacementSlider from "../Placements/placementSlider";

function Main() {
  return (
    <>
      <div className="min-h-auto flex lg:mr-10">
        <AcademicSidebar />
        <main className="flex-1 lg:ml-10  p-2 lg:p-6  ">
        <div className=" max-w-6xl mx-auto p-6 space-y-8">
      {/* Vision Section */}
      <div className="relative ">
        <div className="mt-20 lg:mt-0 xl:mt-0 inline-flex items-center bg-teal-600 text-white px-6 py-2 rounded-full text-xl font-bold shadow-lg">
          Vision
        </div>
        
        <div className="mt-6 bg-white rounded-lg shadow-md p-6 border-l-4 border-teal-600">
          <div className="flex gap-4 items-start">
            <Lightbulb className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
            <p className="text-gray-700 leading-relaxed">
              To build a rich intellectual potential embedded with interdisciplinary knowledge, human values and professional ethics to make them globally competitive in education, industry, research and development and adapt with the changing technological environment.
            </p>
          </div>
        </div>
      </div>

      {/* Missions Section */}
      <div className="relative">
        <div className="inline-flex items-center bg-teal-600 text-white px-6 py-2 rounded-full text-xl font-bold shadow-lg">
          Missions
        </div>
        
        <div className="mt-6 bg-white rounded-lg shadow-md p-6 space-y-4 border-l-4 border-teal-600">
          {/* Mission Item 1 */}
          <div className="flex gap-4 items-start">
            <Lightbulb className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
            <p className="text-gray-700 leading-relaxed">
              To provide globally relevant, interdisciplinary and multifaceted knowledge in information technology.
            </p>
          </div>

          {/* Mission Item 2 */}
          <div className="flex gap-4 items-start">
            <Lightbulb className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
            <p className="text-gray-700 leading-relaxed">
              To build, provide knowledge, facilities, and support industrial internship programs and higher education.
            </p>
          </div>

          {/* Mission Item 3 */}
          <div className="flex gap-4 items-start">
            <Lightbulb className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
            <p className="text-gray-700 leading-relaxed">
              To nourish creativity, innovation and entrepreneurial spirit for solving real world problems using information technology.
            </p>
          </div>
        </div>
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
