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
    <header className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded border-amber-950 font-sans">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center text-xl font-bold space-x-2">
          <img
            className="w-16 h-16 md:w-20 md:h-20 transition-transform duration-500 transform "
            src="https://nitsri.ac.in/images/nit-logo.png"
            alt=""
          />
          <div className="md:flex-col self-center text-center md:text-left">
            <a href="#" className="text-pretty md:text-4xl text-sm">
              INFORMATION TECHNOLOGY
            </a>
            <hr className="" />
            <p className="text-sm sm:text-xsm">
              National Institute of Technology Srinagar,Jammu & Kashmir
            </p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-20 text-xl">
          <div className="flex-1">
            <a href="#" className="hover:text-gray-200 ">
              <House size={36} strokeWidth={2.75} />
            </a>
          </div>

          {/* Dropdown for People */}

          {/* Dropdown for Research */}

          {/* Dropdown for Outcomes */}
        </nav>
      </div>

      {/* Mobile Nav */}

      {/* Mobile Dropdown for People */}

      {/* Mobile Dropdown for Research */}

      {/* Mobile Dropdown for Outcomes */}
    </header>
  );
}

export default Header;
