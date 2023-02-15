import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleCartVisibility } from "../store/slices/cartSlice";
import Modal from "./Modal";

const Cart = () => {
  console.log("AA");
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cart);

  const toggleCart = () => {
    dispatch(toggleCartVisibility(false));
  };

  return (
    <Modal>
      <table className="table-auto w-full mx-3 my-5">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end m-2">
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
            className="bg-purple-500 text-white px-4 py-2 rounded mt-2"
            onClick={toggleCart}
          >
            Checkout
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Cart;
