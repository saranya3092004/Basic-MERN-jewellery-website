import React from "react";
import "./Footer.css";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPinterest,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="footer"
      data-aos="fade-up"
      data-aos-anchor-placement="center-center"
    >
      <div className="footer-container">
        <div className="footer-section about">
          <h4>About Us</h4>
          <p>
            We specialize in crafting exquisite jewelry pieces that epitomize
            elegance and luxury. Each piece is a work of art, designed to
            elevate your style and celebrate your most cherished moments.
          </p>
        </div>
        <div className="footer-section quick-links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Shop</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h4>Contact Us</h4>
          <p>Email: support@yourwebsite.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: 123 Jewelry Lane, City, Country</p>
          <div className="social-icons">
            <FaFacebook className="social-icon" />
            <FaTwitter className="social-icon" />
            <FaInstagram className="social-icon" />
            <FaPinterest className="social-icon" />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Your Website Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
