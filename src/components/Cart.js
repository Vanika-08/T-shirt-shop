import React, { useState, useEffect } from 'react';
import data from '../data.json'; // Ensure the path is correct
import './Cart.css';

function Cart({ cart, updateCart }) {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const cartItems = Object.keys(cart).map(id => {
    const item = data.find(item => item.id === parseInt(id, 10));
    return item ? { ...item, quantity: cart[id] } : null;
  }).filter(item => item !== null);

  const handleChangeQuantity = (id, change) => {
    const item = data.find(item => item.id === id);
    if (item.quantity < cart[id] + change) {
      setErrors(prevErrors => ({ ...prevErrors, [id]: `Only ${item.quantity} items available` }));
      return;
    }
    setErrors(prevErrors => ({ ...prevErrors, [id]: null }));
    updateCart(prevCart => {
      const updatedCart = { ...prevCart };
      if (change === 1) {
        updatedCart[id] = (updatedCart[id] || 0) + 1;
      } else if (change === -1 && updatedCart[id] > 1) {
        updatedCart[id] -= 1;
      } else if (change === -1 && updatedCart[id] === 1) {
        delete updatedCart[id];
      }
      return updatedCart;
    });
  };

  const handleRemoveItem = (id) => {
    updateCart(prevCart => {
      const updatedCart = { ...prevCart };
      delete updatedCart[id];
      return updatedCart;
    });
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div><br></br>
    <h2 className="head" >Shopping Cart</h2><br></br>
      <div className="cart">
        <div className="cart-items">
          {cartItems.length > 0 ? (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-box">
                  <div className="image-box">
                    <img src={item.imageURL} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <div className="item-name">{item.name}</div>
                    <div className="item-price">Rs {item.price}</div>
                    <div className="controls-container">
                      <button className="quantity-button" onClick={() => handleChangeQuantity(item.id, -1)}>-</button>
                      <p>{item.quantity}</p>
                      <button className="quantity-button" onClick={() => handleChangeQuantity(item.id, 1)}>+</button>
                      <button className="remove-button" onClick={() => handleRemoveItem(item.id)}>Delete</button>
                    </div>
                    {errors[item.id] && <div style={{ color: 'red' }}>{errors[item.id]}</div>}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
          {cartItems.length > 0 && (
            <div className="cart-total">
              Total Amount: Rs {totalAmount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;