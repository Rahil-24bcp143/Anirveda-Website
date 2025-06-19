import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function Nav() {
  const location = useLocation();

  // State for controlling the mobile drawer visibility
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // State for controlling the "More" section collapse within the mobile drawer
  const [isMoreClickedInDrawer, setIsMoreClickedInDrawer] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    // Optionally close the "More" section in drawer when drawer itself closes
    // setIsMoreClickedInDrawer(false);
  };

  const navItems = [
    { id: 0, title: "home", url: "/" },
    { id: 1, title: "economania", url: "/economania" },
    { id: 2, title: "events", url: "/events" },
    { id: 3, title: "gallery", url: "/gallery" },
    { id: 4, title: "committee", url: "/committee" },
    { id: 5, title: "sponsors", url: "/sponsors" },
    { id: 6, title: "blogs", url: "/blogs" },
  ];

  const moreItems = [
    { id: 7, title: "Mock RBI", url: "/mockrbi" },
    { id: 8, title: "GalaxEcon", url: "/galaxecon" },
  ];

  const isActiveLink = (url) => {
    // Check for exact match or specific committee sub-routes
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
      <div className="hidden lg:flex items-center gap-3 rounded-2xl bg-secondary-opacity px-5 py-1 uppercase text-secondary md:gap-5 md:px-10 lg:px-12 lg:py-2 lg:text-lg xl:gap-7">
        {navItems.map((item) => (
          <Link to={item.url} key={item.id}>
            {/* START: Split Underline animation for desktop nav items */}
            <h1
              className={`relative cursor-pointer overflow-hidden
                          before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-[1.8px] before:bg-secondary before:transition-all before:duration-300 before:ease-out before:transform before:-translate-x-full
                          after:absolute after:bottom-0 after:right-1/2 after:w-0 after:h-[1.8px] after:bg-secondary after:transition-all after:duration-300 after:ease-out after:transform after:translate-x-full
                          hover:before:w-1/2 hover:before:translate-x-0
                          hover:after:w-1/2 hover:after:translate-x-0
                          ${
                            isActiveLink(item.url)
                              ? "font-bold" // Removed underline classes from active state
                              : ""
                          }`}
            >
              {item.title}
            </h1>
            {/* END: Split Underline animation */}
          </Link>
        ))}
        {/* Desktop "More" dropdown with sticking fix */}
        <div className="relative group">
          <div
            className="flex cursor-pointer items-center gap-1 py-1"
          >
            <h1>More</h1>
            <Icon
              icon="carbon:chevron-down"
              color="#B69575"
              className="text-2xl transition-transform group-hover:rotate-180"
            />
          </div>
          <div
            className="absolute left-1/2 -translate-x-1/2 top-full mt-0 pt-2
                       w-fit bg-secondary-opacity p-3 text-secondary rounded-lg shadow-lg
                       opacity-0 invisible group-hover:opacity-100 group-hover:visible
                       transition-all duration-350 ease-out
                       pointer-events-none group-hover:pointer-events-auto"
          >
            {moreItems.map((item) => (
              <Link to={item.url} key={item.id} className="block whitespace-nowrap py-1 px-2 hover:bg-secondary/20 rounded transition-colors duration-200">
                <h1>{item.title}</h1>
              </Link>
            ))}
          </div>
        </div>
      </div>

      Contact Button
      {/* <div>
        <a href="#contact">
          <button className=" rounded-lg border-[2px] border-primary px-3 py-1 text-lg uppercase text-primary hover:border-secondary hover:bg-secondary-opacity hover:text-secondary ">
            Contact
          </button>
        </a>
      </div> */}

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
            {navItems.map((item) => (
              <Link to={item.url} key={item.id} onClick={closeDrawer}>
                {/* START: Split Underline animation for mobile drawer nav items */}
                <h1
                  className={`block py-2 relative overflow-hidden
                              before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-[1.8px] before:bg-secondary before:transition-all before:duration-300 before:ease-out before:transform before:-translate-x-full
                              after:absolute after:bottom-0 after:right-1/2 after:w-0 after:h-[1.8px] after:bg-secondary after:transition-all after:duration-300 after:ease-out after:transform after:translate-x-full
                              hover:before:w-1/2 hover:before:translate-x-0
                              hover:after:w-1/2 hover:after:translate-x-0
                              ${
                                isActiveLink(item.url)
                                  ? "font-bold"
                                  : ""
                              }`}
                >
                  {item.title}
                </h1>
                {/* END: Split Underline animation */}
              </Link>
            ))}

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
          </nav>
        </div>
      </div>
    </div>
  );
}