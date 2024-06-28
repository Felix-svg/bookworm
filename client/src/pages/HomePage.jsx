import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import HowItWorks from "../components/HowItWorks";
import CallToAction from "../components/CallToAction";

const HomePage = () => {
  // const username = localStorage.getItem("username") || "Guest";

  return (
    <div>
      <Hero />
      <About />
      <Features />
      <Testimonials />
      <HowItWorks />
      <CallToAction />
    </div>
  );
};

export default HomePage;
