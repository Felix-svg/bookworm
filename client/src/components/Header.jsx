import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../context/AuthContext";
import SidebarContext from "../context/SidebarContext";
import ThemeContext from "../context/ThemeContext";
import axios from "axios";

const Header = () => {
  const { auth, logout } = useContext(AuthContext);
  const { toggleSidebar } = useContext(SidebarContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://bookworm-6lvy.onrender.com/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isAdmin = auth?.user?.role === "admin";

  return (
    <header className="bg-blue-500 text-white py-4 dark:bg-gray-900 dark:text-gray-200">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="text-white mr-4 focus:outline-none"
          >
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
          <h1 className="text-2xl font-bold">
            <Link to="/">BookWorm</Link>
          </h1>
        </div>
        <nav className="flex items-center space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/books" className="hover:underline">
            Books
          </Link>
          {auth?.token ? (
            <>
              {isAdmin && (
                <Link to="/users" className="hover:underline">
                  Users
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/signup" className="hover:underline">
                Signup
              </Link>
            </>
          )}
          <button
            onClick={toggleTheme}
            className="text-white focus:outline-none"
          >
            <FontAwesomeIcon
              icon={theme === "light" ? faMoon : faSun}
              size="lg"
            />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
