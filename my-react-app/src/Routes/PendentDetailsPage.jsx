import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./PendentDetailsPage.css";
import pendents from "../../pendents";

const API_URL = "http://localhost:5000/cart";

const PendentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  const product = pendents.find((item) => item.id === id);
  const otherProducts = pendents.filter((item) => item.id !== id);

  useEffect(() => {
    if (product) {
      const fetchCartItems = async () => {
        try {
          const response = await fetch(API_URL);
          if (!response.ok) throw new Error("Network response was not ok");
          const data = await response.json();

          const isProductInCart = data.some(
            (item) => String(item.id) === String(product.id)
          );
          setAdded(isProductInCart);
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      };

      fetchCartItems();
    }
  }, [product]);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleBuyNow = () => {
    navigate("/shopping-cart", { state: { product } });
  };

  const handleAddToCart = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...product, quantity: 1 }),
      });

      if (!response.ok) throw new Error("Failed to add item to cart");

      setAdded(true);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <div className="pendent-detail-page">
      <div className="pendent-detail-container">
        <div className="pendent-image-container">
          <img
            src={product.image}
            alt={product.title}
            className="pendent-image"
          />
        </div>
        <div className="pendent-info-container">
          <h1 className="pendent-title">{product.title}</h1>
          <p className="pendent-price">₹{product.price}</p>
          <p className="pendent-description">{product.description}</p>
          <div className="pendent-features">
            <div className="feature-item">Easy 30 Day Return</div>
            <div className="feature-item">6-Month Warranty</div>
            <div className="feature-item">Lifetime Plating</div>
            <div className="feature-item">Made with 925 Silver</div>
          </div>
          <div className="pendent-delivery">
            <label>Estimated Delivery Time</label>
            <div>
              <input
                type="text"
                placeholder="Enter 6 digit pincode"
                className="pincode-input"
              />
              <button className="check-button">CHECK</button>
            </div>
          </div>
          <div className="pendent-actions">
            <button className="buy-now-button" onClick={handleBuyNow}>
              Buy Now
            </button>
            <button
              className="add-to-cart-button"
              onClick={handleAddToCart}
              disabled={added}
            >
              {added ? "Added to Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
      <div className="pendent-cards-section">
        <h2 className="section-title">Other Pendants You Might Like</h2>
        <div className="pendent-cards-container">
          {otherProducts.map((item) => (
            <Link
              to={`/pendents/${item.id}`}
              key={item.id}
              className="pendent-card-link"
            >
              <div className="pendent-card">
                <img
                  src={item.image}
                  alt={item.title}
                  className="pendent-card-image"
                />
                <h3 className="pendent-card-title">{item.title}</h3>
                <p className="pendent-card-price">₹{item.price}</p>
                <p className="pendent-card-description">{item.description}</p>
                <button className="pendent-card-button">View Details</button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PendentDetailPage;
