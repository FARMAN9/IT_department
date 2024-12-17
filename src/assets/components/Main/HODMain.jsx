import React from "react";
import AcademicSidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import ImageSlide from "../ImageSlide/ImageSlide";
import DepartmentOfItInfo from "../Department_of_It/Department_of_it_info";
import Mission_and_Vision from "../Mission_and_Vision/Mission_and_Vision";
import HodCard from "../Hod/HodCard";
import Card from "../Activites/Card";
const name = "Activities";
const name2 = "News & Highlights";
import PlacementSlider from "../Placements/placementSlider";
function Main() {
  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen">
       
        <main className="flex-1 lg:ml-10 p-4 lg:p-6">
          <div className="max-w-6xl mx-auto p-4 space-y-8 bg-white">
            {/* Profile Section */}
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center mt-20 lg:mt-0">
              {/* Left side with image */}
              <div className="w-64 h-64 relative">
                <div className="absolute inset-0 bg-white rounded-lg shadow-lg overflow-hidden" style={{
                  transform: 'perspective(1000px) rotateY(-10deg)',
                }}>
                  <img 
                    src="/api/placeholder/256/256" 
                    alt="Department Head"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right side with info */}
              <div className="flex-grow">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Dr. Shabir Ahmad Sofi</h1>
                <h2 className="text-xl text-gray-700 mb-6">Head of Department</h2>
                
                {/* Green line separator */}
                <div className="h-1 w-full bg-emerald-600 mb-6"></div>
                
                {/* Contact details */}
                <div className="space-y-3">
                  <div className="flex gap-4">
                    <span className="text-gray-600 w-20">Email</span>
                    <span className="text-gray-800">:</span>
                    <a href="#" className="text-gray-800 hover:text-emerald-600">
                      Dr. Shabir Ahmad Sofi@nit.ac.in
                    </a>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-gray-600 w-20">Tel No.</span>
                    <span className="text-gray-800">:</span>
                    <span className="text-gray-800">+91-7073169619 (O)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* HoD's Message Section */}
            <div className="mt-12">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-800">HoD's Message</h2>
                {/* Green line separator */}
                <div className="h-1 w-32 bg-emerald-600 mt-2"></div>
              </div>

              <div className="bg-white shadow-md rounded-lg border-l-4 border-teal-600">
                <div className="p-6">
                  <p className="text-gray-700 leading-relaxed">
                    The Department of Information Technology welcomes you to join the thriving computer community and become visionaries and change-makers of the future. Established in 2013 with an initial intake of 30 students, the department now offers 120 seats in its undergraduate program (B.Tech.). In 2023, we introduced an M.Tech. in Data Analytics, offering 30 seats (20 through GATE and 10 self-sponsored). Our distinguished faculty provides a diverse range of learning experiences, from fundamental core concepts to emerging technologies such as AI, Cloud Computing, Blockchain, IoT, Big Data, and Soft Computing. Our students have an excellent placement record, securing positions in reputed companies, making our department one of the most preferred.
                  </p>
                </div>
              </div>
            </div>

           
          </div>
        </main>
      </div>
    </>
  );
}

export default Main;
