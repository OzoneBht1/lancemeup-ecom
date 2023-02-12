import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://fakestoreapi.com/",
});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  reducerPath: "products",
  endpoints: () => ({}),
});
