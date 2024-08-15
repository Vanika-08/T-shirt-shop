import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import './Header.css';

function Header({ cartItemCount }) {
  return (
    <header>
      <nav className="nav-container">
        <Link to="/" className="shop-name">
          T-Shirt Store
        </Link>
        <div className="cart-container">
          <Link to="/cart" className="cart-link">
            <FaShoppingCart className="cart-icon" /> Cart
            {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
