import React from "react";
import AcademicSidebar from "../Sidebar/Sidebar";
import Navbar 

function Main() {
  return (
    <>
      <div className="min-h-screen flex">
        <Navbar></Navbar>
        <AcademicSidebar />
        <main className="flex-1 lg:ml-72 p-4">{/* Your main content */}</main>
      </div>
    </>
  );
}

export default Main;
