import React from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useGetProductsQuery } from "../store/slices/apiSlices/productsApiSlice";
import {
  ShoppingCartIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import Product from "../components/Product";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { ICart } from "../types/types";
import { addToCart } from "../store/slices/cartSlice";

const Products = () => {
  const { data: products, isLoading: productsIsLoading } =
    useGetProductsQuery(null);

  const username = useAppSelector((state) => state.user.user?.username);
  const dispatch = useAppDispatch();

  const [cartItems, setCartItems] = useLocalStorage(
    `cartItems-${username}`,
    [] as ICart[]
  );

  const addToCartHandler = (id: number, quantity: number) => {
    const item = products?.find((product) => product.id === id);
    if (item) {
      const alreadyInCart = cartItems!.find((item) => item.id === id);
      if (alreadyInCart) {
        setCartItems(
          cartItems!.map((item) =>
            item.id === id
              ? { ...alreadyInCart, quantity: item.quantity + quantity }
              : item
          )
        );
        dispatch(addToCart({ item, quantity }));
      } else {
        setCartItems([...cartItems!, { ...item, quantity }]);
      }
    }
  };

  return (
    <div className="flex  justify-center">
      {productsIsLoading ? (
        <LoadingSpinner />
      ) : (
        <table className="table w-4/5 m-5 justify-center border-x-2 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => {
              return (
                <Product
                  product={product}
                  key={product.id}
                  onAddToCart={addToCartHandler}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Products;
