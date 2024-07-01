import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://bookworm-6lvy.onrender.com/subscribe",
        { email }
      );
      setMessage(response.data.message);
      setEmail("");
    } catch (error) {
      setMessage(
        error.response ? error.response.data.error : "An error occured"
      );
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <footer className="bg-gray-800 text-white py-8 mt-16">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <Link to="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:underline">
            Terms of Service
          </Link>
          <Link to="/about" className="hover:underline">
            About Us
          </Link>
          <Link to="/features" className="hover:underline">
            Features
          </Link>
          <Link to="/testimonials" className="hover:underline">
            Testimonials
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact Us
          </Link>
        </div>
        <p className="mb-4">Follow us on social media</p>
        <div id="contact" className="flex justify-center space-x-4">
          <a href="https://facebook.com" className="hover:underline">
            Facebook
          </a>
          <a href="https://twitter.com" className="hover:underline">
            Twitter
          </a>
          <a href="https://instagram.com" className="hover:underline">
            Instagram
          </a>
        </div>
        <div className="mt-4">
          <form onSubmit={handleSubmit}>
            <label htmlFor="newsletter" className="block mb-2">
              Subscribe to our newsletter
            </label>
            <div className="flex justify-center">
              <input
                type="email"
                id="newsletter"
                className="p-2 rounded-l text-gray-600"
                placeholder="Your email"
                value={email}
                onChange={handleEmailChange}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-r"
              >
                Subscribe
              </button>
            </div>
            {message && <p>{message}</p>}
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
