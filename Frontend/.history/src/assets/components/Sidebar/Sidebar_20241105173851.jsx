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
} from "lucide-react";

const AcademicSidebar = () => {
  const [expandedMenu, setExpandedMenu] = useState("about");

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
      icon: () => (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-5 h-5"
          stroke="currentColor"
          strokeWidth="2">
          <path d="M12 3L4 7v2h16V7l-8-4zM4 11h16v8H4v-8zM4 21h16v-2H4v2z" />
        </svg>
      ),
      label: "Academic",
    },
    {
      icon: User,
      label: "People",
    },
    {
      icon: Beaker,
      label: "Research and Labs",
    },
    {
      icon: Users,
      label: "Societies/Clubs/Teams",
    },
  ];

  return (
    <div className="w-72 bg-white border-r border-gray-200">
      <nav className="flex flex-col">
        {menuItems.map((item, index) => (
          <div key={index}>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              onClick={() =>
                item.submenu &&
                setExpandedMenu(expandedMenu === item.id ? null : item.id)
              }>
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
                    className="flex items-center px-4 py-2 pl-12 text-gray-600 hover:bg-gray-100 transition-colors duration-200">
                    <CircleDot className="w-4 h-4 mr-3" />
                    <span className="text-sm">{subItem}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default AcademicSidebar;
