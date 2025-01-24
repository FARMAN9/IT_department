import React, { useMemo } from "react";
import AcademicSidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import ImageSlide from "../ImageSlide/ImageSlide";
import DepartmentOfItInfo from "../Department_of_It/Department_of_it_info";
import Mission_and_Vision from "../Mission_and_Vision/Mission_and_Vision";
import { Lightbulb } from 'lucide-react';

function Main() {
  document.title = "Coordinator";

  // Memoizing static data for optimization
  const data = useMemo(() => [
    { program: 'Under Graduate', coordinator: 'Dr. Kusum K. Bharti' },
    { program: 'Post Graduate', coordinator: 'Dr. Mohit Kumar' },
    { program: 'Doctor of Philosophy', coordinator: 'Dr. Nisha Chaurasia' },
  ], []);

  return (
    <div className="min-h-auto flex lg:mr-10">
      <main className="flex-1 lg:ml-10 p-2 lg:p-4">
        <div className="max-w-6xl mx-auto p-0 pt-4 space-y-8">
          
          {/* Coordinator Section */}
          <div className="relative">
            <div className="mt-20 lg:mt-0 xl:mt-0 inline-flex items-center bg-teal-600 text-white px-5 py-2 rounded-full text-xl font-bold shadow-lg">
              Coordinator
            </div>
            <div className="mt-6 bg-white rounded-lg shadow-md p-6 border-l-4 border-teal-600">
              <div className="bg-white shadow-md rounded-lg">
                <table className="w-full table-full">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700">
                      <th className="px-4 py-3 text-left font-medium">PROGRAMME</th>
                      <th className="px-4 py-3 text-left font-medium">COORDINATOR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, index) => (
                      <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                        <td className="px-4 py-3">{row.program}</td>
                        <td className="px-4 py-3">{row.coordinator}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
