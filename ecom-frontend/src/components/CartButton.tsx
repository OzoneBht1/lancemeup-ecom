import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleCartVisibility } from "../store/slices/cartSlice";

let itemsCount = 0;
const CartButton = () => {
  const [showCart, setShowCart] = useLocalStorage<boolean>("showCart", false);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState<boolean>(false);
  const cartItems = useAppSelector((state) => state.cart.cart);
  const divClass =
    "flex items-center gap-2 text-white bg-purple-md font-bold py-3 px-6 rounded m-2 hover:scale-105 focus:scale-105";
  const scaleClass = divClass + " animate-pulse";
  itemsCount = cartItems.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  useEffect(() => {
    setBtnIsHighlighted(true);
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);
  }, [itemsCount]);

  useEffect(() => {}, [cartItems]);

  const dispatch = useAppDispatch();

  const toggleCart = () => {
    dispatch(toggleCartVisibility(true));
  };

  return (
    <div
      onClick={toggleCart}
      className={btnIsHighlighted ? scaleClass : divClass}
    >
      <ShoppingCartIcon className="h-4 w-4 hover:cursor-pointer text-white" />
      <label className="text-white hover:cursor-pointer  text-lg">Cart</label>
      <label className="text-white hover:cursor-pointer  text-lg px-4 py-0 rounded-full bg-purple-500 ">
        {itemsCount}
      </label>
    </div>
  );
};

export default CartButton;
