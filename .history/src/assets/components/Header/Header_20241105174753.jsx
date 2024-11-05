import React, { useState } from "react";
import { IoMdPeople } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { GiArchiveResearch } from "react-icons/gi";
import { GiBrainstorm } from "react-icons/gi";
import { IoIosContact } from "react-icons/io";

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
            <a href="#" className="text-lg md:text-xl text-sm">
              INFORMATION TECHNOLOGY
            </a>
            <hr className="" />
            <p className="text-xs">National Institute of Technology Srinagar</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-20 text-xl">
          <a href="#" className="hover:text-gray-200">
            Home
          </a>

          {/* Dropdown for People */}

          {/* Dropdown for Research */}

          {/* Dropdown for Outcomes */}

          <a href="#" className="hover:text-gray-200">
            Contact
          </a>
        </nav>
      </div>

      {/* Mobile Nav */}
      <div className="mobile-menu hidden md:hidden px-6 pb-4">
        <a
          href="#"
          className="block py-2 text-gray-200 flex items-center space-x-2">
          <IoHome />
          Home
        </a>

        {/* Mobile Dropdown for People */}

        {/* Mobile Dropdown for Research */}
       <>
          

        {/* Mobile Dropdown for Outcomes */}
      
         
     
     
    
    </header>
  );
}

export default Header;
