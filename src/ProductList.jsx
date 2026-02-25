import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./CartSlice";
import "./ProductList.css";

const plantData = [
  {
    category: "Indoor Plants",
    items: [
      {
        id: 1,
        name: "Snake Plant",
        price: 499,
        description: "Low maintenance air-purifying plant.",
        image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb"
      },
      {
        id: 2,
        name: "Peace Lily",
        price: 599,
        description: "Beautiful flowering indoor plant.",
        image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735"
      }
    ]
  },
  {
    category: "Succulents",
    items: [
      {
        id: 3,
        name: "Aloe Vera",
        price: 399,
        description: "Medicinal plant with healing properties.",
        image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
      },
      {
        id: 4,
        name: "Cactus",
        price: 299,
        description: "Desert plant requiring minimal water.",
        image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7"
      }
    ]
  }
];

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const isAdded = (id) => {
    return cartItems.some((item) => item.id === id);
  };

  return (
    <div className="product-list">
      <h2>Explore Our Collection 🌿</h2>

      {plantData.map((section) => (
        <div key={section.category} className="category-section">
          <h3>{section.category}</h3>
          <div className="products">
            {section.items.map((plant) => (
              <div key={plant.id} className="product-card">
                <img src={plant.image} alt={plant.name} />
                <h4>{plant.name}</h4>
                <p>{plant.description}</p>
                <p className="price">₹{plant.price}</p>

                <button
                  onClick={() => dispatch(addToCart(plant))}
                  disabled={isAdded(plant.id)}
                >
                  {isAdded(plant.id) ? "Added ✓" : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
