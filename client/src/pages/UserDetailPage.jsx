import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://127.0.0.1:5000/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
      } catch (error) {
        setError("Failed to fetch user details. Please try again later.");
      }
    };
    fetchUser();
  }, [id]);

  const deleteUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`http://127.0.0.1:5000/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/users");
    } catch (error) {
      setError("Failed to delete user. Please try again later.");
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">User Details</h2>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 text-gray-800 dark:text-white">
        <h3 className="font-bold">{user.username}</h3>
        <p className="text-gray-600 dark:text-gray-300">Email: {user.email}</p>
        <p className="text-gray-600 dark:text-gray-300">Role: {user.role}</p>
        <p className="text-gray-600 dark:text-gray-300">Date Created: {user.created_at}</p>
        <button
          onClick={deleteUser}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Delete User
        </button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
    </div>
  );
};

export default UserDetail;
