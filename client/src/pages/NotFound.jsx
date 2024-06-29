import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-2xl text-white mb-8">Oops! Page not found.</p>
        <Link to="/">
          <button className="bg-white text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
