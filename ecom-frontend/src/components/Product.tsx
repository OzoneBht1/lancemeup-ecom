import {
  PencilSquareIcon,
  ShoppingCartIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { IProduct } from "../types/types";

interface ProductProps {
  product: IProduct;
  onAddToCart: (id: number, quantity: number) => void;
  onDeleteProduct: (id: number) => void;
  onEditProduct: (id: number) => void;
}

const Product = ({
  product,
  onAddToCart,
  onDeleteProduct,
  onEditProduct,
}: ProductProps) => {
  const user = useAppSelector((state) => state.user.user);
  const quantityRef = useRef<HTMLInputElement>(null);
  const nav = useNavigate();

  const addCartClickHandler = () => {
    const id = product.id;
    const quantity = quantityRef.current?.value;
    onAddToCart(id!, +quantity!);
  };

  const onClickDelete = () => {
    const id = product.id;
    onDeleteProduct(id!);
  };
  const onClickEdit = () => {
    const id = product.id;
    onEditProduct(id!);
  };

  return (
    <tr key={product.id}>
      <td className="border px-4 py-2">{product.id}</td>
      <td className="border px-4 py-2">
        <img
          src={
            typeof product.image === "string"
              ? product.image
              : URL.createObjectURL(product.image)
          }
          className="w-14"
          alt=""
        />
      </td>
      <td className="border px-4 py-2">{product.title}</td>
      <td className="border px-4 py-2">{product.description}</td>
      <td className="border px-4 py-2">${product.price}</td>
      <td className="border px-4 py-2">
        {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
      </td>

      <td className="border px-4 py-2">
        {!user && (
          <button
            onClick={() => nav("/login")}
            className=" text-white font-bold py-2 px-4 text-sm rounded"
          >
            <ShoppingCartIcon className="h-8 w-8 text-purple-light" />
          </button>
        )}

        {user && user.user_type === "admin" && (
          <div className="flex items-center px-5 gap-2">
            <button onClick={onClickEdit} className="font-bold py-2 rounded">
              <PencilSquareIcon className="h-8 w-8 text-purple-md" />
            </button>
            <button onClick={onClickDelete} className=" font-bold py-2 rounded">
              <TrashIcon className="h-8 w-8 text-red-400" />
            </button>
          </div>
        )}
        {user && user.user_type === "user" && (
          <div className="flex flex-col gap-2 items-center">
            <div className="flex gap-2 items-center">
              <label className="font-bold" htmlFor="quantity">
                Amount{" "}
              </label>
              <input
                defaultValue={1}
                ref={quantityRef}
                type="number"
                className="w-20 h-8 border-2 border-black text-center"
              />
            </div>
            <button
              onClick={addCartClickHandler}
              className="font-bold py-2 rounded-full bg-purple-md w-36 h-10 text-white"
            >
              +Add to cart
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default Product;
