const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");

router.post("/", async (req, res) => {
  try {
    const { items } = req.body;
    const subtotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const discount = subtotal * 0.1;
    const total = subtotal - discount;

    const newOrder = new Order({
      items,
      subtotal,
      discount,
      total,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", error });
  }
});

router.get("/", async (req, res) => {
  try {
    console.log("Fetching all orders");
    const orders = await Order.find();
    res.json(orders);
    console.log("Orders fetched:", orders);
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order", error });
  }
});

module.exports = router;
