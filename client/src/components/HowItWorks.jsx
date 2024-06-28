import React from 'react';

const HowItWorks = () => {
  return (
    <section className="bg-gray-100 dark:bg-gray-800 dark:text-gray-200 py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white dark:bg-gray-700 p-6 rounded shadow">
              <h3 className="text-xl font-bold mb-2">Sign Up</h3>
              <p>Create your free account in just a few minutes.</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white dark:bg-gray-700 p-6 rounded shadow">
              <h3 className="text-xl font-bold mb-2">Personalize</h3>
              <p>Tell us about your reading preferences and interests.</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white dark:bg-gray-700 p-6 rounded shadow">
              <h3 className="text-xl font-bold mb-2">Discover</h3>
              <p>Get personalized book recommendations and start reading.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
