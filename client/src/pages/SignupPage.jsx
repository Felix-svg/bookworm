import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "https://bookworm-6lvy.onrender.com/users",
        {
          email,
          username,
          password,
        }
      );

      navigate("/login");
    } catch (error) {
      // Extract a user-friendly error message
      const errorMsg =
        error.response && error.response.data
          ? error.response.data.message
          : "An error occurred. Please try again.";
      setError(errorMsg);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block dark:text-gray-400 text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="mt-1 p-2 border rounded w-full text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block dark:text-gray-400 text-gray-700">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            className="mt-1 p-2 border rounded w-full text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block dark:text-gray-400 text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="mt-1 p-2 border rounded w-full text-gray-700"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Sign up
          </button>
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="underline text-blue-500 hover:text-blue-700"
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
