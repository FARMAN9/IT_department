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

const AcademicIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="w-5 h-5"
    stroke="currentColor"
    strokeWidth="2">
    <path d="M12 3L4 7v2h16V7l-8-4zM4 11h16v8H4v-8zM4 21h16v-2H4v2z" />
  </svg>
);

const AcademicSidebar = () => {
  const [expandedMenu, setExpandedMenu] = useState("about");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    {
      icon: Home,
      label: "Home",
    },
    {
      icon: Info,
      label: "About",
      id: "about",
      submenu: [
        "Vision and Missions",
        "HoD's Message",
        "Achievements",
        "Infrastructure: At a glance",
        "Contact Us",
      ],
    },
    {
      icon: GraduationCap,
      label: "Academic",
      id: "academic",
      submenu: [
        "Programmes",
        "Academic Coordinators",
        "Syllabus",
        "TimeTable",
        "Department Activities Calendar",
      ],
    },
    {
      icon: User,
      label: "People",
      id: "people",
      submenu: ["Faculty", "PhD Scholars", "Students", "Alumni", "Staff"],
    },
    {
      icon: Beaker,
      label: "Research and Labs",
      id: "research",
      submenu: [
        "Research Areas",
        "Department Labs",
        "Publications",
        "Projects",
        "Consultancy",
        "Research Labs",
        "Patents",
      ],
    },
    {
      icon: Users,
      label: "Societies/Clubs/Teams",
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-5 right-1 z-50 p-2  rounded-md shadow-md  text-white ">
        {isMobileOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MenuIcon className="w-7 h-7" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0  z-0"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static  right-100  z-40 rounded-md shadow-md shadow-inner p-1 mt-19 md:mt-0  text-white rounded
        transform ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-10"
        }
        transition-transform duration-300 ease-in-out
        w-100 bg-white border-r border-gray-300 border-b border-gray-300 
        overflow-y-auto
      `}>
        <nav className="flex flex-col h-full">
          {/* Logo or Header Area 
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold">Department Name</h1>
          </div>
          Menu Items */}
          <div className="flex-1 rounded-md border">
            {menuItems.map((item, index) => (
              <div key={index}>
                <a
                  href="#"
                  className="flex items-center rounded-sm border m-1 px-4 py-3 text-gray-700 hover:bg-gray-100 hover:rounded-md transition-colors duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.submenu) {
                      setExpandedMenu(
                        expandedMenu === item.id ? null : item.id
                      );
                    }
                  }}>
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="md:text-xl text-sm font-medium flex-grow ">
                    {item.label}
                  </span>
                  {item.submenu &&
                    (expandedMenu === item.id ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    ))}
                </a>
                {item.submenu && expandedMenu === item.id && (
                  <div className="bg-gray-50 rounded-sm">
                    {item.submenu.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href="#"
                        className="flex rounded-sm border items-center m-1 px-4 py-2 pl-12 text-gray-600 hover:bg-gray-100 hover:rounded-sm transition-colors duration-200"
                        onClick={() => setIsMobileOpen(false)}>
                        <CircleDot className="w-5 h-5 mr-3" />
                        <span className="text-sm md:text-xl">{subItem}</span>
                      </a>
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
