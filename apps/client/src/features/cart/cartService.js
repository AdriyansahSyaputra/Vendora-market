import axios from "axios";

const API_URL = "/api/client/cart/";

// Add item to cart
const addItem = (itemData) => {
  return axios.post(`${API_URL}/items`, itemData);
};

export default {
  addItem,
};
