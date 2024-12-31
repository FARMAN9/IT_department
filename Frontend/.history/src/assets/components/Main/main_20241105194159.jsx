import React from "react";
import AcademicSidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

function Main() {
  return (
    <>
      <div className="min-h-auto flex">
        <AcademicSidebar />
        <main className="flex-1 lg:ml-10 p-4">
          {/* Your main content */}
          farmanali
        </main>
      </div>
    </>
  );
}

export default Main;
