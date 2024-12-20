import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Routes/HomePage";
import LoginPage from "./Routes/LoginPage";
import SignUpPage from "./Routes/SignUpPage";
import Earings from "./Components/Categories/Earings";
import ProductDetailPage from "./Routes/ProductDetailPage";
import CartPage from "./Components/Cart/CartPage";
import Layout from "./Components/Layout";
import OrderPage from "./Components/Orders/OrderPage";
import OrdersPage from "./Components/Orders/OrdersPage";
import PendentDetailsPage from "./Routes/PendentDetailsPage";
import Pendents from "./Components/Categories/Pendents";
import Bracelets from "./Components/Categories/Bracelets";
import BraceletDetailsPage from "./Routes/BraceleteDetailsPage";
import RingDetailsPage from "./Routes/RingDetailsPage";
import Rings from "./Components/Categories/Rings";

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/earings" element={<Earings />} />
          <Route path="/pendents" element={<Pendents />} />
          <Route path="/bracelets" element={<Bracelets />} />
          <Route path="/rings" element={<Rings />} />
          <Route
            path="/product/:id"
            element={<ProductDetailPage addToCart={addToCart} />}
          />
          <Route path="/pendents/:id" element={<PendentDetailsPage />} />
          <Route path="/bracelets/:id" element={<BraceletDetailsPage />} />
          <Route path="/rings/:id" element={<RingDetailsPage />} />
          <Route path="/cart" element={<CartPage cartItems={cartItems} />} />
          <Route path="/order/:orderId" element={<OrderPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
