import axios from "axios";

const API_URL = "/api/client/cart/";

// Add item to cart
const addItem = (itemData) => {
  return axios.post(`${API_URL}`, itemData);
};

// Get cart
const getCart = () => {
  return axios.get(`${API_URL}`);
};

const updateCartItemQuantity = (cartItemId, quantity) => {
  return axios.put(
    `${API_URL}${cartItemId}`,
    { quantity },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const removeCartItem = (cartItemId) => {
  return axios.delete(`${API_URL}${cartItemId}`);
};

export default {
  addItem,
  getCart,
  updateCartItemQuantity,
  removeCartItem,
};
