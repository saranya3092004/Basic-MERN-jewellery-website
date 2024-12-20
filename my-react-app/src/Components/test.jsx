import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

const TestPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: false,
    });
  }, []);

  return (
    <div>
      <h1 data-aos="fade-up">Fade Up Animation</h1>
      <p data-aos="fade-up" data-aos-delay="500">
        This paragraph should fade up with a delay.
      </p>
    </div>
  );
};

export default TestPage;
