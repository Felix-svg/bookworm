import axios from "axios";
import { useState, useEffect } from "react";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:5000/books", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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

  const username = localStorage.getItem("username") || "Guest";

  return (
    <div className="container mx-auto mt-10">
      <p className="font-bold text-center">
        {greeting()} {username}
      </p>
      {error && <div className="text-red-500 text-center">{error}</div>}
      <div className="mt-4">
        Your Books
        {books.length > 0 ? (
          <ul className="list-disc list-inside">
            {books.map((book) => (
              <li key={book.id} className="mt-2">
                {book.title}
                {book.author}
                {book.status}
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
