import React from "react";
// Import the FacultyCard
import PdfViewer from "../PDFViewer/PDFViewer";

const Studentmain = () => {
  return (
    <>
      <div className="min-h-auto flex lg:mr-10">
        <main className="flex-1 lg:ml-10 p-2 lg:p-4">
          <div className="max-w-9xl mx-auto p-0 pt-4 space-y-8">
            {/* Coordinator Section */}
            <div className="relative">
              <div className="mt-20 lg:mt-0 xl:mt-0 inline-flex items-center bg-teal-600 text-white px-5 py-2 rounded-full text-xl font-bold shadow-lg">
                Students
              </div>
              <div className="mt-6 bg-white rounded-lg shadow-md p-6 border-l-4 border-teal-600">
                <div className="flex flex-wrap -mx-4"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Studentmain;
