import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { ChevronDown, CircleArrowRight, Menu as MenuIcon, X } from "lucide-react";

const AcademicSidebar = ({ adminNavopen, menuItems }) => {
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileScreen(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Menu interactions
  const handleMenuItemClick = useCallback((e, item) => {
    if (item.submenu) {
      e.preventDefault();
      setExpandedMenu(prev => prev === item.id ? null : item.id);
    } else {
      setIsMobileOpen(false);
    }
  }, []);

  const toggleMobileSidebar = useCallback(() => setIsMobileOpen(prev => !prev), []);
  const closeMobileSidebar = useCallback(() => setIsMobileOpen(false), []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileOpen) closeMobileSidebar();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileOpen, closeMobileSidebar]);

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={toggleMobileSidebar}
        className={`${
          adminNavopen ? "top-[11%]" : "top-[3.5%]"
        } right-3 z-50 absolute rounded-lg border shadow-lg text-white lg:hidden bg-blue-600 hover:bg-blue-700 transition-colors duration-200`}
        aria-label="Toggle sidebar"
      >
        {isMobileOpen ? <X className="w-8 h-8 p-1" /> : <MenuIcon className="w-8 h-8 p-1" />}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-30 bg-black/50"
            onClick={closeMobileSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        className="fixed lg:sticky lg:top-0 z-40 p-0 lg:m-1 text-black rounded-lg shadow-lg min-h-screen lg:w-[20%] w-[80%] bg-white border border-gray-200 overflow-y-auto"
        initial={{ x: isMobileScreen ? '-100%' : 0 }}
        animate={{ 
          x: isMobileScreen ? (isMobileOpen ? 0 : '-100%') : 0 
        }}
        transition={{ type: "tween", duration: 0.3 }}
      >
        <nav className="flex flex-col h-full p-2">
          {menuItems.map((item) => (
            <div key={item.id}>
              <NavLink
                to={item.link}
                onClick={(e) => handleMenuItemClick(e, item)}
                className={({ isActive }) =>
                  `flex items-center rounded-lg m-1 p-4 text-gray-700 hover:bg-blue-50 ${
                    isActive ? 'bg-blue-100 text-blue-700' : ''
                  } transition-colors duration-200`
                }
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span className="flex-grow font-semibold text-sm md:text-base">
                  {item.label}
                </span>
                {item.submenu && (
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      expandedMenu === item.id ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </NavLink>

              {/* Submenu Items */}
              {item.submenu && expandedMenu === item.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pl-6 overflow-hidden"
                >
                  {item.submenu.map((subItem) => (
                    <NavLink
                      key={subItem.label}
                      to={subItem.link}
                      onClick={closeMobileSidebar}
                      className={({ isActive }) =>
                        `flex items-center m-1 p-3 text-gray-600 rounded-lg hover:bg-blue-50 ${
                          isActive ? 'bg-blue-100 text-blue-700' : ''
                        } transition-colors duration-200`
                      }
                    >
                      <CircleArrowRight className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-sm md:text-base">{subItem.label}</span>
                    </NavLink>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </nav>
      </motion.div>
    </>
  );
};

export default React.memo(AcademicSidebar);
