import axios from "axios";

const API_BASE = "https://5tp6adhbsj.execute-api.us-east-2.amazonaws.com/dev";

export const INVENTORY_API =
  "https://5tp6adhbsj.execute-api.us-east-2.amazonaws.com/dev/inventoryManagement";

const ORDER_API = `${API_BASE}/orderProcessing`;

export async function placeOrder(cartItems, payment, shipping) {
  const payload = {
    // optional: pull customer info from storage or form
    customerName: payment.name || "Anonymous",
    customerEmail: payment.email || "",

    // match Lambda expectation
    items: cartItems.map(it => ({
      id: it.id,
      name: it.name,
      quantity: it.qty
    })),

    // payment fields your Lambda expects
    payment: {
      cardNumber: payment.cardNumber,
      cardType: payment.cardType,
      expirationDate: payment.expirationDate,
      billingAddress: payment.billingAddress
    },

    // shipping fields your Lambda expects
    shipping: {
      address: shipping.addressLine1,
      city: shipping.city,
      state: shipping.state,
      zip: shipping.zip,
      country: shipping.country
    }
  };

  const { data } = await axios.post(ORDER_API, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
}
