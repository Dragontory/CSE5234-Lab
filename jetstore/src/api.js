import axios from "axios";

const API_BASE = "https://f6l1maxljc.execute-api.us-east-2.amazonaws.com/dev";

export const INVENTORY_API =
  "https://5tp6adhbsj.execute-api.us-east-2.amazonaws.com/dev/inventoryManagement";

const ORDER_API = `${API_BASE}/order-processing/order`;

export async function placeOrder(cartItems, payment, shipping) {
  const payload = {
    items: cartItems.map(it => ({ id: it.id, qty: it.qty })),
    payment: { cardNumber: payment.cardNumber },
    shipping: { addressLine1: shipping.addressLine1 },
  };

  const { data } = await axios.post(ORDER_API, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
}
