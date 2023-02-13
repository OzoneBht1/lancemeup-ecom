import React from "react";
import AddProductForm from "../components/AddProductForm";
import { useAddProductMutation } from "../store/slices/apiSlices/productsApiSlice";
import { IProduct } from "../types/types";

const AddProduct = () => {
  const [messsage, setMessage] = React.useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);
  const [addProduct] = useAddProductMutation();

  const submitHandler = async (data: IProduct) => {
    addProduct(data)
      .unwrap()
      .then((res) => {
        console.log(res);
        setMessage({
          type: "success",
          message: "Product added successfully",
        });
      })
      .catch((err) => {
        setMessage({
          type: "error",
          message: "Something went wrong",
        });
      });
  };

  return (
    <div className="flex items-center justify-center h-screen-minus-navbar bg-gray-200 relative">
      <AddProductForm onSubmitForm={submitHandler} />
      {!!messsage && (
        <div
          className={`${
            messsage.type === "error"
              ? "bg-red-100 border-red-400 text-red-700 "
              : "bg-green-100 border-green-400 text-green-700"
          } border-l-4 p-4 mb-4  absolute left-10 bottom-10 block`}
          role="alert"
        >
          <p className="font-bold">{messsage.message}</p>
        </div>
      )}
    </div>
  );
};

export default AddProduct;