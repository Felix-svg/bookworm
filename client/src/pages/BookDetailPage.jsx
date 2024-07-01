import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [error, setError] = useState("");

  const fetchBook = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://bookworm-6lvy.onrender.com/books/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBook(response.data.book);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Unauthorized access. Please log in again.");
      } else {
        setError("Failed to fetch book details. Please try again later.");
      }
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  const markAsRead = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.patch(
        `https://bookworm-6lvy.onrender.com/books/${id}`,
        { status: "Read" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        //console.log("Book marked as read:", response.data);
        // Refresh book details after update
        fetchBook();
      } else {
        //console.error("Failed to mark book as read:", response.status);
        setError("Failed to mark book as read. Please try again later.");
      }
    } catch (error) {
      //console.error("Error marking book as read:", error);
      setError("Failed to mark book as read. Please try again later.");
    }
  };

  const deleteBook = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://bookworm-6lvy.onrender.com/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/books");
    } catch (error) {
      setError("Failed to delete book. Please try again later.");
    }
  };

  if (!book) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  return (
    <div className="container mx-auto mt-10 p-6 bg-gray-800 text-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-4">
        {book.title} by {book.author}
      </h2>
      <p className="text-lg text-center mb-4">Status: {book.status}</p>
      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
      <div className="flex justify-center">
        <button
          onClick={markAsRead}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 mr-2 rounded focus:outline-none"
        >
          Mark as Read
        </button>
        <button
          onClick={deleteBook}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookDetail;
