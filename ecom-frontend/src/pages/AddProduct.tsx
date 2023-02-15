import React from "react";
import AddProductForm from "../components/AddProductForm";
import { useAppDispatch } from "../store/hooks";
import { useAddProductApiMutation } from "../store/slices/apiSlices/productsApiSlice";
import { addProduct } from "../store/slices/productsSlice";
import { IProduct } from "../types/types";

const AddProduct = () => {
  const dispatch = useAppDispatch();
  const [messsage, setMessage] = React.useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);
  const [addProductApi] = useAddProductApiMutation();

  const submitHandler = async (data: IProduct) => {
    addProductApi(data)
      .unwrap()
      .then((res) => {
        console.log(res);
        const updatedData = {
          ...data,
          image: URL.createObjectURL(data.image as File),
        };
        dispatch(addProduct({ data: updatedData, id: res.id }));

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
    <div className="flex flex-col items-center justify-center h-screen-minus-navbar relative">
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
