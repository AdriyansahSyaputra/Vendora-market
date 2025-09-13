import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import cartService from "./cartService";

const initialState = {
  items: [],
  selectedItemIds: [],
  appliedVouchers: [],
  selectedPayment: null,
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
    toggleItemSelection: (state, action) => {
      const itemId = action.payload;
      const index = state.selectedItemIds.indexOf(itemId);
      if (index >= 0) {
        state.selectedItemIds.splice(index, 1);
      } else {
        state.selectedItemIds.push(itemId);
      }
    },
    toggleSelectAll: (state, action) => {
      const { allItemIds, isChecked } = action.payload;
      state.selectedItemIds = isChecked ? allItemIds : [];
    },
    clearSelection: (state) => {
      state.selectedItemIds = [];
    },
    applyVouchers: (state, action) => {
      state.appliedVouchers = action.payload;
    },
    setSelectedPayment: (state, action) => {
      state.selectedPayment = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items || [];
        state.selectedItemIds = [];
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items || [];
        const removedItemId = action.meta.arg;
        state.selectedItemIds = state.selectedItemIds.filter(
          (id) => id !== removedItemId
        );
      })
      .addMatcher(
        (action) =>
          ["cart/addItem/fulfilled", "cart/updateQuantity/fulfilled"].includes(
            action.type
          ),
        (state, action) => {
          state.status = "succeeded";
          state.items = action.payload.items || [];
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        }
      );
  },
});

export const {
  toggleItemSelection,
  toggleSelectAll,
  clearSelection,
  applyVouchers,
  setSelectedPayment,
} = cartSlice.actions;

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

export const selectAppliedVouchers = (state) =>
  selectCartState(state).appliedVouchers;

export const selectSelectedPayment = (state) =>
  selectCartState(state).selectedPayment;

export const selectCartTotalQuantity = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartTotalPrice = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0)
);

export const selectCartItemsByStore = createSelector(
  [selectCartItems],
  (items) => {
    if (!Array.isArray(items)) {
      return {};
    }

    return items.reduce((acc, item) => {
      const storeId = item.storeId?._id || "unknown-store";
      const storeName = item.storeId?.name || "Toko Tidak Dikenal";

      if (!acc[storeId]) {
        acc[storeId] = { storeName, items: [] };
      }

      acc[storeId].items.push(item);
      return acc;
    }, {});
  }
);

export const selectSelectedItemIds = (state) => state.cart.selectedItemIds;

export const selectSelectedItems = createSelector(
  [selectCartItems, selectSelectedItemIds],
  (items, selectedIds) => {
    if (!Array.isArray(items)) return [];
    return items.filter((item) => selectedIds.includes(item._id));
  }
);

// Selector BARU: Menghitung subtotal hanya dari item yang dipilih
export const selectSubtotal = createSelector(
  [selectSelectedItems],
  (selectedItems) => {
    return selectedItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
);

export default cartSlice.reducer;
