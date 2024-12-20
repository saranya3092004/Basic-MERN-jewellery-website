const express = require("express");
const CartItem = require("../models/cartModels");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const { id, title, price, image, quantity } = req.body;

  if (!id || !title || !price || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    let cartItem = await CartItem.findOne({ id });

    if (cartItem) {
      cartItem.title = title;
      cartItem.price = price;
      cartItem.image = image;
      cartItem.quantity = quantity;
    } else {
      cartItem = new CartItem({ id, title, price, image, quantity });
    }

    await cartItem.save();
    res.status(201).json(cartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await CartItem.deleteOne({ id: req.params.id });
    if (result.deletedCount > 0) {
      res.json({ message: "Item removed" });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
