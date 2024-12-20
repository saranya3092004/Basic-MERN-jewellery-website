import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";
import "./ShoppingCart.css";

Modal.setAppElement("#root");

const ShoppingCart = () => {
  const location = useLocation();
  const product = location.state?.product;
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handlePlaceOrder = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  if (!product) {
    return <div>Your cart is empty.</div>;
  }

  const {
    title,
    image,
    size,
    quantity = 1,
    diamondQuality,
    goldColor,
    diamondWeight,
    diamondCharges,
    goldPurity,
    price,
  } = product;

  // Assuming a fixed tax amount
  const tax = 1245;
  const total = price + tax;

  return (
    <div className="container">
      <h2>Shopping Cart</h2>
      <div className="shopping-cart">
        <div className="cart-item">
          <img src={image} alt={title} />
          <div className="item-details">
            <h3>{title}</h3>
            <div className="item-info">
              <span>Size: {size}</span>
              <span>Quantity: {quantity}</span>
              <span>Diamond Quality: {diamondQuality}</span>
              <span>Gold Colour: {goldColor}</span>
              <span>Diamond Weight: {diamondWeight}</span>
              <span>Diamond Charges: ₹ {diamondCharges}</span>
              <span>Gold Purity: {goldPurity}</span>
            </div>
            <button>Remove</button>
          </div>
        </div>
        <div className="order-summary">
          <h3>Order Summary</h3>
          <p>Subtotal: ₹ {price}</p>
          <p>You Saved: -₹ {price - total}</p>
          <p>TOTAL: ₹ {total} (Inclusive of all taxes)</p>
          <button className="place-order" onClick={handlePlaceOrder}>
            PLACE ORDER
          </button>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Order Confirmation"
        className="order-confirmation-modal"
        overlayClassName="order-confirmation-overlay"
      >
        <h2>Order Confirmed!</h2>
        <p>Your order has been placed successfully.</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default ShoppingCart;
