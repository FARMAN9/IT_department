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
  CircleArrowRight,
  GraduationCap,
  FlaskConical,
  Menu as MenuIcon,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const AcademicSidebar = ({ adminNavopen, menuItems }) => {
  const [expandedMenu, setExpandedMenu] = useState("about");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleMenuItemClick = (e, item) => {
    // If item has a submenu, toggle its expanded state
    if (item.submenu) {
      e.preventDefault(); // Prevent navigation for submenu toggle
      setExpandedMenu(expandedMenu === item.id ? null : item.id);
    } else {
      // If there's no submenu, close the sidebar
      setIsMobileOpen(false); // Close the sidebar for main menu items
    }
  };

  const handleSubmenuItemClick = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className={`${
          adminNavopen ? "top-[11%] right-3" : "top-[3.5%] right-3"
        } z-50 absolute rounded-lg border shadow-lg text-white lg:hidden xl:hidden 2xl:hidden`}
      >
        {isMobileOpen ? (
          <X className="w-8 h-8" />
        ) : (
          <MenuIcon className="w-8 h-8" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="lg:hidden md:hidden xl:hidden 2xl:hidden  fixed inset-0 z-0"
          onClick={() => setIsMobileOpen(false)}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static z-40 p-0  md:mt-0 lg:m-3 mb-0 text-black rounded shadow-md
        transform ${
          isMobileOpen ? "translate-x-0" : "translate-x-full lg:translate-x-10"
        }
        transition-transform duration-300 ease-in-out
        lg:w-[20%] xl:w-[20%] 2xl:w-[20%] w-full bg-white border-r border-gray-300 overflow-y-auto`}
      >
        <nav className="flex flex-col h-full">
          <div className="flex-1">
            {menuItems.map((item, index) => (
              <div key={index}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `flex items-center rounded-sm border m-1 px-4 py-3  ${
                      isActive ? "bg-gray-200" : "hover:bg-gray-100"
                    } transition-colors duration-200`
                  }
                  onClick={(e) => handleMenuItemClick(e, item)} // Handle item click
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="md:text-md sm:text-base text-base lg:text-md flex-grow font-semibold ">
                    {item.label}
                  </span>
                  {item.submenu &&
                    (expandedMenu === item.id ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    ))}
                </NavLink>
                {item.submenu && expandedMenu === item.id && (
                  <div className={`bg-gray-50 rounded-sm m-0`}>
                    {item.submenu.map((subItem, subIndex) => (
                      <NavLink
                        key={subIndex}
                        to={subItem.link}
                        className={({ isActive }) =>
                          `flex items-center m-1 px-3 py-2 pl-12 text-gray-600 rounded-sm border ${
                            isActive ? "bg-gray-200" : "hover:bg-gray-100"
                          } transition-colors duration-200`
                        }
                        onClick={handleSubmenuItemClick} // Close sidebar when submenu item is clicked
                      >
                        <CircleArrowRight className="w-5 h-5 mr-1 text-gray-600 " />
                        <span className="md:text-lg sm:text-sm text-base lg:text-sm  hover:text-blue-600 cursor-pointer hover:font-bold duration-200">
                          {subItem.label}
                        </span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};

export default AcademicSidebar;
