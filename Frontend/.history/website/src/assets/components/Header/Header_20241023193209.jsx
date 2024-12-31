import React from "react";
import "./header.css";

function Header() {
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
        <nav className="hidden md:flex space-x-20 text">
          <a href="#" className="hover:text-gray-200">
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
              strokeWidth="2" // Corrected strokeWidth here
              d="M10 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      <div className="mobile-menu hidden md:hidden px-6 pb-4">
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
