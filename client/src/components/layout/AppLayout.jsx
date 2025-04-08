import React, { useState, useEffect } from "react";

const AppLayout = ({ header, sidebar, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1140) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div id="sidebar" className={isSidebarOpen ? "is-open" : ""}>
        <div id="header">{header}</div>
        <div id="sidebar-body">{sidebar}</div>
      </div>

      <button
        id="sidebar-toggle"
        onClick={toggleSidebar}
        className={isSidebarOpen ? "is-open" : ""}
      >
        <span className="arrow"></span>
      </button>

      <div id="main">{children}</div>
    </>
  );
};

export default AppLayout;
