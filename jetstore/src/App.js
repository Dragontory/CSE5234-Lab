import React from 'react';
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
  return (
    <BrowserRouter>
      <div className="App">
        <header className="site-header">
          <div className="site-brand">
            <Link to="/" className="brand-link">Jetstore</Link>
          </div>
          <nav className="nav-links">
            <Link to="/purchase">Purchase</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/purchase/viewOrder">View Order</Link>
          </nav>
          <CartOverlay />
        </header>
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/purchase/paymentEntry" element={<PaymentEntry />} />
            <Route path="/purchase/shippingEntry" element={<ShippingEntry />} />
            <Route path="/purchase/viewOrder" element={<ViewOrder />} />
            <Route path="/purchase/viewConfirmation" element={<Confirmation />} />
          </Routes>
        </main>
        <footer className="site-footer">© Jetstore</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
