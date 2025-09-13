import { useEffect, useMemo, useReducer } from "react";
import { selectCartItemsByStore } from "@/features/cart/cartSlice";
import { checkoutReducer, CheckoutContext } from "./checkoutContext.js";
import { useSelector } from "react-redux";

const initialState = {
  cartByStore: {},
  selectedItems: [],
  appliedVouchers: [],
  selectedPayment: null,
};

export function CheckoutProvider({ children }) {
  const cartByStoreFromRedux = useSelector(selectCartItemsByStore);

  const [state, dispatch] = useReducer(checkoutReducer, initialState);

  useEffect(() => {
    dispatch({ type: "INITIALIZE_CART", payload: cartByStoreFromRedux || {} });
  }, [cartByStoreFromRedux]);

  const value = useMemo(() => [state, dispatch], [state]);
  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
}
