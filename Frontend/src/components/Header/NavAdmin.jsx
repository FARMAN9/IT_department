import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext/AuthContext";
import Cookies from "js-cookie";
import NoDP from "../../assets/blankProfile.png";

function NavAdmin() {
  const { logout, user } = useAuth();
  const storeLocalUser = JSON.parse(localStorage.getItem("user") || null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    Cookies.remove("Uid");
    logout();
  };

  return (
    <div className="w-full flex justify-between relative">
      <div className="navbar bg-gradient-to-r from-cyan-500 to-blue-500 text-primary-content">
        <div className="flex-none pr-[10px]">
          <ul className="menu menu-horizontal">
            {storeLocalUser ? (
              <div className="flex items-center gap-4">
                {/* User Profile Image */}
                <div className="avatar online">
                  <div className="w-10 rounded-full ring-2 ring-white">
                    <img
                      src={storeLocalUser?.image || NoDP}
                      alt="Profile"
                      className="object-cover"
                    />
                  </div>
                </div>
                
                <span className="text-white">
                  Welcome, {storeLocalUser?.name || "Admin"}
                </span>
                
                {/* Logout Button with Icon */}
                <button
                  onClick={handleLogout}
                  className="btn btn-ghost btn-circle hover:bg-red-100/20"
                  title="Logout"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <Link
                className="btn btn-outline btn-primary bg-slate-50 btn-xs sm:btn-sm md:btn-md lg:btn-md xl:btn-md"
                to="/login"
                state={{ from: "Admin login" }}
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
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavAdmin;