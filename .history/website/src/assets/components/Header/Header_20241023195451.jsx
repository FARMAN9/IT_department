import React, { useState } from "react";
import "./header.css";
import { IoMdPeople } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { GiArchiveResearch } from "react-icons/gi";
import { GiBrainstorm } from "react-icons/gi";
import { IoIosContact } from "react-icons/io";

function Header() {
  const [dropdownOpenPeople, setDropdownOpenPeople] = useState(false);
  const [dropdownOpenResearch, setDropdownOpenResearch] = useState(false);
  const [dropdownOpenOutcomes, setDropdownOpenOutcomes] = useState(false);

  const hideShow = () => {
    document.querySelector(".mobile-menu").classList.toggle("hidden");
  };

  return (
    <header className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded border-amber-950 font-sans">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex text-xl font-bold">
          <img
            className="w-20 h-20 transition-transform duration-500 transform rotate-x"
            src="https://nitsri.ac.in/images/nit-logo.png"
            alt=""
          />
          <div className="flex-col self-center">
            <a href="#">INFORMATION TECHNOLOGY</a>
            <p className="text-center text-xs">
              National Institute of Technology Srinagar
            </p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-20 text-xl">
          <a href="#" className="hover:text-gray-200">
            Home
          </a>
          <div className="relative">
            <button
              onClick={() => setDropdownOpenPeople((prev) => !prev)}
              className="hover:text-gray-200 focus:outline-none">
              People
            </button>
            {dropdownOpenPeople && (
              <div className="absolute left-0 mt-2 w-48 bg-gray-800 text-white rounded-md shadow-lg">
                <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                  Faculty
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                  Students
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                  Alumni
                </a>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setDropdownOpenResearch((prev) => !prev)}
              className="hover:text-gray-200 focus:outline-none">
              Research
            </button>
            {dropdownOpenResearch && (
              <div className="absolute left-0 mt-2 w-48 bg-gray-800 text-white rounded-md shadow-lg">
                <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                  Publications
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                  Projects
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                  Collaborations
                </a>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setDropdownOpenOutcomes((prev) => !prev)}
              className="hover:text-gray-200 focus:outline-none">
              Outcomes
            </button>
            {dropdownOpenOutcomes && (
              <div className="absolute left-0 mt-2 w-48 bg-gray-800 text-white rounded-md shadow-lg">
                <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                  Employment
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                  Achievements
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                  Testimonials
                </a>
              </div>
            )}
          </div>
          <a href="#" className="hover:text-gray-200">
            Contact
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={hideShow} className="md:hidden flex items-center">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      <div className="mobile-menu hidden md:hidden px-6 pb-4">
        <a
          href="#"
          className="block py-2 text-gray-200 flex items-center space-x-2">
          <IoHome />
          Home
        </a>
        <div className="relative">
          <button
            onClick={() => setDropdownOpenPeople((prev) => !prev)}
            className="block py-2 text-gray-200 flex items-center space-x-2 w-full text-left">
            <IoMdPeople />
            People
          </button>
          {dropdownOpenPeople && (
            <div className="absolute left-0 mt-2 w-48 bg-gray-800 text-white rounded-md shadow-lg">
              <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                Faculty
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                Students
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                Alumni
              </a>
            </div>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => setDropdownOpenResearch((prev) => !prev)}
            className="block py-2 text-gray-200 flex items-center space-x-2 w-full text-left">
            <GiArchiveResearch />
            Research
          </button>
          {dropdownOpenResearch && (
            <div className="absolute left-0 mt-2 w-48 bg-gray-800 text-white rounded-md shadow-lg">
              <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                Publications
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                Projects
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                Collaborations
              </a>
            </div>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => setDropdownOpenOutcomes((prev) => !prev)}
            className="block py-2 text-gray-200 flex items-center space-x-2 w-full text-left">
            <GiBrainstorm />
            Outcomes
          </button>
          {dropdownOpenOutcomes && (
            <div className="absolute left-0 mt-2 w-48 bg-gray-800 text-white rounded-md shadow-lg">
              <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                Employment
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                Achievements
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                Testimonials
              </a>
            </div>
          )}
        </div>
        <a
          href="#"
          className="block py-2 text-gray-200 flex items-center space-x-2">
          <IoIosContact />
          Contact
        </a>
      </div>
    </header>
  );
}

export default Header;
