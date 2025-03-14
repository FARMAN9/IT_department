import React from "react";
import "./header.css";

function Header() {
  return (
    <header className=" bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded border-amber-950 font-sans">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex text-xl font-bold ">
          <img
            className="w-20 h-20 transition-transform duration-500 transform rotate-x"
            src="https://nitsri.ac.in/images/nit-logo.png"
            alt=""
          />
          <div className="flex-col self-center">
            <a className="" href="#">
              INFORMATION TECHNOLOGY
            </a>
            <p className="text-center text-xs">
              National Institute of Technology Srinagar
            </p>
          </div>
        </div>

        <nav className="hidden md:flex space-x-20">
          <a href="#" className="hover:text-gray-200 ">
            Home
          </a>
          <a href="#" className="hover:text-gray-200">
            People
          </a>
          <a href="#" className="hover:text-gray-200">
            Research
          </a>
          <a href="#" className="hover:text-gray-200">
            Outcomes
          </a>
        </nav>

        <button className="md:hidden flex items-center">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              stroke-linecap="round"
              strokeLinejoin="round"
              stroke-width="2"
              d="M10 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      <div className="md:hidden px-6 pb-4">
        <a href="#" className="block py-2 text-gray-200">
          Home
        </a>
        <a href="#" className="block py-2 text-gray-200">
          People
        </a>
        <a href="#" className="block py-2 text-gray-200">
          Research
        </a>
        <a href="#" className="block py-2 text-gray-200">
          Outcomes
        </a>
      </div>
    </header>
  );
}

export default Header;
