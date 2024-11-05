import React, { useState } from "react";
import {
  Home,
  Info,
  User,
  Users,
  Beaker,
  ChevronDown,
  ChevronRight,
  CircleDot,
  Menu as MenuIcon,
  House,
  X,
} from "lucide-react";

function Header() {
  const toggleMenu = (setMenu) => {
    setMenu((prev) => !prev);
  };
  const hideShow = () => {
    document.querySelector(".mobile-menu").classList.toggle("hidden");
  };

  return (
    <header className="fixed lg:static bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded border-gray-300 font-sans border z-50 w-full">
      <div className="container mx-auto flex justify-between items-center md:p-2 py-2 px-full">
        <div className="flex items-center text-lg font-bold space-x-1">
          <img
            className="w-20 h-20 md:w-20 md:h-20 transition-transform duration-500 transform "
            src="https://nitsri.ac.in/images/nit-logo.png"
            alt=""
          />
          <div className="md:flex-col self-center text-center md:text-left">
            <a href="#" className="text-pretty md:text-4xl text-sm text-glow ">
              INFORMATION TECHNOLOGY
            </a>
            <hr className="" />
            <p className="md:text-sm text-xs text-glow ">
              National Institute of Technology Srinagar,Jammu & Kashmir
            </p>
          </div>
          <div className="md:hidden lg:hidden visibility: hidden; m-1 p-2">
            <button className="flex items-center justify-center w-">hhh</button>
          </div>
        </div>
        {/* Desktop Nav */}
        <nav className="hidden hidden md:flex space-x-20 text-xl">
          <div className="flex-1">
            <a href="#" className="hover:text-gray-200 ">
              <House size={36} strokeWidth={2.75} />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
