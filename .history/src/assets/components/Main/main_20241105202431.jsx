import React from "react";
import AcademicSidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

function Main() {
  return (
    <>
      <div className="min-h-auto flex p-10">
        <AcademicSidebar />
        <main className="flex-1 lg:ml-10 p-4">
          {/* Your main content */}
          <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            {/* Image */}
            <img
              src="https://giffiles.alphacoders.com/158/158667.gif"
              alt="Placeholder"
              className="mb-4 bg-white rounded-lg shadow-lg transform transition-transform hover:shadow-2xl hover:scale-105"
            />
            {/* Heading */}
          </div>
        </main>
      </div>
    </>
  );
}

export default Main;