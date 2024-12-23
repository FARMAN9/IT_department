import React from "react";
import Header from "./assets/components/Header/Header";
import Main from "./assets/components/Main/main";
import Sidebar from "./assets/components/Sidebar/Sidebar";
import Footer from "./assets/components/Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col">
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 m-0">
            <Outlet />
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
