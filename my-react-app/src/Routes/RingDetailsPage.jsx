import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./RingDetailsPage.css";
import ringsData from "../../ring";

const API_URL = "http://localhost:5000/cart";

const RingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  // Find the specific ring using the string ID
  const selectedRing = ringsData.find((item) => item.id === id);

  // Filter out the other rings
  const otherRings = ringsData.filter((item) => item.id !== id);

  useEffect(() => {
    if (selectedRing) {
      const fetchCartItems = async () => {
        try {
          const response = await fetch(API_URL);
          if (!response.ok) throw new Error("Network response was not ok");
          const data = await response.json();

          const isRingInCart = data.some(
            (item) => String(item.id) === selectedRing.id
          );
          setAdded(isRingInCart);
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      };

      fetchCartItems();
    }
  }, [selectedRing]);

  if (!selectedRing) {
    return <div>Ring not found</div>;
  }

  const handleBuyNow = () => {
    navigate("/shopping-cart", { state: { selectedRing } });
  };

  const handleAddToCart = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...selectedRing, quantity: 1 }),
      });

      if (!response.ok) throw new Error("Failed to add item to cart");

      setAdded(true);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <div className="ring-detail-page">
      <div className="ring-detail-container">
        <div className="ring-image-container">
          <img
            src={selectedRing.image}
            alt={selectedRing.title}
            className="ring-image"
          />
        </div>
        <div className="ring-info-container">
          <h1 className="ring-title">{selectedRing.title}</h1>
          <p className="ring-price">₹{selectedRing.price}</p>
          <p className="ring-description">{selectedRing.description}</p>
          <div className="ring-features">
            <div className="feature-item">Easy 30 Day Return</div>
            <div className="feature-item">6-Month Warranty</div>
            <div className="feature-item">Lifetime Plating</div>
            <div className="feature-item">Made with 925 Silver</div>
          </div>
          <div className="ring-delivery">
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
          <div className="ring-actions">
            <button className="buy-now-button" onClick={handleBuyNow}>
              Buy Now
            </button>
            <button
              className="add-to-cart-button"
              onClick={handleAddToCart}
              disabled={added} // Disable the button if the item is already added
            >
              {added ? "Added to Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
      <div className="ring-cards-section">
        <h2 className="section-title">Other Rings You Might Like</h2>
        <div className="ring-cards-container">
          {otherRings.map((item) => (
            <Link
              to={`/rings/${item.id}`}
              key={item.id}
              className="ring-card-link"
            >
              <div className="ring-card">
                <img
                  src={item.image}
                  alt={item.title}
                  className="ring-card-image"
                />
                <h3 className="ring-card-title">{item.title}</h3>
                <p className="ring-card-price">₹{item.price}</p>
                <p className="ring-card-description">{item.description}</p>
                <button className="ring-card-button">View Details</button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RingDetailPage;
