import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import cartService from "./cartService";

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

/**
 * Mengambil seluruh item keranjang pengguna dari server.
 * Dipanggil saat aplikasi pertama kali dimuat setelah user login.
 */
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartService.getCart();
      return response.data || [];
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/**
 * Menambahkan sebuah item ke keranjang.
 * @param {object} itemData - Data produk yang akan ditambahkan.
 */
export const addToCartAsync = createAsyncThunk(
  "cart/addItem",
  async (itemData, { rejectWithValue }) => {
    try {
      const response = await cartService.addItem(itemData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/**
 * Memperbarui kuantitas item di keranjang.
 * @param {object} updateData - Berisi { cartItemId, quantity }.
 */
export const updateQuantityAsync = createAsyncThunk(
  "cart/updateQuantity",
  async (updateData, { rejectWithValue }) => {
    try {
      const { cartItemId, quantity } = updateData;

      const response = await cartService.updateCartItemQuantity(
        cartItemId,
        quantity
      );

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Gagal mengubah kuantitas.";
      return rejectWithValue({ message });
    }
  }
);

/**
 * Menghapus sebuah item dari keranjang.
 * @param {string} cartItemId - ID unik dari item yang akan dihapus.
 */
export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCart",
  async (cartItemId, { rejectWithValue }) => {
    try {
      const response = await cartService.removeCartItem(cartItemId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartLocally: (state) => {
      state.items = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Kasus untuk fetchCart ---
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // --- Kasus untuk addToCartAsync ---
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // --- Kasus untuk updateQuantityAsync ---
      .addCase(updateQuantityAsync.pending, (state) => {
        // Kita bisa set status 'loading' per item jika UI-nya kompleks,
        // tapi untuk sekarang kita set status global saja.
        state.status = "loading";
      })
      .addCase(updateQuantityAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
      })
      .addCase(updateQuantityAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // --- Kasus untuk removeFromCartAsync ---
      .addCase(removeFromCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
      })
      .addCase(removeFromCartAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearCartLocally } = cartSlice.actions;

// Selectors
const selectCartState = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartState],
  (cart) => cart.items
);
export const selectCartStatus = createSelector(
  [selectCartState],
  (cart) => cart.status
);
export const selectCartError = createSelector(
  [selectCartState],
  (cart) => cart.error
);

export const selectCartTotalQuantity = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartTotalPrice = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0)
);

export const selectCartItemsBySeller = createSelector(
  [selectCartItems],
  (items) => {
    return items.reduce((acc, item) => {
      // Pastikan item.seller ada sebelum mengakses id
      const sellerId = item.seller ? item.seller.id : "unknown-seller";
      const sellerName = item.seller ? item.seller.name : "Toko Tidak Dikenal";

      if (!acc[sellerId]) {
        acc[sellerId] = { sellerName, items: [] };
      }
      acc[sellerId].items.push(item);
      return acc;
    }, {});
  }
);

export default cartSlice.reducer;
