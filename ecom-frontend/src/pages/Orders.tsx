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
    <div className="flex items-center justify-center">
      <table className="table-auto w-4/5 my-5 justify-center items-center text-left border-x-2 border-b-2 ">
        <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Products</th>
            <th>Order Total</th>
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
                <td>
                  <ul>
                    {userProducts.map((product: any) => {
                      return (
                        <li key={product.id}>
                          {product.title} ({product.quantity} x ${product.price}
                          )
                        </li>
                      );
                    })}
                  </ul>
                </td>
                <td>{orderTotal}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
