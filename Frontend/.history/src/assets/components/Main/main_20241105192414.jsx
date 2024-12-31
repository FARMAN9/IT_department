import React from "react";
import AcademicSidebar from "../Sidebar/Sidebar";

function Main() {
  return (
    <>
      <div className="min-h-screen m- flex">
        <AcademicSidebar />
        <main className="flex-1 lg:ml-72 p-4">
          {/* Your main content */}

        </main>
      </div>
    </>
  );
}

export default Main;
