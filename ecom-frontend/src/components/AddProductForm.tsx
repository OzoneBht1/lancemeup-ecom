import React from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import UploadImage from "./UploadImage";
import { addProduct } from "../store/slices/productsSlice";
import { IProduct } from "../types/types";
import {
  useAddProductMutation,
  useGetCategoriesQuery,
} from "../store/slices/apiSlices/productsApiSlice";

interface IAddProductForm {
  onSubmitForm: (data: IProduct) => void;
}

const AddProductForm = ({ onSubmitForm }: IAddProductForm) => {
  const titleRef = React.useRef<HTMLInputElement>(null);
  const descriptionRef = React.useRef<HTMLTextAreaElement>(null);
  const priceRef = React.useRef<HTMLInputElement>(null);
  const [image, setImage] = React.useState<File | null>(null);
  const categoryRef = React.useRef<HTMLSelectElement>(null);

  const [formValidity, setFormValidity] = React.useState({
    title: false,
    description: false,
    price: false,
    image: false,
  });
  const { data: categoies, isLoading } = useGetCategoriesQuery(null);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const titleIsValid = !!titleRef.current!.value;
    const descriptionIsValid = !!descriptionRef.current!.value;
    const priceIsValid = !!priceRef.current!.value;
    const imageIsValid = !!image;
    if (
      !titleIsValid ||
      !descriptionIsValid ||
      !priceIsValid ||
      !imageIsValid
    ) {
      setFormValidity({
        title: titleIsValid,
        description: descriptionIsValid,
        price: priceIsValid,
        image: imageIsValid,
      });
      return;
    }

    const data = {
      title: titleRef.current!.value,
      description: descriptionRef.current!.value,
      price: +priceRef.current!.value,
      image: image,
      category: categoryRef.current!.value,
    };
    onSubmitForm(data);
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="bg-white w-96 p-6 shadow-md ">
        <div className="mb-4">
          <label htmlFor="Title" className="text-gray-700">
            Title
          </label>
          <input
            id="Title"
            type="text"
            ref={titleRef}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Description" className="text-gray-700">
            Description
          </label>
          <textarea
            id="Description"
            ref={descriptionRef}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="Price" className="text-gray-700">
            Price
          </label>
          <input
            id="Price"
            type="number"
            ref={priceRef}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Image" className="text-gray-700">
            Image
          </label>
          <UploadImage onImageUpload={setImage} />
        </div>
        <div className="mb-4">
          <label htmlFor="Category" className="text-gray-700">
            Category
          </label>
          <select
            id="Category"
            disabled={isLoading}
            ref={categoryRef}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:opacity-50"
          >
            {categoies?.map((category: string) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-md hover:bg-purple-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Add Product
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddProductForm;
