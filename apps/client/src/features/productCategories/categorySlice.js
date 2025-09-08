import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import categoryService from "./categoryService";

// State awal untuk slice ini
const initialState = {
  items: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// --- Async Thunk ---
// Thunk untuk mengambil data kategori dari server
export const fetchCategoriesAsync = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const categories = await categoryService.getCategories();
      return categories;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Gagal mengambil data kategori.";
      return rejectWithValue(message);
    }
  }
);

// --- Slice ---
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {}, // Tidak ada reducer sinkron untuk saat ini
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Simpan data kategori yang berhasil diambil
      })
      .addCase(fetchCategoriesAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Simpan pesan error
      });
  },
});

// --- Selectors ---
// Fungsi untuk mengambil data dari state dengan cara yang efisien
const selectCategoriesState = (state) => state.categories;

export const selectAllCategories = createSelector(
  [selectCategoriesState],
  (categoriesState) => categoriesState.items
);

export const selectCategoriesStatus = createSelector(
  [selectCategoriesState],
  (categoriesState) => categoriesState.status
);

export const selectCategoriesError = createSelector(
  [selectCategoriesState],
  (categoriesState) => categoriesState.error
);

export default categorySlice.reducer;
