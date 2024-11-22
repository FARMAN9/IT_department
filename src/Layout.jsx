import React from "react";
import Header from "./assets/components/Header/Header";
import Main from "./assets/components/Main/main";
import Sidebar from "./assets/components/Sidebar/Sidebar";
import Footer from "./assets/components/Footer/Footer";
import { Outlet } from "react-router-dom";



const Layout = () => {
    return (
      <>
       <Header></Header>
       <Outlet/>
       
       <Footer></Footer>

      </>
    );
};

export default Layout;