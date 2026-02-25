import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./CartSlice";
import "./ProductList.css";

const plantData = [
  {
    id: 1,
    name: "Snake Plant",
    category: "Indoor",
    price: 499,
    stock: 10,
    description: "Air-purifying and low maintenance plant.",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb"
  },
  {
    id: 2,
    name: "Peace Lily",
    category: "Indoor",
    price: 599,
    stock: 5,
    description: "Elegant flowering plant for indoors.",
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735"
  },
  {
    id: 3,
    name: "Aloe Vera",
    category: "Succulent",
    price: 399,
    stock: 8,
    description: "Medicinal plant with healing properties.",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
  },
  {
    id: 4,
    name: "Cactus",
    category: "Succulent",
    price: 299,
    stock: 12,
    description: "Desert plant requiring minimal water.",
    image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7"
  },
  {
    id: 5,
    name: "Money Plant",
    category: "Indoor",
    price: 349,
    stock: 6,
    description: "Brings positivity and good luck.",
    image: "https://images.unsplash.com/photo-1524594157368-45f7c1f9e1a1"
  }
];

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("");

  const categories = ["All", ...new Set(plantData.map(p => p.category))];

  const isAdded = (id) => {
    return cartItems.some(item => item.id === id);
  };

  const filteredProducts = plantData
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(product =>
      selectedCategory === "All"
        ? true
        : product.category === selectedCategory
    )
    .sort((a, b) => {
      if (sortOption === "low-high") return a.price - b.price;
      if (sortOption === "high-low") return b.price - a.price;
      return 0;
    });

  return (
    <div className="product-list">
      <h2>Explore Our Plant Collection 🌿</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search plants..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Category Filter */}
      <div className="category-buttons">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? "active" : ""}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Sorting */}
      <div className="sort-section">
        <label>Sort By Price: </label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">None</option>
          <option value="low-high">Low to High</option>
          <option value="high-low">High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((plant) => (
            <div key={plant.id} className="product-card">
              <img src={plant.image} alt={plant.name} />
              <h3>{plant.name}</h3>
              <p className="category">{plant.category}</p>
              <p>{plant.description}</p>
              <p className="price">₹{plant.price}</p>
              <p className="stock">
                {plant.stock > 0 ? "In Stock" : "Out of Stock"}
              </p>

              <button
                onClick={() => dispatch(addToCart(plant))}
                disabled={isAdded(plant.id) || plant.stock === 0}
              >
                {isAdded(plant.id) ? "Added ✓" : "Add to Cart"}
              </button>
            </div>
          ))
        ) : (
          <h3>No plants found 🌱</h3>
        )}
      </div>
    </div>
  );
}

export default ProductList;
