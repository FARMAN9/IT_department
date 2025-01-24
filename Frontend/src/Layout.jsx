import React from "react";
import Header from "./assets/components/Header/Header";

import Sidebar from "./assets/components/Sidebar/Sidebar";
import Footer from "./assets/components/Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
     <>

     </>

      <Header />
      <div className="min-h-screen flex flex-col m-0">
        <div className="flex flex-1 m-0">
          <Sidebar />
          <main className="flex-1 p-0 m-0 ">
            <div className="w-full h-auto">
              <Outlet />
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
