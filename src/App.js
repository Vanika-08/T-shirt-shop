import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Catalog from './components/Catalog';
import Cart from './components/Cart';
import Header from './components/Header';

function App() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || {});
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    setCartItemCount(Object.values(cart).reduce((acc, count) => acc + count, 0));
  }, [cart]);

  const handleAddToCart = (item) => {
    const updatedCart = { ...cart };
    if (updatedCart[item.id]) {
      updatedCart[item.id] += 1;
    } else {
      updatedCart[item.id] = 1;
    }
    setCart(updatedCart);
  };

  const updateCart = (newCart) => {
    setCart(newCart);
  };

  return (
    <div>
      <Header cartItemCount={cartItemCount} />
      <Routes>
        <Route path="/" element={<Catalog onAddToCart={handleAddToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} updateCart={updateCart} />} />
      </Routes>
    </div>
  );
}

export default App;