import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./ProductDetailPage.css";
import products from "../../earings";

const API_URL = "http://localhost:5000/cart";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  const product = products.find((item) => item.id === id);
  const otherProducts = products.filter((item) => item.id !== id);

  useEffect(() => {
    if (product) {
      const fetchCartItems = async () => {
        try {
          const response = await fetch(API_URL);
          if (!response.ok) throw new Error("Network response was not ok");
          const data = await response.json();

          // Convert both IDs to the same type before comparison
          const isProductInCart = data.some(
            (item) => String(item.id) === String(product.id)
          );
          setAdded(isProductInCart);

          console.log("Fetched Cart Items:", data);
          console.log(
            "Product ID:",
            product.id,
            "Is product in cart:",
            isProductInCart
          );
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
        body: JSON.stringify({ ...product, quantity: 1 }), // Adjust if quantity is needed
      });

      if (!response.ok) throw new Error("Failed to add item to cart");

      setAdded(true); // Update the state to reflect that the item is now added
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-image-container">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
        </div>
        <div className="product-info-container">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-price">₹{product.price}</p>
          <p className="product-description">{product.description}</p>
          <div className="product-features">
            <div className="feature-item">Easy 30 Day Return</div>
            <div className="feature-item">6-Month Warranty</div>
            <div className="feature-item">Lifetime Plating</div>
            <div className="feature-item">Made with 925 Silver</div>
          </div>
          <div className="product-delivery">
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
          <div className="product-actions">
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
      <div className="earring-cards-section">
        <h2 className="section-title">Other Earrings You Might Like</h2>
        <div className="earring-cards-container">
          {otherProducts.map((item) => (
            <Link
              to={`/product/${item.id}`}
              key={item.id}
              className="earring-card-link"
            >
              <div className="earring-card">
                <img
                  src={item.image}
                  alt={item.title}
                  className="earring-card-image"
                />
                <h3 className="earring-card-title">{item.title}</h3>
                <p className="earring-card-price">₹{item.price}</p>
                <p className="earring-card-description">{item.description}</p>
                <button className="earring-card-button">View Details</button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
