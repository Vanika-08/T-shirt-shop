import React, { useState } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";
import data from "../data.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Catalog.css";

function Catalog({ onAddToCart }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    gender: "",
    color: "",
    priceRange: [0, 10000],
    type: "",
  });
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || {});
  const [showFilters, setShowFilters] = useState(false); // State to toggle filters visibility

  const handleAddToCart = (item) => {
    const availableItem = data.find((i) => i.id === item.id);
    if (!availableItem || availableItem.quantity <= 0) return;

    const currentQuantity = cart[item.id] || 0;
    if (currentQuantity >= availableItem.quantity) {
      toast.error(`Cannot add more than ${availableItem.quantity} of this item.`, {
        position: "bottom-center",
      });
      return;
    }

    // Update cart with the new item quantity
    const newCart = { ...cart, [item.id]: currentQuantity + 1 };
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));

    // Show success message
    toast.success("Item added to cart!", {
      position: "bottom-center",
    });

    // Update cart item count
    const totalCount = Object.values(newCart).reduce((acc, count) => acc + count, 0);
    setCart(totalCount);
    onAddToCart(item);
  };

  const filteredItems = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.gender === "" || item.gender === filters.gender) &&
      (filters.color === "" || item.color === filters.color) &&
      item.price >= filters.priceRange[0] &&
      item.price <= filters.priceRange[1] &&
      (filters.type === "" || item.type === filters.type) &&
      item.quantity > 0
  );

  return (
    <div className="catalog-container">
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search for T-shirts..."
          className="search-input"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="filter-icon"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter />
          Filters
        </button>
      </div>
      <ToastContainer /> {/* Toast Container to display messages */}
      <div
        className={`filters-products-container ${
          showFilters ? "filters-visible" : ""
        }`}
      >
        <div className={`filters ${showFilters ? "" : "collapsed"}`}>
          {/* Filter Controls */}
          <label>
            Gender:
            <select
              onChange={(e) =>
                setFilters({ ...filters, gender: e.target.value })
              }
            >
              <option value="">All</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
            </select>
          </label>
          <label>
            Color:
            <select
              onChange={(e) =>
                setFilters({ ...filters, color: e.target.value })
              }
            >
              <option value="">All</option>
              <option value="Red">Red</option>
              <option value="Green">Green</option>
              <option value="Blue">Blue</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Purple">Purple</option>
              <option value="Pink">Pink</option>
              <option value="Grey">Grey</option>
            </select>
          </label>
          <label>
            Price Range:
            <input
              type="range"
              min="0"
              max="10000"
              step="200"
              value={filters.priceRange[1]}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  priceRange: [filters.priceRange[0], parseInt(e.target.value)],
                })
              }
            />
            <span>Rs {filters.priceRange[1]}</span>
          </label>
          <label>
            Min Price:
            <input
              type="number"
              min="0"
              max="10000"
              value={filters.priceRange[0]}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  priceRange: [parseInt(e.target.value), filters.priceRange[1]],
                })
              }
            />
          </label>
          <label>
            Type:
            <select
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="">All</option>
              <option value="Polo">Polo</option>
              <option value="Hoodie">Hoodie</option>
              <option value="Basic">Basic</option>
            </select>
          </label>
        </div>
        <div className="products-container">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item.id} className="product-item">
                <img
                  src={item.imageURL}
                  alt={item.name}
                  className="product-image"
                />
                <div className="product-details">
                  <h3>{item.name}</h3>
                  <div className="price-add-container">
                    <p className="product-price">Rs {item.price}</p>
                    <button
                      className="add-to-cart-button"
                      onClick={() => handleAddToCart(item)}
                      disabled={item.quantity <= 0}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Catalog;
