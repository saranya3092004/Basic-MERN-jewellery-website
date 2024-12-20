import React from "react";
import { Link } from "react-router-dom";
import "./Rings.css";
import ring from "../../../ring";

const Ring = () => {
  return (
    <div className="category-page">
      <h2>Rings</h2>
      <div className="category-items-grid">
        {ring.map((item) => (
          <Link
            to={`/rings/${item.id}`}
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

export default Ring;
