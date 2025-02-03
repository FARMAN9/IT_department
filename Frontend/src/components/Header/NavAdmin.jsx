import React from "react";
import { Link } from "react-router-dom";
function NavAdmin() {
  return (
    <>
      <div className="w-full flex justify-between relative">
        <div className="navbar bg-primary text-primary-content">
          <div className="flex-1"></div>
          <div className="flex-none pr-[10px]">
            <ul className="menu menu-horizontal">
              <Link
                className="btn btn-outline btn-primary bg-slate-50 btn-xs sm:btn-sm md:btn-md lg:btn-md xl:btn-md"
                to="/login"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Admin Login
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavAdmin;
