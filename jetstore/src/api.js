import axios from "axios";

const API_BASE = "https://8lljmjq9li.execute-api.us-east-2.amazonaws.com/dev";

export const INVENTORY_API =
  `${API_BASE}/inventoryManagement/items`;

const ORDER_API = `${API_BASE}/orderProcessing`;

export async function placeOrder(cartItems, payment, shipping) {
  const payload = {
    customerName: payment.name || "Anonymous",
    customerEmail: payment.email || "",

    items: cartItems.map(it => ({
      id: it.id,
      name: it.name,
      quantity: it.qty
    })),

    payment: {
      cardNumber: payment.cardNumber,
      cardType: "VISA",                    
      expirationDate: payment.expiry,  
      billingAddress: shipping.addressLine1
    },

    shipping: {
      address: shipping.addressLine1,
      city: shipping.city,
      state: shipping.state,
      zip: shipping.zip,
      country: "United States" 
    }
  };

  const { data } = await axios.post(ORDER_API, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
}
