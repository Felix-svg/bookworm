const Features = () => {
  return (
    <section
      id="features"
      className="bg-gray-100 dark:bg-gray-800 dark:text-gray-200 py-20"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Why Choose BookWorm?</h2>
        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/2 lg:w-1/4 p-4">
            <div className="bg-white dark:bg-gray-700 p-6 rounded shadow">
              <h3 className="text-xl font-bold mb-2">
                Personalized Recommendations
              </h3>
              <p>
                Receive tailored book suggestions based on your reading history
                and preferences.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 p-4">
            <div className="bg-white dark:bg-gray-700 p-6 rounded shadow">
              <h3 className="text-xl font-bold mb-2">Extensive Library</h3>
              <p>
                Explore our vast collection of books across various genres, from
                fiction and non-fiction to mystery and romance.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 p-4">
            <div className="bg-white dark:bg-gray-700 p-6 rounded shadow">
              <h3 className="text-xl font-bold mb-2">Community Reviews</h3>
              <p>
                Read reviews and ratings from other readers to help you decide
                your next read.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 p-4">
            <div className="bg-white dark:bg-gray-700 p-6 rounded shadow">
              <h3 className="text-xl font-bold mb-2">Author Insights</h3>
              <p>
                Get exclusive interviews and insights from your favorite
                authors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
