import React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAppSelector } from "../store/hooks";

const Orders = () => {
  const orders = useAppSelector((state) => state.cart.cart);
  const items = { ...localStorage };
  const users: string[] = [];
  const products: any[] = [];
  for (const key in items) {
    if (key.startsWith("cartItems") && key.split("-")[1].startsWith("user")) {
      users.push(key.split("-")[1]);
      const cartItems = JSON.parse(items[key]);
      products.push(cartItems);
    }
  }

  return (
    <table className="table w-4/5 m-5 justify-center items-center text-left border-x-2 ">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Order Total</th>
          <th>Products</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => {
          const userProducts = products[index];
          const orderTotal = userProducts.reduce(
            (total: number, product: any) => {
              return total + product.price * product.quantity;
            },
            0
          );

          return (
            <tr key={user}>
              <td>{index + 1}</td>
              <td>{user}</td>
              <td>{orderTotal}</td>
              <td>
                <ul>
                  {userProducts.map((product: any) => {
                    return (
                      <li key={product.id}>
                        {product.title} ({product.quantity} x ${product.price})
                      </li>
                    );
                  })}
                </ul>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Orders;
