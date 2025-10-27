import React from 'react';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../api';

export default function ViewOrder({ cart, clearCart }) {
	const navigate = useNavigate();
	const payment = JSON.parse(sessionStorage.getItem('payment') || '{}');
	const shipping = JSON.parse(sessionStorage.getItem('shipping') || '{}');

	const total = cart.reduce((s, it) => s + it.price * it.qty, 0).toFixed(2);

	async function confirm() {
  try {
    const orderResult = await placeOrder(cart, payment, shipping);

    sessionStorage.setItem('orderResult', JSON.stringify(orderResult));
	sessionStorage.setItem('cartSnapshot', JSON.stringify(cart));

  clearCart();
      navigate('/purchase/viewConfirmation');
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'unknown error';
      alert(`Order failed: ${msg}`);
    }
  }

	return (
		<div className="container">
			<h2 className="page-title">Review Your Order</h2>

			<div className="form-box">
				<section className="order-section">
					<h3 className="section-title">Items</h3>
					{cart.length === 0 ? (
						<p>No items in your cart.</p>
					) : (
						<ul className="order-list">
							{cart.map((it) => (
								<li key={it.id}>
									{it.name} × {it.qty} = ${(it.price * it.qty).toFixed(2)}
								</li>
							))}
						</ul>
					)}
					<p className="order-total">Total: ${total}</p>
				</section>

				<section className="order-section">
					<h3 className="section-title">Payment</h3>
					<p>{payment.name || 'Not provided'}</p>
				</section>

				<section className="order-section">
					<h3 className="section-title">Shipping</h3>
					<p>
						{shipping && shipping.name && shipping.addressLine1 && shipping.city && shipping.state && shipping.zip
							? `${shipping.name}, ${shipping.addressLine1}${shipping.addressLine2 ? ', ' + shipping.addressLine2 : ''
							}, ${shipping.city}, ${shipping.state} ${shipping.zip}`
							: 'Not provided'}
					</p>
				</section>

				<div className="actions">
					<button className="primary-action" onClick={confirm}>
						Confirm Order
					</button>
				</div>
			</div>
		</div>
	);
}
