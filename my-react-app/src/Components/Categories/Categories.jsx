import React from "react";
import "./Categories.css";
import categories from "../../../categories";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="categories-container" data-aos="flip-up">
      <h2 className="categories-title">Shop by Category</h2>
      <div className="categories-grid">
        {categories.map((category) => (
          <Link
            to={`/${category.name.toLowerCase()}`}
            key={category.id}
            className="category-card"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <img
              src={category.image}
              alt={category.name}
              className="category-card-image"
            />
            <div className="category-card-details">
              <h3 className="category-card-title">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
