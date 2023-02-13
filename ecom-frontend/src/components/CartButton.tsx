import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { createAction } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleCartVisibility } from "../store/slices/cartSlice";

let itemsCount = 0;
const CartButton = () => {
  const [showCart, setShowCart] = useLocalStorage<boolean>("showCart", false);
  const cartItems = useAppSelector((state) => state.cart.cart);
  itemsCount = cartItems.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  useEffect(() => {
    itemsCount = cartItems.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
  }, [itemsCount]);

  const dispatch = useAppDispatch();

  const toggleCart = () => {
    dispatch(toggleCartVisibility(true));
  };

  return (
    <div
      onClick={toggleCart}
      className="flex items-center hover:cursor-pointer  py-3 px-6 rounded m-3 text-center  bg-gray-500 w-40 h-12 justify-center gap-1"
    >
      <ShoppingCartIcon className="h-4 w-4 hover:cursor-pointer  text-white" />
      <label className="text-white hover:cursor-pointer  text-lg">Cart</label>
      <label className="text-white hover:cursor-pointer  text-lg px-4 py-0 rounded-full bg-purple-500 ">
        {itemsCount}
      </label>
    </div>
  );
};

export default CartButton;
