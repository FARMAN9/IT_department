import React from "react";

function Header() {
  return (
    <header className=" bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded border-amber-950">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex-col text-xl font-bold ">
          <img
            className="w-20 h-20 transition-transform duration-500 transform hover:rotate-360"
            src="https://nitsri.ac.in/images/nit-logo.png"
            alt=""
          />
          <a className="" href="#">
            INFORMATION TECHNOLOGY
          </a>
          <p text-xl fob>National Institute of Technology Srinagar</p>
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
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      <div className="md:hidden px-6 pb-4">
        <a href="#" className="block py-2 text-gray-200">
          Home
        </a>
        <a href="#" className="block py-2 text-gray-200">
          About
        </a>
        <a href="#" className="block py-2 text-gray-200">
          Services
        </a>
        <a href="#" className="block py-2 text-gray-200">
          Contact
        </a>
      </div>
    </header>
  );
}

export default Header;
