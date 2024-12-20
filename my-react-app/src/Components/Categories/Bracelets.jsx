import React from "react";
import { Link } from "react-router-dom";
import "./Bracelets.css";
import bracelets from "../../../Bracelets";

const BraceletsPage = () => {
  return (
    <div className="category-page">
      <h2>Braceletes</h2>
      <div className="category-items-grid">
        {bracelets.map((item) => (
          <Link
            to={`/bracelets/${item.id}`}
            key={item.id}
            className="category-item-link"
          >
            <div className="category-item-card">
              <img
                src={item.image}
                alt={item.title}
                className="category-item-image"
              />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p className="price">₹{item.price}</p>
              <button className="buy-now-button">Buy Now</button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BraceletsPage;
