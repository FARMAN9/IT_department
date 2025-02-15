import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import NavAdmin from "../components/Header/NavAdmin";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { Toaster } from "react-hot-toast";
import {
  Home,
  Info,
  User,
  Users,
  Beaker,
  ChevronDown,
  ChevronRight,
  CircleDot,
  CircleArrowRight,
  GraduationCap,
  FlaskConical,
  Menu as MenuIcon,
  X,
} from "lucide-react";

const Layout = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove("dark"); // Forces light mode
    document.documentElement.style.colorScheme = "light";
  }, []);

  const toggleAdmin = () => {
    console.log(isMenuVisible);
    setIsMenuVisible((prev) => !prev);
  };
  const menuItems = [
    {
      icon: Home,
      label: "Home",
      link: "/",
      id: "home",
    },
    {
      icon: Info,
      label: "About",
      id: "about",
      link: "/about",
      submenu: [
        { label: "Vision and Missions", link: "/about/vision" },
        { label: "HoD's Message", link: "/about/hod-message" },
        { label: "Achievements", link: "/about/achievements" },
        { label: "Gallery", link: "/about/infrastructure" },
        { label: "Contact Us", link: "/about/contact" },
      ],
    },
    {
      icon: GraduationCap,
      label: "Academic",
      id: "academic",
      link: "/academic",
      submenu: [
        { label: "Programmes", link: "/academic/programmes" },
        { label: "Academic Coordinators", link: "/academic/coordinators" },
        { label: "Syllabus", link: "/academic/syllabus" },
        { label: "TimeTable", link: "/academic/timetable" },
        {
          label: "Department Activities Calendar",
          link: "/academic/calendar",
        },
      ],
    },
    {
      icon: User,
      label: "People",
      id: "people",
      link: "/people",
      submenu: [
        { label: "Faculty", link: "/people/faculty" },
        { label: "PhD Scholars", link: "/people/phd-scholars" },
        { label: "Students", link: "/people/students" },
        { label: "Alumni", link: "/people/alumni" },
        { label: "Staff", link: "/people/staff" },
      ],
    },
    {
      icon: FlaskConical,
      label: "Research and Labs",
      id: "research",
      link: "/research",
      submenu: [
        { label: "Research Areas", link: "/research/areas" },
        { label: "Department Labs", link: "/research/labs" },
        { label: "Publications", link: "/research/publications" },
        { label: "Projects", link: "/research/projects" },
        { label: "Consultancy", link: "/research/consultancy" },
        { label: "Research Labs", link: "/research/research-labs" },
        { label: "Patents", link: "/research/patents" },
      ],
    },
    {
      icon: Users,
      label: "Societies/Clubs/Teams",
      link: "/societies",
    },
  ];
  return (
    <>
      <Toaster
        position="top-center"
        gutter={8}
        reverseOrder={true}
        className="z-50"
        toastOptions={{
          duration: 3000,
        }}
      />
      <div className="w-full">
        {/* Admin Nav */}
        <div
          className={`w-full shadow-md transition-all duration-[1000ms] ease-in-out ${
            isMenuVisible
              ? "opacity-100 visible animate-slideInDown"
              : "hidden opacity-0 animate-slideOutUp"
          }`}
        >
          <NavAdmin />
        </div>
        {/* Main Header */}
      </div>
      <div className="flex justify-center min-w-full">
        <button
          onClick={toggleAdmin}
          className="bg-blue-700 lg:px-4 px-2 absolute lg:py-1 py-0 rounded-b-full text-white z-50 "
        >
          {isMenuVisible ? (
            <IoIosArrowUp size={20} />
          ) : (
            <IoIosArrowDown size={20} />
          )}
        </button>

        <div className="w-full">
          <Header />
        </div>
      </div>

      <div className="flex flex-col ">
        <div className="flex flex-1 h w-full">
          <Sidebar adminNavopen={isMenuVisible} menuItems={menuItems} />
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
