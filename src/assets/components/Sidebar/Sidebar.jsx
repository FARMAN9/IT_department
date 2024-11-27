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
  GraduationCap,
  Menu as MenuIcon,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const AcademicSidebar = () => {
  const [expandedMenu, setExpandedMenu] = useState("about");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    {
      icon: Home,
      label: "Home",
      link: "/",
    },
    {
      icon: Info,
      label: "About",
      id: "about",
      link: "/",
      submenu: [
        { label: "Vision and Missions", link: "/about/vision" },
        { label: "HoD's Message", link: "/about/hod-message" },
        { label: "Achievements", link: "/about/achievements" },
        { label: "Infrastructure: At a glance", link: "/about/infrastructure" },
        { label: "Contact Us", link: "/about/contact" },
      ],
    },
    {
      icon: GraduationCap,
      label: "Academic",
      id: "academic",
      link: "/academic",
      submenu: [
        { label: "Programmes", link: "/academic/programmes" },
        { label: "Academic Coordinators", link: "/academic/coordinators" },
        { label: "Syllabus", link: "/academic/syllabus" },
        { label: "TimeTable", link: "/academic/timetable" },
        { label: "Department Activities Calendar", link: "/academic/calendar" },
      ],
    },
    {
      icon: User,
      label: "People",
      id: "people",
      link: "/people",
      submenu: [
        { label: "Faculty", link: "/people/faculty" },
        { label: "PhD Scholars", link: "/people/phd-scholars" },
        { label: "Students", link: "/people/students" },
        { label: "Alumni", link: "/people/alumni" },
        { label: "Staff", link: "/people/staff" },
      ],
    },
    {
      icon: Beaker,
      label: "Research and Labs",
      id: "research",
      link: "/research",
      submenu: [
        { label: "Research Areas", link: "/research/areas" },
        { label: "Department Labs", link: "/research/labs" },
        { label: "Publications", link: "/research/publications" },
        { label: "Projects", link: "/research/projects" },
        { label: "Consultancy", link: "/research/consultancy" },
        { label: "Research Labs", link: "/research/research-labs" },
        { label: "Patents", link: "/research/patents" },
      ],
    },
    {
      icon: Users,
      label: "Societies/Clubs/Teams",
      link: "/societies",
    },
  ];

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
    setIsMobileOpen(false); // Close the sidebar when a submenu item is clicked
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-7 right-3 z-50 bg-blue-500 rounded-lg border shadow-lg text-white lg:hidden xl:hidden 2xl:hidden"
      >
        {isMobileOpen ? <X className="w-8 h-8" /> : <MenuIcon className="w-8 h-8" />}
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="lg:hidden md:hidden fixed inset-0 z-0"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static z-40 p-0 mt-24 md:mt-0 lg:mt-6 mb-6 text-white rounded shadow-md
        transform ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-10"}
        transition-transform duration-300 ease-in-out
        md:w-80 w-full bg-white border-r border-gray-300 overflow-y-auto`}
      >
        <nav className="flex flex-col h-full">
          <div className="flex-1">
            {menuItems.map((item, index) => (
              <div key={index}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `flex items-center rounded-sm border m-1 px-4 py-3 text-gray-700 ${
                      isActive ? "bg-gray-200" : "hover:bg-gray-100"
                    } transition-colors duration-200`
                  }
                  onClick={(e) => handleMenuItemClick(e, item)} // Handle item click
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="md:text-xl text-sm font-medium flex-grow">
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
                  <div className="bg-gray-50 rounded-sm">
                    {item.submenu.map((subItem, subIndex) => (
                      <NavLink
                        key={subIndex}
                        to={subItem.link}
                        className={({ isActive }) =>
                          `flex items-center m-1 px-4 py-2 pl-12 text-gray-600 rounded-sm border ${
                            isActive ? "bg-gray-200" : "hover:bg-gray-100"
                          } transition-colors duration-200`
                        }
                        onClick={handleSubmenuItemClick} // Close sidebar when submenu item is clicked
                      >
                        <CircleDot className="w-5 h-5 mr-3" />
                        <span className="text-sm md:text-xl">{subItem.label}</span>
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
