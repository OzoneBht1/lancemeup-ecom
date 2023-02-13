import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IProduct } from "../../types/types";

interface ProductsState {
  products: IProduct[];
}

const initialState: ProductsState = {
  products: [],
};

export const productsSlice = createSlice({
  name: "productsApi",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IProduct>) => {
      state.products = [action.payload, ...state.products];
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    updateProduct: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
    },
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
  },
});

export default productsSlice.reducer;

export const { addProduct, deleteProduct, updateProduct, setProducts } =
  productsSlice.actions;
