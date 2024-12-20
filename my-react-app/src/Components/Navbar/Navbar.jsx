import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const API_URL = "http://localhost:5000/cart";
const PRODUCTS_API_URL = "http://localhost:5000/products";

const Navbar = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchCartItemCount = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setCartItemCount(data.length); // Set the number of items in the cart
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(PRODUCTS_API_URL);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    // Fetch cart item count and products on initial load
    fetchCartItemCount();
    fetchProducts();

    // Set up an event listener for custom cart updates
    const handleCartUpdated = () => {
      fetchCartItemCount();
    };

    window.addEventListener("cartUpdated", handleCartUpdated);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdated);
    };
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      // Filter products based on search term when Enter key is pressed
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(results);
      setSearchTerm(""); // Clear search input
    }
  };

  return (
    <div className="navbar-container">
      <div className="navbar-top">
        <div className="logo">
          <h1>ELARA</h1>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder='Search "Jhumki"'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleSearch} // Listen for Enter key press
          />
          <span className="search-icon">&#128269;</span>
        </div>
        <div className="nav-icons">
          <div className="icon-container">
            <Link to="/login">
              <span>ACCOUNT</span>
            </Link>
          </div>
          <div className="icon-container">
            <Link to="/cart">
              <FontAwesomeIcon icon={faCartShopping} />
              {cartItemCount > 0 && (
                <span className="cart-count">{cartItemCount}</span>
              )}
            </Link>
          </div>
          <div className="orders">
            <Link to="/orders">Orders</Link>
          </div>
        </div>
      </div>
      {/* Display filtered search results */}
      {filteredProducts.length > 0 && (
        <div className="search-results">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/pendents/${product.id}`}
              className="search-result-item"
            >
              {product.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
