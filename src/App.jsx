import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductList from "./ProductList";
import CartItem from "./CartItem";
import AboutUs from "./AboutUs";
import "./App.css";

function App() {
  const [showProducts, setShowProducts] = useState(false);
  const [showCart, setShowCart] = useState(false);

  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate total quantity
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleGetStarted = () => {
    setShowProducts(true);
  };

  const handleShowCart = () => {
    setShowCart(true);
    setShowProducts(false);
  };

  const handleShowProducts = () => {
    setShowProducts(true);
    setShowCart(false);
  };

  return (
    <div>
      {/* Landing Page */}
      {!showProducts && !showCart && (
        <div className="landing-page">
          <div className="background-image"></div>
          <div className="content">
            <h1>Paradise Nursery</h1>
            <p>Bringing Nature Closer to You 🌿</p>
            <button onClick={handleGetStarted}>Get Started</button>
          </div>
        </div>
      )}

      {/* Products Page */}
      {showProducts && !showCart && (
        <>
          <nav className="navbar">
            <h2>Paradise Nursery</h2>
            <div>
              <button onClick={handleShowProducts}>Products</button>
              <button onClick={handleShowCart}>
                Cart 🛒 ({totalItems})
              </button>
            </div>
          </nav>
          <AboutUs />
          <ProductList />
        </>
      )}

      {/* Cart Page */}
      {showCart && (
        <>
          <nav className="navbar">
            <h2>Paradise Nursery</h2>
            <div>
              <button onClick={handleShowProducts}>
                Back to Products
              </button>
            </div>
          </nav>
          <CartItem />
        </>
      )}
    </div>
  );
}

export default App;
