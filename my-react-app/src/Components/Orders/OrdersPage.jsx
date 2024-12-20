import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./OrdersPage.css";

const ORDER_API_URL = "http://localhost:5000/orders";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(ORDER_API_URL);
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  if (orders.length === 0) {
    return <p>No orders found.</p>;
  }

  return (
    <div className="orders-page">
      <h2>Your Orders</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <Link to={`/order/${order._id}`}>
              <h3>Order ID: {order._id}</h3>
              <p>Subtotal: ₹{order.subtotal.toFixed(2)}</p>
              <p>Total: ₹{order.total.toFixed(2)}</p>
              <p>Items: {order.items.length}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
