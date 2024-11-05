import React from "react";
import AcademicSidebar from "../Sidebar/Sidebar";

function Main() {
  return (
    <>
      <div className="min-h-screen flex">
        <AcademicSidebar />
        <main className="flex-1 lg:ml-72 p-4">{}</main>
        <AcademicSidebar />
      </div>
    </>
  );
}

export default Main;
