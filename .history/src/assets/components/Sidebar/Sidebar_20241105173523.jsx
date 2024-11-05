import React from "react";
import { Home, Info, Users, Beaker, Users as UsersGroup } from "lucide-react";

const AcademicSidebar = () => {
  const menuItems = [
    {
      icon: Home,
      label: "Home",
    },
    {
      icon: Info,
      label: "About",
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
      icon: Users,
      label: "People",
    },
    {
      icon: Beaker,
      label: "Research and Labs",
    },
    {
      icon: UsersGroup,
      label: "Societies/Clubs/Teams",
    },
  ];

  return (
    <div className="w-72 bg-white border-r border-gray-200">
      <nav className="flex flex-col">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200">
            <item.icon className="w-5 h-5 mr-3" />
            <span className="text-sm font-medium">{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
};

export default AcademicSidebar;
