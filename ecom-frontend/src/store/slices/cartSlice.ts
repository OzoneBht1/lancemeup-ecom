import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICart, IProduct } from "../../types/types";

interface CartState {
  showCart: boolean;
  cart: ICart[];
}

const initialState: CartState = {
  showCart: false,
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCartVisibility: (state, action: PayloadAction<boolean>) => {
      state.showCart = action.payload;
    },
    addToCart: (
      state,
      action: PayloadAction<{ item: IProduct; quantity: number }>
    ) => {
      const { id } = action.payload.item;
      const { quantity } = action.payload;
      console.log("id", id);
      console.log("quantity", quantity);
      const alreadyInCart = state.cart.find((item) => item.id === id);
      console.log(alreadyInCart);
      if (alreadyInCart) {
        state.cart = state.cart.map((item) =>
          item.id === id
            ? { ...alreadyInCart, quantity: item.quantity + quantity }
            : item
        );
      } else {
        state.cart = [...state.cart, { ...action.payload.item, quantity }];
      }
      console.log("state.cart", state.cart);
    },
    setCart: (state, action: PayloadAction<ICart[]>) => {
      state.cart = action.payload;
    },
  },
});

export const { toggleCartVisibility, addToCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
