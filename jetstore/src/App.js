// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Purchase from './components/purchase';
import PaymentEntry from './components/paymentEntry';
import ShippingEntry from './components/shippingEntry';
import ViewOrder from './components/viewOrder';
import Confirmation from './components/Confirmation';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import CartOverlay from './components/CartOverlay';

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = sessionStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item, quantity) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((ci) => ci.id === item.id);
      if (existingItem) {
        return prevCart.map((ci) =>
          ci.id === item.id ? { ...ci, qty: ci.qty + quantity } : ci
        );
      }
      return [...prevCart, { ...item, qty: quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((ci) => ci.id !== id));
  };

  const updateCartQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
    } else {
      setCart((prevCart) =>
        prevCart.map((ci) => (ci.id === id ? { ...ci, qty: newQty } : ci))
      );
    }
  };

  const toggleCart = () => {
    setIsCartOpen((open) => !open);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <header className="site-header">
          <div className="site-brand">
            <Link to="/" className="brand-link">
              Stratos Consulting
            </Link>
          </div>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/purchase">Aircraft</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <CartOverlay
            cart={cart}
            isOpen={isCartOpen}
            toggleCart={toggleCart}
            closeCart={closeCart}
            updateCartQuantity={updateCartQuantity}
            removeFromCart={removeFromCart}
          />
        </header>

        <main className="container" onClick={closeCart}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Catalog and purchase flow */}
            <Route path="/purchase" element={<Purchase addToCart={addToCart} />} />

            {/* View cart, then shipping, then payment, then confirmation */}
            <Route
              path="/purchase/viewOrder"
              element={
                <ViewOrder
                  cart={cart}
                  clearCart={clearCart}
                />
              }
            />
            <Route path="/purchase/shippingEntry" element={<ShippingEntry />} />
            <Route path="/purchase/paymentEntry" element={<PaymentEntry />} />
            <Route
              path="/purchase/viewConfirmation"
              element={<Confirmation />}
            />
          </Routes>
        </main>

        <footer className="site-footer">
          <div className="footer-inner">
            <div className="footer-brand">
              <div className="footer-logo">Stratos Consulting</div>
              <p>
                Aircraft acquisition &amp; advisory services for private clients
                and corporate aviation teams.
              </p>
            </div>
            <div className="footer-links">
              <Link to="/about">About</Link>
              <Link to="/purchase">Aircraft</Link>
              <Link to="/contact">Contact</Link>
            </div>
            <div className="footer-socials">
              <a href="#linkedin" className="social-icon" aria-label="LinkedIn">
                in
              </a>
              <a href="#x" className="social-icon" aria-label="X">
                X
              </a>
              <a href="#instagram" className="social-icon" aria-label="Instagram">
                IG
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} Stratos Consulting. All rights reserved.
            </span>
            <span>Private Aviation · Advisory · Acquisition</span>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
