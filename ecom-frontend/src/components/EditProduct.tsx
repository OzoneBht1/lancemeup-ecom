import React from "react";
import EditProductForm from "./EditProductForm";
import Modal from "./Modal";
import { useUpdateProductApiMutation } from "../store/slices/apiSlices/productsApiSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateProduct } from "../store/slices/productsSlice";
import { IProduct } from "../types/types";

const EditProduct = () => {
  const { id } = useAppSelector((state) => state.products.editVisible);
  const dispatch = useAppDispatch();
  const [updateProductApi] = useUpdateProductApiMutation();
  const editHandler = (data: IProduct) => {
    const updatedData = {
      id,
      ...data,
      image: URL.createObjectURL(data.image as File),
    };
    dispatch(updateProduct(updatedData));
  };
  return (
    <Modal>
      <div className=" flex flex-col items-center justify-center">
        <EditProductForm id={id} onEditProduct={editHandler} />
      </div>
    </Modal>
  );
};

export default EditProduct;
