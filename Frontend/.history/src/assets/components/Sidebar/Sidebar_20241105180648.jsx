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
      icon: AcademicIcon,
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
      submenu: ['Research Areas',
        'Department Labs'
        'Publications'
        'Projects'
        'Consultancy'
        'Research Labs'
        Patents],
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
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md">
        {isMobileOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MenuIcon className="w-7 h-7" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-40
        transform ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }
        transition-transform duration-300 ease-in-out
        w-72 bg-white border-r border-gray-200
        overflow-y-auto
      `}>
        <nav className="flex flex-col h-full">
          {/* Logo or Header Area */}
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold">Department Name</h1>
          </div>

          {/* Menu Items */}
          <div className="flex-1">
            {menuItems.map((item, index) => (
              <div key={index}>
                <a
                  href="#"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.submenu) {
                      setExpandedMenu(
                        expandedMenu === item.id ? null : item.id
                      );
                    }
                  }}>
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="text-sm font-medium flex-grow">
                    {item.label}
                  </span>
                  {item.submenu &&
                    (expandedMenu === item.id ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    ))}
                </a>
                {item.submenu && expandedMenu === item.id && (
                  <div className="bg-gray-50">
                    {item.submenu.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href="#"
                        className="flex items-center px-4 py-2 pl-12 text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => setIsMobileOpen(false)}>
                        <CircleDot className="w-4 h-4 mr-3" />
                        <span className="text-sm">{subItem}</span>
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
