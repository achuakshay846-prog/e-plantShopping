import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./CartSlice";
import "./ProductList.css";

const products = [
  {
    id: 1,
    name: "Snake Plant",
    price: 499,
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb"
  },
  {
    id: 2,
    name: "Aloe Vera",
    price: 399,
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
  },
  {
    id: 3,
    name: "Peace Lily",
    price: 599,
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735"
  },
  {
    id: 4,
    name: "Money Plant",
    price: 299,
    image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7"
  }
];

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const isInCart = (id) => {
    return cartItems.some((item) => item.id === id);
  };

  return (
    <div className="product-list">
      <h2>Our Plants 🌿</h2>
      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <button
              onClick={() => dispatch(addToCart(product))}
              disabled={isInCart(product.id)}
            >
              {isInCart(product.id) ? "Added" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
