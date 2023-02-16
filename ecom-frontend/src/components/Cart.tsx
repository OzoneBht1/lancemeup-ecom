import React from "react";
import Modal from "./Modal";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleCartVisibility } from "../store/slices/cartSlice";

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cart);

  const toggleCart = () => {
    dispatch(toggleCartVisibility(false));
  };

  return (
    <Modal>
      {cartItems.length === 0 ? (
        <p className="w-1/5 m-auto">There's nothing to show</p>
      ) : (
        <div className="mx-8 flex flex-col  items-right">
          <table className=" table w-full my-5 ">
            <thead className="">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="text-left">{item.title}</td>
                  <td className="text-right">${item.price.toFixed(2)}</td>
                  <td className="text-right">{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mb-2">
            <div className="flex flex-col">
              <span className="text-xl font-bold">
                Total: $
                {cartItems
                  .reduce((acc, item) => {
                    return acc + item.price * item.quantity;
                  }, 0)
                  .toFixed(2)}
              </span>
              <button
                className="bg-purple-md text-white px-4 py-2 rounded mt-2"
                onClick={toggleCart}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default Cart;
