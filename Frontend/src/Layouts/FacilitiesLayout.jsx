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
  GraduationCap,
  FlaskConical,

  Menu as MenuIcon,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Layout = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const buttonVariants = {
    initial: { y: -10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const arrowVariants = {
    up: { rotate: 0 },
    down: { rotate: 180 },
  };

  const navVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20,
        mass: 0.5,
      },
    },
  };

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
      label: "Dashboard",
      link: "/faculty/dashboard",
      id: "home",
    },
    {
      icon: Info,
      label: "About",
      id: "about",
      link: "/about",
      submenu: [
        { label: "My Profile Links", link: "/about/my-profile-links" },
        { label: "My Research Profile", link: "/about/my-research-profile" },

        { label: "My Journal Publications", link: "/about/my-publications" },
        { label: "My Conference Publications", link: "/admin/hod" },
        { label: "My Book/Chapter Publications", link: "/about/achievements" },
        { label: "My Research Projects", link: "/about/achievements" },
        { label: "My Research Collaborations", link: "/about/achievements" },
        { label: "My Consultancy", link: "/about/achievements" },
        { label: "My Events Organized", link: "/about/achievements" },
        { label: "My Professional Affiliations", link: "/about/achievements" },
        { label: "My PhD Supervision", link: "/about/achievements" },
        { label: "PG Dissertation Guided", link: "/about/achievements" },
        { label: "My Patents/IPR", link: "/about/achievements" },
        { label: "My Admin. Responsiblities", link: "/about/achievements" },
        { label: "My Awards and Honours", link: "/about/achievements" },
      ],
    },
    {
      icon: Users,
      label: "Logout",
      link: "/",
    },
  ];

  return (
    <>
      <Toaster
        position="top-center"
        gutter={8}
        reverseOrder={true}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#f8fafc",
            color: "#0f172a",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
          },
        }}
      />
      <div className="w-full">
        {/* Admin Nav */}
        <AnimatePresence>
          {isMenuVisible && (
            <motion.div
              key="nav-admin"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={navVariants}
              className="w-full shadow-md z-50 bg-white"
            >
              <NavAdmin />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Main Header */}
      </div>
      <div className="flex justify-center min-w-full">
        <motion.button
          onClick={toggleAdmin}
          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 absolute top-0 right-[50%] translate-x-[50%] rounded-b-xl text-white z-50 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-1"
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
          aria-label="Toggle admin menu"
        >
          <motion.span
            variants={arrowVariants}
            animate={isMenuVisible ? "up" : "down"}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {isMenuVisible ? (
              <IoIosArrowUp size={18} className="text-white" />
            ) : (
              <IoIosArrowDown size={18} className="text-white" />
            )}
          </motion.span>
        </motion.button>

        <div className="w-full">
          <Header />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-1 h w-full">
          <Sidebar adminNavopen={isMenuVisible} menuItems={menuItems} />
          <div className="flex-1 ">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
