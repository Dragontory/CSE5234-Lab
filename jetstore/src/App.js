// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Purchase from './components/purchase';
import ViewOrder from './components/viewOrder';
import PaymentEntry from './components/paymentEntry';
import ShippingEntry from './components/shippingEntry';
import Confirmation from './components/Confirmation';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import CartOverlay from './components/CartOverlay';
import ProductDetail from './components/ProductDetail';

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = sessionStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item, quantity = 1) => {
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
    setIsCartOpen((prev) => !prev);
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
            <Link to="/" className="brand-link">Stratos Consulting</Link>
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
            <Route path="/purchase" element={<Purchase addToCart={addToCart} />} />
            <Route path="/purchase/:id" element={<ProductDetail addToCart={addToCart} />} />
            {/* Step 1: view cart */}
            <Route
              path="/purchase/viewOrder"
              element={<ViewOrder cart={cart} />}
            />
            {/* Step 2: shipping */}
            <Route
              path="/purchase/shippingEntry"
              element={<ShippingEntry />}
            />
            {/* Step 3: payment + submit order */}
            <Route
              path="/purchase/paymentEntry"
              element={<PaymentEntry clearCart={clearCart} />}
            />
            <Route path="/purchase/viewConfirmation" element={<Confirmation />} />
          </Routes>
        </main>
        <footer className="site-footer">
          <div className="footer-inner">
            <div className="footer-brand">
              <div className="footer-logo">Stratos Consulting</div>
              <p>Your private jet acquisition concierge.</p>
            </div>

            <div className="footer-links">
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
              <a href="/purchase">Browse Jets</a>
            </div>

            <div className="footer-socials">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <span className="social-icon">in</span>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X / Twitter"
              >
                <span className="social-icon">X</span>
              </a>
              <a
                href="mailto:sales@stratosconsulting.example"
                aria-label="Email"
              >
                <span className="social-icon">@</span>
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Stratos Consulting — Aircraft Acquisition & Advisory. All rights reserved.</span>
            <span>Terms · Privacy</span>
          </div>
        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;

