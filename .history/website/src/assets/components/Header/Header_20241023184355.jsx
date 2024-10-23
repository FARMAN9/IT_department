import React from "react";

function Header() {
  return (
    <header className=" bg-blue-950 text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div classNameName="text-3xl font-bold text">
          <a href="#">INFORMATION TECHNOLOGY</a>
        </div>

        <nav className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-gray-200">
            Home
          </a>
          <a href="#" className="hover:text-gray-200">
            About
          </a>
          <a href="#" className="hover:text-gray-200">
            Services
          </a>
          <a href="#" className="hover:text-gray-200">
            Contact
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
