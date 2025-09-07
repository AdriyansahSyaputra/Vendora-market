import React, { createContext, useReducer, useContext, useMemo } from "react";

// --- Mock Data ---
const initialCartData = {
  "seller-01": {
    sellerName: "AudioPhile Store",
    isVerified: true,
    items: [
      {
        id: "p001",
        name: "Pro Wireless Headphones",
        price: 2499000,
        image: "https://placehold.co/150x150/E2E8F0/475569",
        variation: "Midnight Black",
        quantity: 1,
        stock: 10,
      },
    ],
  },
  "seller-02": {
    sellerName: "GamerZone ID",
    isVerified: false,
    items: [
      {
        id: "p003",
        name: "Mechanical RGB Keyboard",
        price: 1250000,
        image: "https://placehold.co/150x150/94A3B8/FFFFFF",
        variation: "Gunmetal, RGB",
        quantity: 1,
        stock: 20,
      },
      {
        id: "p004",
        name: "Gaming Mouse Pro",
        price: 750000,
        image: "https://placehold.co/150x150/64748B/FFFFFF",
        variation: "Black",
        quantity: 2,
        stock: 15,
      },
    ],
  },
};

// Helper untuk mendapatkan semua item sebagai array of objects
const getAllItems = (cartData) =>
  Object.values(cartData).flatMap((s) => s.items);

const initialState = {
  cartItems: initialCartData,
  selectedItems: getAllItems(initialCartData),
  appliedVouchers: [],
  selectedPayment: null,
};

const CheckoutContext = createContext();

// --- Reducer (Logika yang Sudah Diperbaiki) ---
function checkoutReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_ITEM_SELECTION": {
      const { itemId, isSelected } = action.payload;
      const allItems = Object.values(state.cartItems).flatMap((s) => s.items);
      const itemToToggle = allItems.find((i) => i.id === itemId);
      if (!itemToToggle) return state;

      const newSelectedItems = isSelected
        ? [...state.selectedItems, itemToToggle]
        : state.selectedItems.filter((item) => item.id !== itemId);
      return { ...state, selectedItems: newSelectedItems };
    }
    case "TOGGLE_ALL_ITEMS": {
      const isSelected = action.payload;
      if (!isSelected) return { ...state, selectedItems: [] };
      const allItems = Object.values(state.cartItems).flatMap((s) => s.items);
      return { ...state, selectedItems: allItems };
    }
    case "UPDATE_QUANTITY": {
      const { itemId, quantity } = action.payload;
      const newCartItems = JSON.parse(JSON.stringify(state.cartItems));
      let itemStock = Infinity;
      for (const sellerId in newCartItems) {
        const item = newCartItems[sellerId].items.find((i) => i.id === itemId);
        if (item) {
          itemStock = item.stock;
          if (quantity > 0 && quantity <= item.stock) {
            item.quantity = quantity;
          }
          break;
        }
      }
      const newSelectedItems = state.selectedItems.map((item) => {
        if (item.id === itemId) {
          if (quantity > 0 && quantity <= itemStock) {
            return { ...item, quantity: quantity };
          }
        }
        return item;
      });
      return {
        ...state,
        cartItems: newCartItems,
        selectedItems: newSelectedItems,
      };
    }
    case "REMOVE_ITEM": {
      const itemIdToRemove = action.payload;
      const newCartItems = JSON.parse(JSON.stringify(state.cartItems));
      for (const sellerId in newCartItems) {
        newCartItems[sellerId].items = newCartItems[sellerId].items.filter(
          (i) => i.id !== itemIdToRemove
        );
        if (newCartItems[sellerId].items.length === 0) {
          delete newCartItems[sellerId];
        }
      }
      const newSelectedItems = state.selectedItems.filter(
        (item) => item.id !== itemIdToRemove
      );
      return {
        ...state,
        cartItems: newCartItems,
        selectedItems: newSelectedItems,
      };
    }
    case "APPLY_VOUCHERS":
      return { ...state, appliedVouchers: action.payload };
    case "SELECT_PAYMENT":
      return { ...state, selectedPayment: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// --- Provider Component ---
export function CheckoutProvider({ children }) {
  const [state, dispatch] = useReducer(checkoutReducer, initialState);
  const value = useMemo(() => [state, dispatch], [state]);
  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
}

// --- Custom Hook ---
export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
}
