import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://bookworm-6lvy.onrender.com/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data.users);
      } catch (error) {
        setError("Failed to fetch users. Please try again later.");
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 text-gray-800 dark:text-white"
          >
            <h3 className="font-bold">{user.username}</h3>
            <p className="text-gray-600">{user.email}</p>
            <Link
              to={`/users/${user.id}`}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2 block w-max"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
