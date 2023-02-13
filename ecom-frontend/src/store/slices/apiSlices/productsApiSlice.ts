import { IProduct } from "../../../types/types";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    addProduct: build.mutation<IProduct, IProduct>({
      query: (product) => ({
        url: "products/",
        method: "POST",
        body: JSON.stringify(product),
      }),
    }),
    getProducts: build.query<IProduct[], null>({
      query: () => ({
        url: "products?limit=10",
        method: "GET",
      }),
    }),
    updateProduct: build.mutation<IProduct, number>({
      query: (id) => ({
        url: `products/${id}`,
        method: "GET",
      }),
    }),
    deleteProduct: build.mutation<IProduct, number>({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
    }),
    getCategories: build.query<string[], null>({
      query: () => ({
        url: "products/categories",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCategoriesQuery,
} = productsApiSlice;
