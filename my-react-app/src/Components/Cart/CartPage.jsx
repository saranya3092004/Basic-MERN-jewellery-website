import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

const CART_API_URL = "http://localhost:5000/cart";
const ORDER_API_URL = "http://localhost:5000/order";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(CART_API_URL);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = async (id) => {
    try {
      const response = await fetch(`${CART_API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to remove item");
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch(ORDER_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cartItems }),
      });
      if (!response.ok) throw new Error("Failed to create order");

      const orderData = await response.json();

      // Navigate to the OrderPage with the order ID
      navigate(`/order/${orderData._id}`);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateDiscount = (subtotal) => {
    return subtotal * 0.1;
  };

  const subtotal = calculateTotal();
  const discount = calculateDiscount(subtotal);
  const total = subtotal - discount;

  return (
    <div className="cart-page">
      {cartItems.length === 0 ? (
        <div className="empty-cart-message">
          <p>Your cart is empty</p>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-card">
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <h3 className="cart-item-title">{item.title}</h3>
                  <p className="cart-item-price">₹{item.price}</p>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
            <p>Discount (10%): -₹{discount.toFixed(2)}</p>
            <p>Total: ₹{total.toFixed(2)}</p>
            <button className="checkout-button" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
