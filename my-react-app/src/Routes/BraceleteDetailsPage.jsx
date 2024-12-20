import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./BraceletDetailsPage.css";
import braceletsData from "../../Bracelets";

const API_URL = "http://localhost:5000/cart";

const BraceletDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  // Find the specific bracelet using the numeric ID
  const selectedBracelet = braceletsData.find((item) => item.id === id);

  // Filter out the other bracelets
  const otherBracelets = braceletsData.filter((item) => item.id !== id);

  useEffect(() => {
    if (selectedBracelet) {
      const fetchCartItems = async () => {
        try {
          const response = await fetch(API_URL);
          if (!response.ok) throw new Error("Network response was not ok");
          const data = await response.json();

          const isBraceletInCart = data.some(
            (item) => item.id === selectedBracelet.id
          );
          setAdded(isBraceletInCart);
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      };

      fetchCartItems();
    }
  }, [selectedBracelet]);

  if (!selectedBracelet) {
    return <div>Bracelet not found</div>;
  }

  const handleBuyNow = () => {
    navigate("/shopping-cart", { state: { selectedBracelet } });
  };

  const handleAddToCart = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...selectedBracelet, quantity: 1 }),
      });

      if (!response.ok) throw new Error("Failed to add item to cart");

      setAdded(true);
      window.dispatchEvent(new Event("cartUpdated")); // Notify Navbar
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <div className="bracelet-detail-page">
      <div className="bracelet-detail-container">
        <div className="bracelet-image-container">
          <img
            src={selectedBracelet.image}
            alt={selectedBracelet.title}
            className="bracelet-image"
          />
        </div>
        <div className="bracelet-info-container">
          <h1 className="bracelet-title">{selectedBracelet.title}</h1>
          <p className="bracelet-price">₹{selectedBracelet.price}</p>
          <p className="bracelet-description">{selectedBracelet.description}</p>
          <div className="bracelet-features">
            <div className="feature-item">Easy 30 Day Return</div>
            <div className="feature-item">6-Month Warranty</div>
            <div className="feature-item">Lifetime Plating</div>
            <div className="feature-item">Made with 925 Silver</div>
          </div>
          <div className="bracelet-delivery">
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
          <div className="bracelet-actions">
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
      <div className="bracelet-cards-section">
        <h2 className="section-title">Other Bracelets You Might Like</h2>
        <div className="bracelet-cards-container">
          {otherBracelets.map((item) => (
            <Link
              to={`/bracelets/${item.id}`}
              key={item.id}
              className="bracelet-card-link"
            >
              <div className="bracelet-card">
                <img
                  src={item.image}
                  alt={item.title}
                  className="bracelet-card-image"
                />
                <h3 className="bracelet-card-title">{item.title}</h3>
                <p className="bracelet-card-price">₹{item.price}</p>
                <p className="bracelet-card-description">{item.description}</p>
                <button className="bracelet-card-button">View Details</button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BraceletDetailPage;
