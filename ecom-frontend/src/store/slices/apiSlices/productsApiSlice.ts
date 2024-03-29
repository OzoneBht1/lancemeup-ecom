import { IProduct } from "../../../types/types";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    addProductApi: build.mutation<{ id: number }, IProduct>({
      query: (product) => ({
        url: "products/",
        method: "POST",
        body: JSON.stringify(product),
      }),
    }),
    getProductsApi: build.query<IProduct[], null>({
      query: () => ({
        url: "products",
        method: "GET",
      }),
    }),
    updateProductApi: build.mutation<IProduct, IProduct>({
      query: (data) => ({
        url: `products/${data.id}`,
        method: "POST",
      }),
    }),
    deleteProductApi: build.mutation<IProduct, number>({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
    }),
    getCategoriesApi: build.query<string[], null>({
      query: () => ({
        url: "products/categories",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddProductApiMutation,
  useGetProductsApiQuery,
  useUpdateProductApiMutation,
  useDeleteProductApiMutation,
  useGetCategoriesApiQuery,
} = productsApiSlice;
