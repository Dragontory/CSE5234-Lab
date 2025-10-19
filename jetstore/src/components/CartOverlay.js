import React, { useEffect, useState } from 'react';

export default function CartOverlay() {
  const [cart, setCart] = useState(() => JSON.parse(sessionStorage.getItem('cart') || '[]'));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onStorage() {
      setCart(JSON.parse(sessionStorage.getItem('cart') || '[]'));
    }
    window.addEventListener('storage', onStorage);
    const interval = setInterval(onStorage, 500);
    return () => { window.removeEventListener('storage', onStorage); clearInterval(interval); };
  }, []);

  const itemCount = cart.reduce((s, it) => s + it.qty, 0);
  const total = cart.reduce((s, it) => s + it.qty * it.price, 0).toFixed(2);

  return (
    <div className={`cart-overlay ${open ? 'open' : ''}`}>
      <button className="cart-button" onClick={() => setOpen(!open)}>
        Cart ({itemCount})
      </button>
      <div className="cart-panel">
        <h4>Your Cart</h4>
        {cart.length === 0 ? <p>Cart is empty</p> : (
          <ul>
            {cart.map(it => <li key={it.id}>{it.name} x {it.qty} — ${ (it.price * it.qty).toLocaleString() }</li>)}
          </ul>
        )}
        <div className="cart-foot">
          <div>Total: ${Number(total).toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}
