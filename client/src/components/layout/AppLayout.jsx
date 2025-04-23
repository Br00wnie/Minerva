import React, { useState, useEffect, useCallback } from "react";

const AppLayout = ({ header, sidebar, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleResize = useCallback(() => {
    if (window.innerWidth >= 1140) setIsSidebarOpen(false);
  }, []);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

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
      ></button>
      <div id="main">{children}</div>
    </>
  );
};

export default AppLayout;
