import { createContext, useContext } from "react";

export const CheckoutContext = createContext();

export const checkoutReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE_CART": {
      return {
        ...state,
        cartByStore: action.payload,
        selectedItems: [],
      };
    }

    case "TOGGLE_ITEM_SELECTION": {
      const { item, isSelected } = action.payload;

      if (isSelected) {
        const isAlreadySelected = state.selectedItems.some(
          (selectedItem) => selectedItem._id === item._id
        );

        if (!isAlreadySelected) {
          return {
            ...state,
            selectedItems: [...state.selectedItems, item],
          };
        }
      } else {
        return {
          ...state,
          selectedItems: state.selectedItems.filter(
            (selectedItem) => selectedItem._id !== item._id
          ),
        };
      }

      return state;
    }

    case "TOGGLE_ALL_ITEMS": {
      const { allItems, isSelected } = action.payload;
      return {
        ...state,
        selectedItems: isSelected ? [...allItems] : [],
      };
    }

    case "REMOVE_FROM_SELECTION": {
      const cartItemId = action.payload;
      return {
        ...state,
        selectedItems: state.selectedItems.filter(
          (item) => item._id !== cartItemId
        ),
      };
    }

    case "APPLY_VOUCHERS": {
      return {
        ...state,
        appliedVouchers: action.payload,
      };
    }

    case "SELECT_PAYMENT": {
      return {
        ...state,
        selectedPayment: action.payload,
      };
    }

    case "CLEAR_SELECTIONS": {
      return {
        ...state,
        selectedItems: [],
        appliedVouchers: [],
        selectedPayment: null,
      };
    }

    default:
      return state;
  }
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
};
