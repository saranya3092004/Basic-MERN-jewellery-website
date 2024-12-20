import React from "react";
import "./HomePage.css";
import Background from "../assets/background3.mp4";
import SliderImage from "../Components/Slider/Slider";
import Navbar from "../Components/Navbar/Navbar";
import Latest from "../Components/Latest/Latest";
import Categories from "../Components/Categories/Categories";
import Footer from "../Components/Footer/Footer";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <Navbar />

      <div className="video-container">
        <video autoPlay loop muted playsInline className="background-video">
          <source src={Background} type="video/mp4" />
        </video>

        <div className="quote-overlay">
          <h1 data-aos="zoom-in" data-aos-delay="300">
            "Adorn yourself with elegance"
          </h1>
          <p data-aos="zoom-in" data-aos-delay="600">
            Discover the timeless beauty that shines from within.
          </p>
        </div>
        <button className="explore-button">Find Your Shine</button>
      </div>

      <SliderImage />
      <Latest />
      <Categories />

      <Footer />
    </div>
  );
};

export default HomePage;
