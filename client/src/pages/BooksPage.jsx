import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [newBookData, setNewBookData] = useState({
    title: "",
    author: "",
    genre: "",
  });
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://bookworm-6lvy.onrender.com/books",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBooks(response.data.books);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError("Unauthorized access. Please log in again.");
        } else {
          setError("Failed to fetch books. Please try again later.");
        }
      }
    };

    fetchBooks();
  }, []);

  const greeting = () => {
    const myTime = new Date().getHours();
    if (myTime < 12) {
      return "Good morning";
    } else if (myTime >= 12 && myTime < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  const username = auth?.user?.username || "Guest";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBookData({
      ...newBookData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://bookworm-6lvy.onrender.com/books",
        newBookData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setBooks([...books, response.data.book]);
      setNewBookData({
        title: "",
        author: "",
        genre: "",
      });
    } catch (error) {
      setError("Failed to add book. Please try again later");
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <p className="font-bold text-center text-2xl mb-4">
        {greeting()} {username}
      </p>
      <div className="mb-6">
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center"
        >
          <input
            type="text"
            name="title"
            value={newBookData.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="border border-gray-300 rounded-md py-2 px-4 mr-2 focus:outline-none focus:ring-blue-200 dark:text-gray-600"
          />
          <input
            type="text"
            name="author"
            value={newBookData.author}
            onChange={handleInputChange}
            placeholder="Author"
            className="border border-gray-300 rounded-md py-2 px-4 mr-2 focus:outline-none focus:ring-blue-200 dark:text-gray-600"
          />
          <input
            type="text"
            name="genre"
            value={newBookData.genre}
            onChange={handleInputChange}
            placeholder="Genre"
            className="border border-gray-300 rounded-md py-2 px-4 mr-2 focus:outline-none focus:ring-blue-200 dark:text-gray-600"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
          >
            Add Book
          </button>
        </form>
      </div>
      {error && <div className="text-red-500 text-center">{error}</div>}
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Your Books</h2>
        {books.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {books.map((book) => (
              <li
                key={book.id}
                className="border border-gray-200 rounded-md p-4"
              >
                <Link
                  to={`/books/${book.id}`}
                  className="text-blue-500 hover:underline font-bold"
                >
                  {book.title}
                </Link>
                <p className="mt-2 text-gray-600">by {book.author}</p>
                <p className="mt-2">Genre: {book.genre}</p>
                <p className="mt-2">Status: {book.status}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No books available</p>
        )}
      </div>
    </div>
  );
};

export default Books;
