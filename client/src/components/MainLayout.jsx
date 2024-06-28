import React, { useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import SidebarContext from "../context/SidebarContext";
import ThemeContext from "../context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const MainLayout = ({ children }) => {
  const { isSidebarOpen, toggleSidebar } = useContext(SidebarContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      className={`flex flex-col min-h-screen ${theme === "dark" ? "dark" : ""}`}
    >
      <Header />
      <div className="flex flex-1 relative">
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleSidebar}
          ></div>
        )}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <Sidebar />
        </div>
        <main
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : ""
          }`}
        >
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
