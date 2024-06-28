import React from 'react';

const CallToAction = () => {
  return (
    <section className="bg-blue-500 text-white dark:bg-gray-900 dark:text-gray-200 py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Dive Into the World of Books?</h2>
        <p className="text-lg mb-8">Sign up today and start your reading adventure with BookWorm.</p>
        <button className="bg-white text-blue-500 dark:text-gray-900 py-2 px-4 rounded hover:bg-gray-200">Get Started for Free</button>
      </div>
    </section>
  );
};

export default CallToAction;
