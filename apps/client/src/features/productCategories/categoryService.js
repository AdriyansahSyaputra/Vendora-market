import axios from "axios";

const API_URL = "/api/client/categories";

/**
 * Mengambil daftar kategori produk dari server.
 * @returns {Promise<Array>} Promise yang akan resolve dengan array kategori.
 */
const getCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.categories || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

const categoryService = {
  getCategories,
};

export default categoryService;
