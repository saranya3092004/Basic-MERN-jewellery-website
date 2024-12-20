import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import "aos/dist/aos.css";
import AOS from "aos";

// Initialize AOS
AOS.init({
  duration: 1000, // Duration of the animation
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
