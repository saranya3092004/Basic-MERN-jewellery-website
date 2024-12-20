import React from "react";
import "./Latest.css";
import latestProducts from "../../../latestProducts";

const Latest = () => {
  return (
    <div className="latest-products-container" data-aos="fade-up">
      <h2 className="latest-products-title">Latest Products</h2>
      <div className="latest-products-grid">
        {latestProducts.map((product, index) => (
          <div
            key={product.id}
            className="product-card"
            data-aos={index < 3 ? "fade-left" : "fade-right"}
            data-aos-delay={index * 100}
            data-aos-offset="200"
            data-aos-easing="ease-in-out"
          >
            <img
              src={product.image}
              alt={product.name}
              className="product-card-image"
            />
            <div className="product-card-details">
              <h3 className="product-card-title">{product.name}</h3>
              <p className="product-card-price">{product.price}</p>
              <button className="product-card-button">{product.button}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Latest;
