const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="bg-white dark:bg-gray-900 dark:text-gray-200 py-20"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Users Are Saying</h2>
        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded shadow">
              <p className="italic mb-4">
                "BookWorm has completely transformed my reading habits. The
                recommendations are always spot on!"
              </p>
              <p className="font-bold">- Jane Doe, Avid Reader</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded shadow">
              <p className="italic mb-4">
                "I love the community aspect of BookWorm. It's great to connect
                with others who share my passion for books."
              </p>
              <p className="font-bold">- John Smith, Book Enthusiast</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded shadow">
              <p className="italic mb-4">
                "The reading challenges keep me motivated and help me discover
                new genres I wouldn't have explored otherwise."
              </p>
              <p className="font-bold">- Sarah Lee, BookWorm Member</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
