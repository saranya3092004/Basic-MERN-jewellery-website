import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./OrderPage.css";

const ORDER_API_URL = "http://localhost:5000/order";

const OrderPage = () => {
  const { orderId } = useParams(); // Extract orderId from URL parameters
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`${ORDER_API_URL}/${orderId}`);
        if (!response.ok) throw new Error("Failed to fetch order details");
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order details:", error);

        setOrder({ error: "Failed to fetch order details" });
      }
    };

    fetchOrder();
  }, [orderId]);

  const getRandomDeliveryDate = () => {
    const today = new Date();
    const maxDays = 10;
    const randomDays = Math.floor(Math.random() * maxDays) + 1;
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + randomDays);
    return deliveryDate.toDateString();
  };

  const generateRandomHexId = () => {
    // Generate a random number and convert it to hexadecimal
    return Math.random().toString(16).slice(2, 8).toUpperCase();
  };

  // Handle the case when order is not loaded or is an error
  if (!order) {
    return <p>Loading order details...</p>;
  }

  if (order.error) {
    return <p>{order.error}</p>; // Display error if there is one
  }

  return (
    <div className="order-page">
      <h2>Your Order</h2>
      {order.items && order.items.length > 0 ? (
        <div className="order-items">
          {order.items.map((item) => (
            <div key={item.id} className="order-item-card">
              <img
                src={item.image}
                alt={item.title}
                className="order-item-image"
              />
              <div className="order-item-info">
                <h3 className="order-item-title">{item.title}</h3>
                <p className="order-item-price">₹{item.price}</p>
                <p className="order-item-quantity">Quantity: {item.quantity}</p>
                <p className="order-delivery">
                  Expected delivery date: {getRandomDeliveryDate()}
                </p>
                <p className="order-id">
                  Your order ID: {generateRandomHexId()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No items in the order.</p>
      )}
      <div className="order-summary">
        <h3>Order Summary</h3>
        <p>Subtotal: ₹{order.subtotal?.toFixed(2) || "0.00"}</p>
        <p>Discount: -₹{order.discount?.toFixed(2) || "0.00"}</p>
        <p>Total: ₹{order.total?.toFixed(2) || "0.00"}</p>
      </div>
    </div>
  );
};

export default OrderPage;
