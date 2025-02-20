import React from "react";
import { House } from "lucide-react";
import { NavLink, Link } from "react-router-dom";

function Header() {
  return (
    <header className="z-20 bg-gradient-to-r from-cyan-500 to-blue-500 text-white  shadow-lg w-full">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <Link to="/">
            <img
              className="w-16 h-16 md:w-20 md:h-20 transition-transform duration-300 hover:scale-105"
              src="https://nitsri.ac.in/images/nit-logo.png"
              alt="NIT Srinagar Logo"
            />
          </Link>
          <div className="flex flex-col text-center md:text-left">
            <NavLink
              to="/"
              className="lg:text-2xl md:text-4xl font-semibold hover:text-gray-200 transition-colors duration-200"
            >
              INFORMATION TECHNOLOGY
            </NavLink>
            <p className="text-sm md:text-base font-semibold mt-1">
              National Institute of Technology Srinagar, Jammu & Kashmir
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink
            to="/"
            className="hover:text-gray-200 transition-colors duration-200"
            aria-label="Home"
          >
            <House size={36} strokeWidth={2.75} />
          </NavLink>
        </nav>

        {/* Mobile Menu Button (Placeholder for future implementation) */}
        <button className="lg:hidden p-2 hover:bg-blue-600 rounded-lg transition-colors duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;