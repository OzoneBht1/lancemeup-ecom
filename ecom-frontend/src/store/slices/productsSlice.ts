import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IProduct } from "../../types/types";

interface ProductsState {
  products: IProduct[];
  editVisible: { id: number; visibile: boolean };
}

const initialState: ProductsState = {
  products: [],
  editVisible: { id: 0, visibile: false },
};

export const productsSlice = createSlice({
  name: "productsApi",
  initialState,
  reducers: {
    addProduct: (
      state,
      action: PayloadAction<{ data: IProduct; id: number }>
    ) => {
      const id = action.payload.id;

      state.products = [...state.products, { ...action.payload.data, id: id }];
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
    setEditModalVisibility: (
      state,
      action: PayloadAction<{ id: number; visibile: boolean }>
    ) => {
      state.editVisible = action.payload;
    },
  },
});

export default productsSlice.reducer;

export const {
  addProduct,
  deleteProduct,
  updateProduct,
  setProducts,
  setEditModalVisibility,
} = productsSlice.actions;
