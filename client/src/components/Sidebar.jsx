import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Sidebar = () => {
  const { auth } = useContext(AuthContext);

  const isAdmin = auth?.user?.role === "admin";

  return (
    <aside className="w-64 bg-gray-800 text-white h-full fixed">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Navigation</h2>
        <nav className="space-y-2">
          <Link to="/" className="block py-2 px-4 rounded hover:bg-gray-700">
            Home
          </Link>
          <Link
            to="/books"
            className="block py-2 px-4 rounded hover:bg-gray-700"
          >
            Books
          </Link>
          {isAdmin && (
            <Link
              to="/users"
              className="block py-2 px-4 rounded hover:bg-gray-700"
            >
              Users
            </Link>
          )}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
