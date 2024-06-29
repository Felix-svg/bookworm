import { Link} from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-gray-100 dark:bg-gray-800 dark:text-gray-200 py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Discover Your Next Favorite Book with BookWorm</h1>
        <p className="text-xl mb-8">Join our community and explore a world of books, personalized recommendations, and exclusive content.</p>
       <Link to="/login"><button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Get Started for Free</button></Link> 
      </div>
    </section>
  );
};

export default Hero;
