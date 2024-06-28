import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    // Basic validation
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/login', { email, password });
      const token = response.data.token;
      const username = response.data.username

      // Store the JWT token in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('username', username)

      // Update auth context
      setAuth({ token });

      // Redirect to home or a protected page
      navigate('/');
    } catch (err) {
      // Differentiate between different error types
      if (err.response) {
        // Server responded with a status other than 200 range
        if (err.response.status === 401) {
          setError("Invalid email or password.");
        } else if (err.response.status === 500) {
          setError("Server error. Please try again later.");
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      } else if (err.request) {
        // Request was made but no response received
        setError("Network error. Please check your internet connection.");
      } else {
        // Something else caused the error
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Welcome Back</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block dark:text-gray-400 text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="mt-1 p-2 border rounded w-full text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block dark:text-gray-400 text-gray-700">Password</label>
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
            Sign in
          </button>
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="underline text-blue-500 hover:text-blue-700">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
