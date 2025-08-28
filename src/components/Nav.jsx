import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { cn } from "../lib/utils";

// Organization Logo Component
const OrgLogo = () => {
  return (
    <img 
      src="/images/logos/logo_white.webp"
      alt="Anirveda Logo"
      className="h-5 w-5 object-contain"
    />
  );
};

export default function Nav() {
  const location = useLocation();
  const [active, setActive] = useState(null);

  // State for controlling the mobile drawer visibility
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // State for controlling the "More" section collapse within the mobile drawer
  const [isMoreClickedInDrawer, setIsMoreClickedInDrawer] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const navItems = [
    { id: 0, title: "home", url: "/" },
    { id: 1, title: "events", url: "/events" },
    { id: 2, title: "gallery", url: "/gallery" },
    { id: 3, title: "committee", url: "/committee" },
    { id: 4, title: "sponsors", url: "/sponsors" },
    { id: 5, title: "blogs", url: "/blogs" },
  ];

  const moreItems = [
    { id: 6, title: "Mock RBI", url: "/mockrbi" },
    { id: 7, title: "Economania", url: "/economania" },
    { id: 8, title: "GalaxEcon", url: "/galaxecon" }
  ];

  const isActiveLink = (url) => {
    return (
      location.pathname === url ||
      (url === "/committee" &&
        [
          "/em",
          "/logs",
          "/sm",
          "/publicity",
          "/cnd",
          "/tech",
          "/ve",
          "/gd",
          "/sponsorship",
        ].includes(location.pathname))
    );
  };

  return (
    <div className="flex items-center justify-between px-5 py-2 md:px-10 lg:px-16 relative z-50">
      {/* Logo */}
      <div className="w-20 xl:w-24">
        <Link to="/" onClick={closeDrawer}>
          <img src="/images/logos/logo_white.webp" alt="Anirveda Logo" />
        </Link>
      </div>

      {/* Main Navigation (Hidden on small screens, shown on large) */}
      <div className="hidden lg:block">
        <Menu setActive={setActive}>
          {navItems.map((item) => (
            <div key={item.id} className="relative px-2">
              {item.external ? (
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#B69575] hover:text-[#C9872B] transition-colors"
                >
                  {item.title.toUpperCase()}
                </a>
              ) : (
                <Link 
                  to={item.url}
                  className={cn(
                    "text-[#B69575] hover:text-[#C9872B] transition-colors",
                    isActiveLink(item.url) ? "font-bold text-[#C9872B]" : ""
                  )}
                >
                  {item.title.toUpperCase()}
                </Link>
              )}
            </div>
          ))}
          
          {/* More dropdown in animated menu */}
          <MenuItem setActive={setActive} active={active} item="MORE">
            <div className="flex flex-col space-y-2 p-2">
              {moreItems.map((item) => (
                <Link 
                  key={item.id}
                  to={item.url}
                  className={cn(
                    "text-[#8F7252] dark:text-[#B69575] hover:text-[#C9872B] transition-colors px-3 py-2 rounded-md",
                    isActiveLink(item.url) ? "font-bold text-[#C9872B]" : ""
                  )}
                  onClick={() => setActive(null)}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </MenuItem>
        </Menu>
      </div>

      {/* Contact Button and Join Us */}
      <div className="hidden lg:flex items-center gap-3">
        <a 
          href="https://docs.google.com/forms/d/e/1FAIpQLSfeI3Bi013_xIiV8P3sNSc6wa46X52Qy3gCDdDjCfDD3MfnNw/viewform"
          target="_blank"
          rel="noopener noreferrer"
        >
          <HoverBorderGradient
            containerClassName="rounded-full"
            className="bg-[#0F0F0F] text-[#B69575] flex items-center space-x-2"
          >
            <OrgLogo />
            <span className="text-lg uppercase">Join Us</span>
          </HoverBorderGradient>
        </a>
      </div>

      {/* Hamburger Icon for Mobile/Tablet */}
      <div className="lg:hidden">
        <button onClick={handleDrawerToggle} className="text-secondary text-3xl focus:outline-none">
          <Icon icon={isDrawerOpen ? "carbon:close" : "carbon:menu"} />
        </button>
      </div>

      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={handleDrawerToggle}
        ></div>
      )}

      {/* Drawer Content */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-secondary-opacity shadow-lg transform transition-transform duration-300 ease-in-out z-50 lg:hidden
          ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6">
          <div className="flex justify-end mb-4">
            <button onClick={handleDrawerToggle} className="text-secondary text-3xl focus:outline-none">
              <Icon icon="carbon:close" />
            </button>
          </div>
          <nav className="flex flex-col space-y-4 uppercase text-secondary">
            {navItems.map((item) => {
              const linkContent = (
                <h1
                  className={`block py-2 relative overflow-hidden
                              before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-[1.8px] before:bg-secondary before:transition-all before:duration-300 before:ease-out before:transform before:-translate-x-full
                              after:absolute after:bottom-0 after:right-1/2 after:w-0 after:h-[1.8px] after:bg-secondary after:transition-all after:duration-300 after:ease-out after:transform after:translate-x-full
                              hover:before:w-1/2 hover:before:translate-x-0
                              hover:after:w-1/2 hover:after:translate-x-0
                              ${isActiveLink(item.url) ? "font-bold" : ""}`}
                >
                  {item.title}
                </h1>
              );

              return item.external ? (
                <a href={item.url} key={item.id} target="_blank" rel="noopener noreferrer" onClick={closeDrawer}>
                  {linkContent}
                </a>
              ) : (
                <Link to={item.url} key={item.id} onClick={closeDrawer}>
                  {linkContent}
                </Link>
              );
            })}

            {/* Collapsible "More" section in the drawer */}
            <div className="border-t border-secondary/30 pt-4 mt-4">
              <div
                className="flex justify-between items-center cursor-pointer py-2"
                onClick={() => setIsMoreClickedInDrawer(!isMoreClickedInDrawer)}
              >
                <h2 className="text-lg font-bold text-primary">More</h2>
                <Icon
                  icon={isMoreClickedInDrawer ? "carbon:chevron-up" : "carbon:chevron-down"}
                  color="#B69575"
                  className="text-2xl"
                />
              </div>

              <div className={`pl-4 pb-2 transition-all duration-300 ease-in-out overflow-hidden
                           ${isMoreClickedInDrawer ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                {moreItems.map((item) => (
                  <Link to={item.url} key={item.id} onClick={closeDrawer}>
                    <h1 className="block py-2 text-sm text-secondary hover:text-primary transition-colors">
                      {item.title}
                    </h1>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Mobile Join Us button */}
            <div className="border-t border-secondary/30 pt-4 mt-4 flex flex-col gap-2">
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSfeI3Bi013_xIiV8P3sNSc6wa46X52Qy3gCDdDjCfDD3MfnNw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeDrawer}
              >
                <HoverBorderGradient
                  containerClassName="rounded-full w-full"
                  className="bg-[#0F0F0F] text-[#B69575] flex items-center justify-center space-x-2 w-full"
                >
                  <OrgLogo />
                  <span className="text-lg uppercase">Join Us</span>
                </HoverBorderGradient>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
